import Antslayout from '../components/antslayout';
import React from 'react';

import antforms from '../components/antstypes.json'
import {AntItem} from '../components/antforms'

import styles from '../components/antslayout.module.css';
import { Utils } from '../utils/utils';

//Fuer weniger Schreibarbeit
let f5g = antforms.dailyfeeding


async function onSendData(event){
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
   
    // Get data from the form.
    const data = {} // Zunächst leeres JSON Objekt anlegen

    //Für jedes Formelement wird ein Key-Value-Paar erstellt
    f5g.questions.forEach(item => {data[item.id] = event.target[item.id].value})  
    
    console.log(data)
    //Utils.send_data_to_backend(data)

}

export default  function addEntryFuetterung () {

   
    return ( 
        <Antslayout>          
            <h1>Tägliche Futterabfrage</h1>
            <p>Trage hier die tägliche Füterung ein</p>
            <h2>Was hast du gefüttert</h2>

           <form onSubmit={onSendData}>
                {f5g.questions.map(item => {return <AntItem key={item.id} id={item.id} label={item.label}></AntItem>})}
                <button variant="contained" type="submit" className="btn btn-primary">Absenden</button>            
            </form>


        </Antslayout>
    )
}