import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Antslayout from '../components/antslayout';

export default function Home() {
  return (
    <Antslayout>
    <div className={styles.container}>
      <Head>
        <title>Antsnature App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}> Antsnature App (V0.1) </h1>

        <div className={styles.grid}>
          <Link href="/addentryform" className={styles.card}>
            <h3>Eintrag anlegen &rarr;</h3>
            <p>Einen neuen Eintrag in der Datenbank ablegen.</p>
          </Link>

          <Link href="/addentryfuetterung" className={styles.card}>
            <h3>Tägliche Fütterung &rarr;</h3>
            <p>Einen neuen Eintrag in der Datenbank ablegen.</p>
          </Link>


          <Link href="/showall" className={styles.card}>
          <h3>Daten anzeigen &rarr;</h3>
            <p>Alle Daten abfaragen</p>
          
          </Link>
          
          
        </div>
      </main>

    

      <style jsx>{`
        main {
         
          flex: 3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </Antslayout>
  )
}


