// Import slika za objekte
import object1 from '../assets/object1.jpg';
import object2 from '../assets/object2.jpg';
import object3 from '../assets/object3.jpg';
import object4 from '../assets/object4.jpg';
import object5 from '../assets/object5.jpg';
import object6 from '../assets/object6.jpeg';
import object7 from '../assets/object7.jpg';

const ListOfObjects = () => {

const objects = [
    { id: 1, name: "Sauvignon", manager: 'Marko Petrović', text: 'Uživajte u večeri uz najbolja vina i atmosferu u centru Beograda!', city: "Beograd", image: object1 },
    { id: 2, name: "The Pijaca", manager: 'Jovana Janković', text: 'Obiđite najpoznatiju pijacu u Beogradu i osetite duh lokalne kuhinje i tradicije.', city: "Beograd", image: object2 },
    { id: 3, name: "Ona Moja kafana", manager: 'Nikola Nikolić', text: 'Zavirite u autentičnu beogradsku kafanu i uživajte u živoj muzici i domaćoj hrani.', city:"Beograd" , image: object3 },
    { id: 4, name: "Restoran Dolly Bell", manager: 'Tamara Tomić', text: 'Ekskluzivni doživljaj u restoranu Dolly Bell s internacionalnom kuhinjom i vrhunskim uslugama.', city:"Beograd", image: object4 },
    { id: 5, name: "Boutique 3", manager: 'Stefan Stojanović', text: 'Nezaboravno iskustvo u Boutique 3 - oaza luksuza i najzanimljivijih ukusa.', city:"Beograd" , image: object5 },
    { id: 6, name: "Lafayette", manager: 'Jelena Jovanović', text: 'Osetite pariski šarm u srcu Beograda u kabareu Lafayette uz najbolju muziku i performans.', city:"Beograd" , image: object6 },
    { id: 7, name: "Tarapana", manager: 'Aleksandar Antić', text: 'Istražite noćni život Beograda i prisustvujte najboljoj zivoj muzici.', city:"Beograd" , image: object7 },
  ];

  return { objects };
};

export default ListOfObjects;