import React from 'react';
import useCopy from '../customHooks/useCopy';
import '../CSS/Footer.css'

function Footer() {
  const [copied, copyText] = useCopy();

  const textToCopy = '@ 2024 Reservations For Belgrade Nightlife';

  return (
    <div className="footer">
      <footer className="footer-container"> 
          <p>{textToCopy} </p>
          <button onClick={() => copyText(textToCopy)}>
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
      </footer> 
    </div>
  );
}

export default Footer;