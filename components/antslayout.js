import styles from './antslayout.module.css';
import Header from './header';
import Footer from './footer'

export default function Antslayout({ children }) {
    return (
    <>
      <div className="container-xl">
        <div className="container-fluid">
          <Header/>
          <div className={styles.container} >{children}</div>
          <Footer/>
        </div>
      </div>
    </>
    )}