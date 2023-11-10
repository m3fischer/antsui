import styles from './antstable.module.css'
import {Utils} from '../utils/utils'

let counter =0 // die anzhal der gezählten elemente
        
export default function ATable ({name, tabledata, headline, description }){
    console.log(`ATable: ${name}`)
    if (typeof tabledata !== 'undefined') {
    // Diese Stelle wird nur erreich, wenn die tabledata-Variable mindestens 
    // einen Wert hat. Bspw: den Initialwert


        //Eine leere Map. Für die Zuordnung der ID auf die Css Klasse
        let cssclass = new Map();
        let index =0;

        // Zunaechst die CSS Klassen even und uneven an jedes Element anhängen, 
        // um z.B gerade und ungerade Zeilen zu unterscheiden
        tabledata.map(i => {        
            if(index % 2 == 0){ 
                cssclass.set(i["entry-id"],styles.even) 
                console.log("der index (GERADE)" + index)
            }
            else{              
                cssclass.set(i["entry-id"],styles.uneven)
                console.log("der index (UNGERADE)" + index)
            }
            console.log("der index" + index)
            index++
        })
    
        return <>
            <h1>{headline}</h1>
            <div>{description}</div>
            <table>
                <thead key="Antstable_Head">
                    <tr>{Object.keys(tabledata[0]).map(head => <th key={head} id={head}>{head}</th>)}</tr>
                </thead>
                <tbody key="Antstable_Body">
                    {tabledata.map (e => 
                        <tr 
                            key={e["entry-id"]} 
                            id={e["entry-id"]} 
                            className={cssclass.get(e["entry-id"]) }
                        > 
                            {Object.values(e).map(item => 
                            <td 
                                key={Utils.create_entry_id("tdkey_")}
                                id={Utils.create_entry_id("tdid_")}
                            >{item}</td>)}</tr>)}
                </tbody>
            </table>
        </>
        // the variable is defined
    }
    else { 
        console.log("ATable Table Data is empty"); 
        return <></>}
}