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
   
    const data = {} // Zunächst leeres JSON Objekt anlegen

    // Es wird gespeichert welche Informationen gespeichert werden
    data["FORM_TYPE"] = f5g.name

    //Für jedes Formelement wird ein Key-Value-Paar erstellt und in dem zuvor angelegtem JSON-Objekt gespeichert
    //console.log(event.target)
    f5g.questions.forEach(item => { 
        if (item.htmltype=="checkbox"){
            let radiovalues = item.initvalue.split("#")
            radiovalues.map(checkvalue => {
                if(event.target[item.id+"_" +checkvalue ].checked){
                    // Bei einer Checkbox sollen nur die ausgewählten Elemente gespeichert werden
                    if(data[item.id] == undefined){
                       data[item.id] = event.target[item.id+"_" +checkvalue ].value} // Das erste Element kann direkt gespeichert werden
                    else{
                        data[item.id] =data[item.id]+"#"+ event.target[item.id+"_" +checkvalue ].value // Bei allen weiteren Elementen müssen die vorherigen Werten mit dem Trennzeichn getrennt werden
                    }
                }
                else{
                    //Dieser Wert muss nicht gepsiehcert werden
                }
                })
            
                
        }
        else if (item.htmltype=="checkbox"){}
        else{
            data[item.id] = event.target[item.id].value
        }
        })

    
    console.log("FUNCTION onSendData IN addentryfuertterung")
    console.log(data)
    //Utils.send_data_to_backend(data)

}



export default  function addEntryFuetterung () {

   
    return ( 
        <Antslayout>          
            <h1 key="h1-element">Tägliche Futterabfrage</h1>
            <p key="p-element"> Trage hier die tägliche Füterung ein</p>
            <h2 key="h2-element">Was hast du gefüttert</h2>

           <form onSubmit={onSendData} className="d-grid gap-5">
                                           
                {f5g.questions.map(item => {return <AntItem key={item.id} id={item.id} label={item.label} htmltype={item.htmltype} value={item.initvalue}></AntItem>})}
                <button variant="contained" type="submit" className="btn btn-primary">Absenden</button>            
            </form>


        </Antslayout>
    )
}