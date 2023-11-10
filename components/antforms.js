import { AntCheckBox, AntRadioButton } from './AntCheckSelect'
import styles from './antforms.module.css'

export default function Antform(){
    return <></>
}

//ein Leeres Item. Hier werden beim Aufruf die Daten des "aktuellem" Items gespeichert
let tmpItem = {}

export function AntItem({id, label, htmltype, value, img}) {


  let htmlStructure // der Rückgabewert
  let props = {};   // Ein leeres JSON-Objekt fuer alle Properties

  //Sofern vorhanden werden die Properties gesetzt
  if (id != undefined){  props.id = id;}
  if (label != undefined) {props.label = label;}
  if (htmltype != undefined) {props.htmltype = htmltype;}
  if (value != undefined) { props.value = value;}
  if (img != undefined) { props.img = img;}

  //Die daten sollten auch außerhalb der Funktion bekannt sein
  tmpItem[props.id] = props;

  //Unterscheidung je nach HTML Typ. 
  // Möglich sind: radio, checkbox oder text
  switch (htmltype){

    case "radio":
      htmlStructure = AntRadioButton (props)
      break

    case "checkbox":
      htmlStructure = AntCheckBox (props)
      break

    default: // Liefert die Default Struktur, d.h. ein Textfeld
      htmlStructure = getDefaultHTMLStructure(props)
  }
    
    return htmlStructure 
}

function getDefaultHTMLStructure(props){
  let id = props.id
  let label = props.label

  return (<>
    <div key={"div_" + id} id={"div_" + id} className="container">
      
    {// Folgende Struktur liefert das Img-Tag zurück WENN der Wert props.img existiert
      props.img && <img id={"img_" + id} src={props.img} className="img-thumbnail rounded float-left d-block" ></img>
    }
          
      <div className="input-group-prepend " >
        
        <div onClick={onLabelClicked}  data-value={props.id} className="input-group-text " id="inputGroup-sizing-default" >
          <span  className='bi bi-info-square col-sm-2'> {label} </span>
        </div> 
        
      </div>
      <input key={id} id={id} name={id} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
    </div>
  </>)

}
//Bei Click auf das Label soll die Antort des letzten Eintrags in der Datenbank angezeigt werden
function onLabelClicked(event){
    
    loadDAta(event)

    //alert("clicked" + JSON.stringify( tmpItem))
    let prop_id = event.currentTarget.getAttribute("data-value")
    let prop = tmpItem[prop_id]

    let date_in_ms = Date.now()
    alert(JSON.stringify(prop))
    //alert(prop.label)
}




// Bin ich hier, wurde OK gedrückt
async function loadDAta (event) {     
  // Stop the form from submitting and refreshing the page.
  event.preventDefault()
  
 // API endpoint, von dem Datenabgerufen werden sollen
 const endpoint = '/api/getDatafromDB'


 try {
      //Versuche Daten vom Endpoint abzurufen
      const response = await fetch(endpoint)       
    
      console.log(`[LOAD DATA] Empfagene Daten: ${response}` )
//         // Get the response data from server as JSON.
//         // If server returns the name submitted, that means the form works.
//         const result = await response.json()
//         console.log(`Anzahl der Elemente ${result.data.length}`)
//         console.log(result.data)
//         let tmpPilz=[]
//         let tmpFeeding = []
//         let tmpRest = []

//             result.data.forEach(element => { 
//                 if(element["FORM_TYPE"] == AType.dailyfeeding.name){
//                     console.log(`Tägliche Fütterung: ${element["entry-id"]}`)
//                     tmpFeeding.push(element)
//                 }
//                 else if(element["FORM_TYPE"] == AType.pilzentwicklung.name){
//                     console.log(`Pilzentwicklung: ${element["entry-id"]}`)
                  
//                     tmpPilz.push(element)
//                 }
//                 else{
//                     console.log(`Alles Andere: ${element["entry-id"]}`)
//                     tmpRest.push(element)
//             }
//             });
//             console.log(`Anzahl Pilzentwicklung: ${tmpPilz.length}`)
//             console.log(`Anzahl Fütterung: ${tmpFeeding.length}`)

//             setFeedingTableData(tmpFeeding)
//             setPilztableData(tmpPilz)
      
//         let header = (h) => { return Object.keys(h)}    
//         setUpdateHeader(header(result.data[0]))
//         console.log(entries)
// //        for (let i=0; i<result.data.length; i++){
// //          console.log(result.data[i].Benutzer)    
// //        }
//         resultFromServer = result.data.length
//         console.log(`${resultFromServer} Items received from DB`)
  } catch (error) {
      console.log(`FEHLER BEI DER VERBINDUNG ${error}`)            
  }
}
