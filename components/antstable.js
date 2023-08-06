import styles from './antstable.module.css'
import {Utils} from '../utils/utils'

let counter =0 // die anzhal der gezählten elemente
        
    export default function ATable ({name, tabledata }){
        console.log(`ATable: ${name}`)
        if (typeof tabledata !== 'undefined') {
            
            //Eine leere Map. Für die Zuordnung der ID auf die Css Klasse
            let cssclass = new Map();
            let index =0;
            tabledata.map(i => {        
                if(index % 2 == 0){ cssclass.set(i["entry-id"],styles.even) }
                else{               cssclass.set(i["entry-id"],styles.uneven)}
                index++
            })
        
            return <>
                <table>
                    <thead>
                        <tr>{Object.keys(tabledata[0]).map(head => <th key={head} id={head}>{head}</th>)}</tr>
                    </thead>
                    <tbody>
                        {tabledata.map (e => 
                            <tr 
                                //key={e["entry-id"]} 
                                id={e["entry-id"]} 
                                className={cssclass.get(e["entry-id"])}
                            > 
                                {Object.values(e).map(item => 
                                <td 
                                    //key={Utils.create_entry_id("tdkey")}
                                    id={Utils.create_entry_id("tdid")}
                                >{item}</td>)}</tr>)}
                    </tbody>
                </table>
            </>
            // the variable is defined
        }
        else { console.log("ATable Table Data is empty"); return <></>}
    }