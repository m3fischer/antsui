
export default function Antform(){
    return <></>
}

export function AntItem({id, label}) {
    return (<>
        <div className="input-group mb-3">
          <div className="input-group-prepend" >
            <span className="input-group-text" id="inputGroup-sizing-default" >{label}</span>
          </div>
          <input id={id} name={id} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
        </div>
      </>)
}
