
import Home from './home';
import AllObjects from './all-objects';
import CreateObject from './create-object';
import EditObject from './edit-object';
import MyProfile from './my-profile';
import { Login } from './login';
import ObjectDetails from './object-details';
import ManagerProfile from './manager-profile';
import Managers from './manager';
import AdminHome from './admin_homepage';


//predstavlja izvoz svih komponenti koje se koriste u aplikaciji. Svaka od ovih komponenti se uvozi iz svog odgovarajućeg fajla
// i nakon toga se izvozi na korišćenje drugim delovima aplikacije.
export {
  Home,
  Login,
  AllObjects,
  CreateObject,
  MyProfile,
  EditObject,
  ObjectDetails,
  ManagerProfile,
  Managers,
  AdminHome
};