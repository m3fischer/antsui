import { AntCheckBox, AntRadioButton } from './AntCheckSelect'
import styles from './antforms.module.css'

export default function Antform(){
    return <></>
}

export function AntItem({id, label, htmltype, value, img}) {

  let htmlStructure // der Rückgabewert
  let props = {}; // Ein leeres JSON-Objekt fuer alle Properties

  //Sofern vorhanden werden die Properties gesetzt
  if (id != undefined){  props.id = id;}
  if (label != undefined) {props.label = label;}
  if (htmltype != undefined) {props.htmltype = htmltype;}
  if (value != undefined) { props.value = value;}
  if (img != undefined) { props.img = img;}

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
      htmlStructure = getDefaultHTMLStructure(id, label)

  }
    
    return htmlStructure 
}

function getDefaultHTMLStructure(id, label){
  return (<>
    <div key={"div_" + id} id={"div_" + id} className="">
      <div className="input-group-prepend" >
        <span className="input-group-text" id="inputGroup-sizing-default" >{label}</span>
      </div>
      <input key={id} id={id} name={id} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
    </div>
  </>)

}

function getRadioButtonStructure(id, label, value, htmltype){
  let radiovalues = value.split("#")
  
  return (
    <div key={"div_" + id} id={"div_" + id}>
      <div className="input-group-prepend" >
        <span className="input-group-text" id="inputGroup-sizing-default" >{label}</span>
      </div>
      <div id={"div_" + id+"_"+"INPUTS"} className="form-check">
        
        {// Der folgende Abschnitt wird für jedes Element von radiovalues durchlaufen
          radiovalues.map(item => (
          <>
            <input id={id+"_"+item} key={id+"_input"} name={id} type={htmltype} value={item} className="form-check-input"  aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
            <label id={id+"_"+item+"_"+"Label"} key={id+"_label"} className="form-check-label" htmlFor={id+"_"+item}>{item}</label>
            <br></br>
          </>
        
        ) )}
      </div>
    </div>
  )
}

