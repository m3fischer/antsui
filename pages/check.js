import Link from 'next/link';
import styles from '../components/antslayout.module.css';

import Antslayout from '../components/antslayout';
import Button from '@mui/material/Button';

import {useRouter}  from "next/router";
import {useState} from 'react';



let auto = {
    marke:"vw",
    model:"golf",
    komponenten:[
        {id:"Komponente 1", name:"Lenkrad", material:"Leder"},
        {id:"Komponente 2", name:"Pedale", material:"Alu"},
        {id:"Komponente 3", name:"Sitz", material:"Textil"},
    ]
}


export default function check() {
    let resultToShow = []
    auto.komponenten.forEach((currentValue, index)=>{resultToShow.push(<p key={currentValue.name}>{currentValue.name}</p>)})

    console.log (auto)
    return (
        <>
            <div>
                <h2>Auf ein JSON Objekt direk zugreifen</h2>
                <p>{auto.marke}</p>
                <p>{auto.model}</p>
                <p>{auto.komponenten[0].id}</p>
                <p>{auto.komponenten[0].material}</p>
                <p>Anzahl der Komponenten: {auto.komponenten.length}</p>
            </div>
            
            <div>
                <h2>Auf ein Array zugreifen mittels ForEach Methode</h2>
                <div>{resultToShow}</div>
            </div>
            <div>
                <h2>Auf ein Array zugreifen mittels Map-Function</h2>
                {auto.komponenten.map((komponente, index)=>{return <p key={komponente.id}>{komponente.id}</p>})}
            </div>
            
        </>
    )
  }