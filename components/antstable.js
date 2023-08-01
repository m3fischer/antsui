import styles from './antstable.module.css'

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
                <tr>{Object.keys(tabledata[0]).map(head => <th key={head}>{head}</th>)}</tr>
                {tabledata.map (e => 
                    <tr 
                        key={e["entry-id"]} 
                        id={e["entry-id"]} 
                        className={cssclass.get(e["entry-id"])}
                    > 
                        {Object.values(e).map(item => <td>{item}</td>)}</tr>)}    
                </table>
            </>
            // the variable is defined
        }
        else { return <></>}
    }