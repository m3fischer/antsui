import Link from 'next/link'
import { FormEvent } from 'react'
//import styles from '../styles/Home.module.css'
import styles from '../components/antslayout.module.css';
import Button from '@mui/material/Button';

import React from 'react';
import Antslayout from '../components/antslayout';

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
        alert(`Anzahl Items in der DB: ${resultFromServer}`)
        //alert(`Item: ID: ${firstitem["entry-id"]} ${firstitem["Benutzer"]} ${firstitem["PILZTIEFE"]}`)
      }

    let names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
    let persons = [{name:"manuel", nachname:"fischer"},{name:"Andi", nachname:"mueller"},{name:"ingo", nachname:"dabinge"}, ]
    
 

    return (
        // We pass the event to the handleSubmit() function on submit.
        <Antslayout>
            <h1>Einträge anzeigen</h1>
    
            <form onSubmit={handleSubmit}>    
                <button variant="contained" type="submit">Abfragen</button>
            </form>  
            <p>{resultFromServer}</p>
            
            
            <table>
              <tr>
              {Object.keys(entries[0]).map(head => <th key={head}>{head}</th>)}

              </tr>
              
                {entries.map (e => <tr key={e["entry-id"]}> {Object.values(e).map(item => <td>{item}</td>)}
                
                </tr>)}
                
            </table>

            <ul>{entries.map(entry => <li key={entry["entry-id"]}>{entry["entry-id"]}</li>)}</ul>
            {entries.map( entry =>  <div key={entry["entry-id"]} id={entry["entry-id"]}>   
                                      <div>{entry.PILZTIEFE}</div>   
                                      <div>{entry.PILZBREITE}</div>   
                                      <div>{entry.WAS}</div>   

                                      <div>{entry.PILZHOEHE}</div>   
                                      <div>{entry.PILZ_im_ACRYLROHR}</div>   
                                      <div>{entry.BEMERKUNG}</div>   


                                    </div>)}
            <ul>
              {names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <div>{persons.map(n => <p key={n.name}>Vorname: {n.name} und Nachname: {n.nachname}</p>)}</div>
        </Antslayout>   
      )
}