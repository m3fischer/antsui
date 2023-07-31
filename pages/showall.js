import Link from 'next/link'
import { FormEvent } from 'react'
//import styles from '../styles/Home.module.css'
import styles from '../components/antslayout.module.css';
import Button from '@mui/material/Button';

import React from 'react';
import Antslayout from '../components/antslayout';
import ATable from '../components/antstable';

let resultFromServer = []
export default function ShowAllEntriesFromDynamoDB() {

    const [entries, setUpdateTable] = React.useState([{name: "test"}]);
    const [header, setUpdateHeader] = React.useState([]);
    
    


     // Bin ich hier, wurde OK gedrückt
     const handleSubmit = async (event) => {     
         // Stop the form from submitting and refreshing the page.
         event.preventDefault()
         
        // API endpoint where we send form data.
        const endpoint = '/api/showentries'
     
        const data = {}

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint)
        
        console.log(`Empfagene Daten: ${response}` )
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        console.log(`Empfagene Daten: ${result.data[1].Benutzer}` )
        const firstitem = result.data[2]
        //alert(`Is this your full name: ${result.data.length}`)

        setUpdateTable(result.data)
        
        let header = (h) => {
          return Object.keys(h)
        }    
        setUpdateHeader(header(result.data[0]))
        console.log(entries)
//        for (let i=0; i<result.data.length; i++){
//          console.log(result.data[i].Benutzer)    
//        }
        resultFromServer = result.data.length
        console.log(`${resultFromServer} Items received from DB`)
        }
    
 

    return (
        // We pass the event to the handleSubmit() function on submit.
        <Antslayout>
            <h1>Einträge anzeigen</h1>
    
            <form onSubmit={handleSubmit}>    
                <button variant="contained" type="submit">Abfragen</button>
            </form>  
            <ATable name="die neue Tabelle" tabledata={entries}/>
                     
            
        </Antslayout>   
      )
}