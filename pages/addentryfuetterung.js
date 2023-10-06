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
   
    // Anhand der Formularkonfiguration wird das Event ausgewertet und Daten extrahiert. 
    // Die Eingebane des Nutzers werden in der lokalen Variablen 'data' gespeichert 
    const data = Utils.extract_data_from_target(event, f5g)
    
    console.log("FUNCTION onSendData IN addentryfuertterung")
    console.log(data)
    Utils.send_data_to_backend(data)
}

export default  function addEntryFuetterung () {

   
    return ( 
        <Antslayout>          
            <h1 key="h1-element">Tägliche Futterabfrage</h1>
            <p key="p-element"> Trage hier die tägliche Füterung ein</p>
            <h2 key="h2-element">Was hast du gefüttert</h2>

           <form key="form_Add_Fuetterung" onSubmit={onSendData} className="d-grid gap-5">
                                           
                {f5g.questions.map(item => {return <AntItem key={item.id} id={item.id} label={item.label} htmltype={item.htmltype} value={item.initvalue}></AntItem>})}
                <button variant="contained" type="submit" className="btn btn-primary">Absenden</button>            
            </form>


        </Antslayout>
    )
}