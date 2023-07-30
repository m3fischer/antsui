import Link from 'next/link';
import styles from '../components/antslayout.module.css';

import Antslayout from '../components/antslayout';
import Button from '@mui/material/Button';

import {useRouter}  from "next/router";
import {useState} from 'react';




export default function FirstPost() {
   

    const sendToServer = async (event)=>{
        try {
        const router = useRouter()
        const [route, setRoute] = useState()
    
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
            BENUTZER: event.target.BENUTZER.value,
        }

    // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = 'http://localhost:3030/write'

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
        alert(`Data from Server: ${result.data}`)
        } catch (error) {
                console.log(error)
        }
        //Weiterleiten auf hauptseite
        router.push("/")

        //aktuelle Seite neuladen
        //router.reload(window.location.pathname)
        //router.reload()

    }





    
    return (
        
        <Antslayout>
        
            <h1>Eintrag erstellen</h1>
            
      
            <form onSubmit={sendToServer} /*action="http://localhost:3030/write"  method="post" */ >
                
                <label htmlFor="PILZTIEFE">PILZTIEFE:</label>
                <input className={styles.input} type="text" id="PILZTIEFE" name="PILZTIEFE" required minLength="1" maxLength="20" />

                <label htmlFor="PILZBREITE">PILZBREITE:</label>
                <input className={styles.input} type="text" id="PILZBREITE" name="PILZBREITE" />

                <label htmlFor="WAS">WAS:</label>
                <input className={styles.input} type="text" id="WAS" name="WAS" />

                <label htmlFor="PILZHOEHE">PILZHOEHE: </label>
                <input className={styles.input} type="text" id="PILZHOEHE" name="PILZHOEHE" />

                <label htmlFor="PILZ_im_ACRYLROHR">PILZ_im_ACRYLROHR</label>
                <input className={styles.input} type="text" id="PILZ_im_ACRYLROHR" name="PILZ_im_ACRYLROHR"/>

                <label htmlFor="PILZ_im_ACRYLROHR_LÄNGE">PILZ_im_ACRYLROHR_LÄNGE:</label>
                <input className={styles.input} type="text" id="PILZ_im_ACRYLROHR_LÄNGE" name="PILZ_im_ACRYLROHR_LÄNGE" />

                <label htmlFor="BEMERKUNG">BEMERKUNG:</label>
                <input className={styles.input} type="text" id="BEMERKUNG" name="BEMERKUNG" />

                                
                <label htmlFor="BENUTZER">BENUTZER:</label>
                <input className={styles.input} type="text" id="BENUTZER" name="BENUTZER" />

                <Button variant="contained" type="submit">Submit</Button>
            </form>
            
            <h2>TEST  <Link href="/org/our-orgs">this page!</Link></h2>

        </Antslayout>

        
    );
  }