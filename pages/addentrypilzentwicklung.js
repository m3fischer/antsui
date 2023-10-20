import Antslayout from '../components/antslayout';
import React from 'react';

import anttypes from '../components/antstypes.json'
import {AntItem} from '../components/antforms'

import styles from '../components/antslayout.module.css';
import { Utils } from '../utils/utils';

//Fuer weniger Schreibarbeit p13g => PilzentwicklunG
let p13g = anttypes.pilzentwicklung


async function onSendData(event){
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
   
    // Anhand der Formularkonfiguration wird das Event ausgewertet und Daten extrahiert. 
    // Die Eingebane des Nutzers werden in der lokalen Variablen 'data' gespeichert 
    const data = Utils.extract_data_from_target(event, p13g)
    
    console.log("FUNCTION onSendData IN addentrypilzentwicklung")
    console.log(data)
    Utils.send_data_to_backend(data)

}

export default  function addEntryPilzentwicklung () {

    return ( 
        <Antslayout>          
            <h1>Pilzentwicklung</h1>
            <p>Trage hier die tägliche Beobachtung ein</p>
            
           <form key="Add_Pilzentwicklung" onSubmit={onSendData} className="d-grid gap-5">
                {p13g.questions.map(item => {
                    return <AntItem 
                                key={item.id} 
                                id={item.id} 
                                label={item.label}
                                htmltype={item.htmltype} 
                                value={item.initvalue}
                                img = {item.image} >

                            </AntItem>})}
                <button variant="contained" type="submit" className="btn btn-primary">Absenden</button>            
            </form>

            


        </Antslayout>
    )
}