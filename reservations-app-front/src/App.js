import { BrowserRouter,Route,Routes, Navigate  } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import React, { useState } from 'react';
import './App.css';


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

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
