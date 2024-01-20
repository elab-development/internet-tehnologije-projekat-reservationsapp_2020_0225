import { BrowserRouter,Route,Routes, Navigate  } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import React, { useState } from 'react';
import './App.css';


function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {

    setLoggedInUser(username);

  };




  return (
    <div className="App">
    <BrowserRouter>  
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
