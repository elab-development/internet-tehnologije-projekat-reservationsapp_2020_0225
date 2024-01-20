import { BrowserRouter,Route,Routes, Navigate  } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import Objects from './components/Objects';
import React, { useState } from 'react';
import './App.css';
import Manager from './components/Manager';
import About from './components/About';


function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {

    setLoggedInUser(username);

  };

  const handleLogout = () => {

    setLoggedInUser(null);

    return <Navigate to="/" />;
  };


  const [searchCriteria,setSearchCriteria]=useState("");

  function search(criteria){

    setSearchCriteria(criteria);
  }


  return (
    <div className="App">
    <BrowserRouter>  
    {loggedInUser && <NavBar  search={search} loggedInUser={loggedInUser} handleLogout={handleLogout} />}
        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <Navigate to="/objects" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route 
            path="/objects" 
            element={<Objects  criteria={searchCriteria} loggedInUser={loggedInUser} />} 
          />
          <Route
            path="/manager"
            element={loggedInUser ? <Manager loggedInUser={loggedInUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/about"
            element={loggedInUser ? <About loggedInUser={loggedInUser} /> : <Navigate to="/" />}
          />


          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
