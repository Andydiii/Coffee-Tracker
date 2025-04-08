import { useState } from 'react';
import  Authentication from './Authentication';
import Modal from './Modal';



export default function Layout({ children }) {

  const [showModal, setShowModal] = useState(false);

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">CAFFIEND</h1>
        <p>For Coffee Insatiates</p>
      </div>
      <button onClick={() => setShowModal(true)}>
        <p>Sign Up free</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>
    </header>
  );

  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Caffiend </span>
        was made by <a target="_blank" href="https://github.com/Andydiii">Andy Liu</a> <br /> using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.
        <br />
        Check out the project on <a href="https://github.com/Andydiii/Coffee-Tracker" target="_blank">my GitHub</a>
      </p>
    </footer>
  );

  return (
    <>
      {showModal && (
        <Modal handleCloseModal={() => {
          setShowModal(false);
        }}>
          <Authentication />
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
