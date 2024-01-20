import React from 'react';
import '../CSS/About.css'

import image1 from '../assets/image1.jpg';
import Footer from './Footer';

function About() {
  return (
    <div>
    <div className="about">
      <h2>Dobrodošli u Našu Aplikaciju za Rezervaciju Svirki, Barova i Provoda!</h2>
      <img src={image1} alt="Slika 1" />
      <div className='aboutDiv'>
      <p>
        Naša aplikacija ima za cilj olakšati korisnicima planiranje i rezervaciju za nezaboravne noći izlazaka.
        Bilo da želite rezervisati mesto u omiljenom baru, osigurati najbolji pogled na koncertu ili pronaći savršeno
        mesto za provod, mi smo tu da vam pomognemo.
      </p>
      <p>
        FUNKCIJE APLIKACIJE SU SLEDECE:

        <ul>
          <li>Rezervacije za Svirke: Pronađite omiljeni bend ili izvođača i rezervišite svoje mesto na vreme.</li>
          <li>Barovi i Klubovi: Otkrijte najbolje barove i klubove u gradu, pregledajte menije i rezervišite sto.</li>
          <li>Planiranje Provoda: Kreirajte plan za veče sa prijateljima, prateći događanja i rezervišite stolove unapred.</li>
        </ul>
      </p>
      </div>

      </div>
      <Footer />
    </div>
  );
}

export default About;