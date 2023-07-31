import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/img/ants_nature_logo.png'

export default function Antsheader({ children }) {
    return (
    <>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"> 
            <Image src={logo} height={75} alt="Antsnature"/> 
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">                
                <Link className='nav-link' href="/">Startseite</Link>
              </li>
              
              <li className="nav-item">                
                <Link className='nav-link' href="/addentryform">Eintrag erstellen</Link>
              </li>

              <li className="nav-item">                
                <Link className='nav-link' href="/showall">Alle Daten anzeigen</Link>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>





    </>)
  }