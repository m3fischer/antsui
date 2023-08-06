import Antslayout from '../components/antslayout';
import React from 'react';

import antforms from '../components/antstypes.json'
import {AntItem} from '../components/antforms'

import styles from '../components/antslayout.module.css';
import { Utils } from '../utils/utils';

//Fuer weniger Schreibarbeit
let p13g = antforms.pilzentwicklung


async function onSendData(event){
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
   
    const data = {} // Zunächst leeres JSON Objekt anlegen

    // Es wird gespeichert welche Informationen gespeichert werden
    data["FORM_TYPE"] = p13g.name

    //Für jedes Formelement wird ein Key-Value-Paar erstellt und in dem zuvor angelegtem JSON-Objekt gespeichert
    p13g.questions.forEach(item => {data[item.id] = event.target[item.id].value})  
    
    console.log(data)
    Utils.send_data_to_backend(data)

}

export default  function addEntryPilzentwicklung () {

    return ( 
        <Antslayout>          
            <h1>Pilzentwicklung</h1>
            <p>Trage hier die tägliche Beobachtung ein</p>
            
           <form onSubmit={onSendData}>
                {p13g.questions.map(item => {return <AntItem key={item.id} id={item.id} label={item.label}></AntItem>})}
                <button variant="contained" type="submit" className="btn btn-primary">Absenden</button>            
            </form>


        </Antslayout>
    )
}