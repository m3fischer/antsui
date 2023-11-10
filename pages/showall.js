import Link from 'next/link'
import { FormEvent } from 'react'
//import styles from '../styles/Home.module.css'
import styles from '../components/antslayout.module.css';
import Button from '@mui/material/Button';

import React from 'react';
import Antslayout from '../components/antslayout';
import ATable from '../components/antstable';
import AType from '../components/antstypes.json';

let resultFromServer = []
export default function ShowAllEntriesFromDynamoDB() {

    const [pilzTableData, setPilztableData] = React.useState([{"Pilzentwicklung": "Daten wurden nicht abgerufen"}]);
    const [feedingTableData, setFeedingTableData] = React.useState([{"Tägliche Fütterung": "Daten wurden nicht abgerufen"}]);

    // Bin ich hier, wurde OK gedrückt
    const loadTableDataFromServer = async (event) => {     
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        
       // API endpoint, von dem Datenabgerufen werden sollen
       const endpoint = '/api/showentries'

       try {
            //Versuche Daten vom Endpoint abzurufen
            const response = await fetch(endpoint)       
       
            console.log(`Empfagene Daten: ${response}` )
            // Get the response data from server as JSON.
            // If server returns the name submitted, that means the form works.
            const result = await response.json()
            console.log(`Anzahl der Elemente ${result.data.length}`)
            console.log(result.data)
            let tmpPilz=[]
            let tmpFeeding = []
            let tmpRest = []

                result.data.forEach(element => { 
                    if(element["FORM_TYPE"] == AType.dailyfeeding.name){
                        console.log(`Tägliche Fütterung: ${element["entry-id"]}`)
                        tmpFeeding.push(element)
                    }
                    else if(element["FORM_TYPE"] == AType.pilzentwicklung.name){
                        console.log(`Pilzentwicklung: ${element["entry-id"]}`)
                        
                        tmpPilz.push(element)
                    }
                    else{
                        console.log(`Alles Andere: ${element["entry-id"]}`)
                        tmpRest.push(element)
                }
                });
                console.log(`Anzahl Pilzentwicklung: ${tmpPilz.length}`)
                console.log(`Anzahl Fütterung: ${tmpFeeding.length}`)

                setFeedingTableData(tmpFeeding)
                setPilztableData(tmpPilz)
            
            let header = (h) => { return Object.keys(h)}    
            setUpdateHeader(header(result.data[0]))
            console.log(entries)
    //        for (let i=0; i<result.data.length; i++){
    //          console.log(result.data[i].Benutzer)    
    //        }
            resultFromServer = result.data.length
            console.log(`${resultFromServer} Items received from DB`)
        } catch (error) {
            console.log(`FEHLER BEI DER VERBINDUNG ${error}`)            
        }
   }

    return (
        // We pass the event to the handleSubmit() function on submit.
        <Antslayout>
            <h1>Einträge anzeigen</h1>
    
            <form onSubmit={loadTableDataFromServer}>    
                <button variant="contained" type="submit">Abfragen</button>
            </form>  
            <ATable name="FeedingTable" tabledata={feedingTableData} headline="Fütterung"/>
            <ATable name="PilzTable" tabledata={pilzTableData} headline="Pilzentwicklung"/>            
        </Antslayout>   
      )
}