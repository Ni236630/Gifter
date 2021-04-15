import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";


export const Header = () => {
  const { logout, isLoggedIn } = useContext(UserProfileContext);
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand">
        GiFTER
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/posts/add" className="nav-link">
            New Post
          </Link>
        </li>
        {isLoggedIn ? 
        <li className="nav-item">
          <Link to="/Login"className="nav-link" onClick={()=>logout()}>Log Out</Link>
        </li> : <div></div>
        }
      </ul>
    </nav>
  );
};

export default Header;