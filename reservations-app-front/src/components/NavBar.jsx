import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiSolidDrink } from "react-icons/bi";
import '../CSS/NavBar.css';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from "react-icons/fa";

function NavBar({ loggedInUser, handleLogout, search }) {

    const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

    return (
      <div>
        <nav className="nav">
          <div className="nav__title">
            <h1>Reservations for best experience</h1>
          </div>
          <ul className="nav__list">
            {loggedInUser ? (
              <>
                <li className="nav__item">
                  <Link to='/manager'>Manager Profile <IoPersonCircleOutline /></Link>
                </li>
                <li className="nav__item">
                  <Link to='/objects'>Objects <BiSolidDrink /></Link>
                </li>
                <li className="nav__item">
                  <Link to='/about'>About <FaInfoCircle /> </Link>
                </li>
                <li className="nav__item">
                  {loggedInUser}{' '}
                  <button className="logout-button" onClick={handleLogoutClick}>
                    Logout
                </button>
                </li>
                <li className="nav__item">
                <input type="text" id="criteria" placeholder="search" 
                        name="search" onChange={()=>search(document.getElementById('criteria').value)}/>
                </li>
              </>
            ) : (
              <li className="nav__item">
                <Link to="/">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavBar;