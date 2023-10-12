export function AntCheckBox (props){
    return AntCheckSelect (props, "checkbox")
}

/**
 * 
 * @param {*} props 
 * @returns 
 */
export function AntRadioButton (props){
    return AntCheckSelect (props, "radio")
}

function AntCheckSelect (props, htmltype) {
    //id => Eindeutige Kennung des gesammten Elements
    //label => Das Label der CheckBox Gruppe
    //radioValues => Liste aller Werte der Checkboxes oder Radio-Elemente
    //htmltype => Gibt ob es sich um einen Radiobutton(radio) oder eine Checkbox (checkbox) handelt
    let id = props.id
    let radiovalues
    if(props.value != undefined){
        radiovalues = props.value.split("#")
    }
    let label = props.label

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

    
    
    