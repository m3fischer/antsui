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
    data[`${f5g.q1.id}`] =  event.target[`${f5g.q1.id}`].value, 
    data[`${f5g.q2.id}`] =  event.target[`${f5g.q2.id}`].value, 
    data[`${f5g.q3.id}`] =  event.target[`${f5g.q3.id}`].value, 
    data[`${f5g.q4.id}`] =  event.target[`${f5g.q4.id}`].value, 
    data[`${f5g.q5.id}`] =  event.target[`${f5g.q5.id}`].value, 
    data[`${f5g.q6.id}`] =  event.target[`${f5g.q6.id}`].value, 
    data[`${f5g.q7.id}`] =  event.target[`${f5g.q7.id}`].value, 
    data[`${f5g.q8.id}`] =  event.target[`${f5g.q8.id}`].value, 
    data[`${f5g.q9.id}`] =  event.target[`${f5g.q9.id}`].value, 
    data[`${f5g.q10.id}`] =  event.target[`${f5g.q10.id}`].value, 
    data[`${f5g.q11.id}`] =  event.target[`${f5g.q11.id}`].value, 
    data[`${f5g.q12.id}`] =  event.target[`${f5g.q12.id}`].value, 
  
    
    console.log(data)
    Utils.send_data_to_backend(data)

}

export default  function addEntryFuetterung () {

   
    return ( 
        <Antslayout>          
            <h1>Tägliche Futterabfrage</h1>
            <p>Trage hier die tägliche Füterung ein</p>
            <h2>Was hast du gefüttert</h2>

            
           <form onSubmit={onSendData}>
                <AntItem id={f5g.q1.id} label={f5g.q1.label}></AntItem>
                <AntItem id={f5g.q2.id} label={f5g.q2.label}></AntItem>
                <AntItem id={f5g.q3.id} label={f5g.q3.label}></AntItem>
                <AntItem id={f5g.q4.id} label={f5g.q4.label}></AntItem>
                <AntItem id={f5g.q5.id} label={f5g.q5.label}></AntItem>
                <AntItem id={f5g.q6.id} label={f5g.q6.label}></AntItem>
                <AntItem id={f5g.q7.id} label={f5g.q7.label}></AntItem>
                <AntItem id={f5g.q8.id} label={f5g.q8.label}></AntItem>
                <AntItem id={f5g.q9.id} label={f5g.q9.label}></AntItem>
                <AntItem id={f5g.q10.id} label={f5g.q10.label}></AntItem>
                <AntItem id={f5g.q11.id} label={f5g.q11.label}></AntItem>
                <AntItem id={f5g.q12.id} label={f5g.q12.label}></AntItem>
                
                <button variant="contained" type="submit" className="btn btn-primary">Absenden</button>
            
            </form>


        </Antslayout>
    )
}