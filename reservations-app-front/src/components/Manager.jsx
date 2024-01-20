import React from 'react';
import Footer from './Footer';
import Object from './Object'; // Uvoz komponente Object
import '../CSS/Manager.css';

import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';

function Manager({ loggedInUser }) {

  const usersInfo = {
    Dimitrije: {
      username: 'Dimitrije Ostojic',
      position: 'Manager of several Belgrade nightclubs',
      yearsExperience: '6',
      basedIn: 'Belgrade',
      profileImage: user1,
      bio: 'I aspire to travel the world!',
      objects: [],
      
    },
    Kristina: {
      username: 'Kristina Mladenovic',
      position: 'Hostess for best bars and restaurants with live music.',
      yearsExperience: '10',
      basedIn: 'Belgrade',
      profileImage: user2,
      bio: 'You cannot spell awesome without ME!',
      objects: []
    }
  }; 
  
  const userInfo = usersInfo[loggedInUser];
  const [objects, setObjects] = React.useState(userInfo ? userInfo.objects : []);

  if (!userInfo) {
    return <div>User not found</div>;
  }

  const { username, position, yearsExperience, basedIn, profileImage, bio } = userInfo;

  const updateObject = (index, updatedObject) => {
    const updatedObjects = [...objects];
    updatedObjects[index] = updatedObject;
    setObjects(updatedObjects);
  };

  const deleteObject = (index) => {
    const updatedObjects = [...objects];
    updatedObjects.splice(index, 1);
    setObjects(updatedObjects);
  };

  const addNewObject = (newObject) => {
    setObjects([...objects, newObject]);
  };

  return (
    <div>
      <div className="profile">
       
        <div className="profile-info">
          <h2>Manager profile</h2>
          <img src={profileImage} alt="Manager" className="profile-image" />
          <div className="user-details">
            <p>Name: {username}</p>
            <p>Position: {position}</p>
            <p>Years of experience in managing objects: {yearsExperience}</p>
            <p>Based in: {basedIn}</p>
            <p>Bio: {bio}</p>
            </div>
            <div className="objects">
           
                <div className="new-object">
                {/* Forma za unos novog objekta */}
                <h3>KREIRANJE NOVOG OBJEKTA:</h3>
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    const name = e.target.name.value;
                    const city = "Belgrade";
                    addNewObject({ manager: loggedInUser, name, city });
                    }}
                >
                    <label htmlFor="name">Unesi naziv objekta:</label>
                    <input type="name" name="name" id="name" placeholder="Unesite naziv objekta" />

                    <button type="submit">ADD NEW OBJECT</button>
                </form>
                </div>
              {objects.map((object, index) => (
                <Object
                  key={index}
                  objectId={index}
                  manager={object.manager}
                  name={object.name}
                  city={object.city}
                  loggedInUser={loggedInUser}
                  updateObject={updateObject}
                  deleteObject={deleteObject}
                />
              ))}
  
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Manager;