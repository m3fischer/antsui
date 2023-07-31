import Link from 'next/link'
import { FormEvent } from 'react'
//import styles from '../styles/Home.module.css'
import styles from '../components/antslayout.module.css';
import Button from '@mui/material/Button';

import Antslayout from '../components/antslayout';

export default function PageWithJSbasedForm() {
    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault()
   
      // Get data from the form.
      const data = {
        PILZTIEFE: event.target.PILZTIEFE.value, 
        PILZBREITE: event.target.PILZBREITE.value,
        WAS: event.target.WAS.value,
        PILZHOEHE: event.target.PILZHOEHE.value,
        PILZ_im_ACRYLROHR: event.target.PILZ_im_ACRYLROHR.value,
        PILZ_im_ACRYLROHR_LÄNGE: event.target.PILZ_im_ACRYLROHR_LÄNGE.value,
        BEMERKUNG: event.target.BEMERKUNG.value,
      }
   
      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)
   
      // API endpoint where we send form data.
      const endpoint = '/api/addentry'
   
      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
          'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      }
   
      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options)
   
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json()
      console.log(`Message from Server: ${result.data}`)
      alert(`Message from Server: ${result.data}`)
    }

    function FormItem ({id, label}){
      return (<>
        <div className="input-group mb-3">
          <div className="input-group-prepend" >
            <span className="input-group-text" id="inputGroup-sizing-default" >{label}</span>
          </div>
          <input id={id} name={id} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
        </div>
      </>)
    }

    return (
        // We pass the event to the handleSubmit() function on submit.
        <Antslayout>
            <h1>Eintrag erstellen</h1>
                        
            <form onSubmit={handleSubmit}>        

                
                <FormItem id="PILZTIEFE" label="Pilztiefe"></FormItem>
                <FormItem id="PILZBREITE" label="Pilzbreite"></FormItem>
                <FormItem id="WAS" label="Was"></FormItem>
                <FormItem id="PILZHOEHE" label="PILZHOEHE"></FormItem>
                <FormItem id="PILZ_im_ACRYLROHR" label="Pilz im Acryl"></FormItem>
                <FormItem id="PILZ_im_ACRYLROHR_LÄNGE" label="Länge des Pilz im Accryl"></FormItem>
                <FormItem id="BEMERKUNG" label="Bemerkung"></FormItem>         
                
                <button variant="contained" type="submit" className="btn btn-primary">Absenden</button>
            
            </form>   

        </Antslayout>   
    )
  }