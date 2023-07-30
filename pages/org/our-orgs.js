import Link from 'next/link';
import Image from 'next/image';
import Antslayout from '../../components/antslayout';


export  default  function FirstPost() {

  const zufallszahl = getData();
  
  console.log("RESPOSNE VON ANTSSERVER:" )
  console.log(zufallszahl)

  return (
    <Antslayout>
      <h1>
        Org Seite 
        <Link href="/check">Check Seite</Link>
        <Image src="/img/me.jpeg" width={500} height={500} alt='bild von mir'/>
      </h1>
      <h2>Die Zufallszahl:  {JSON.stringify(zufallszahl)} </h2>
    </Antslayout>  
  );
}


async function  meineDaten(){
  //const res = await fetch('http://localhost:3030/zufall')
  
  const res = {name: "John", age: 30, city: "New York"};
  console.log (res)
  return {props: {res,},};
}
async function getData() {
  const res = await fetch('http://localhost:3030/zufall')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }else{
    console.log("res.ok: " + res.ok)
  }
 
  let jsondata = res.text()
  console.log(jsondata);
  return jsondata
}