import React from 'react'
import { useNavigate } from "react-router-dom";
import './header.scss'
import userImage from '../../images/user.png';

const Header = () => {
  const getEmailData = localStorage.getItem('emailData');
  const getPwdData = localStorage.getItem('pwdData');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }

  const handleLogin = () => {
    navigate("/login");
    window.location.reload();
  }

  return (
    <div className="navbar">
        <div className="navContainer">
            <h1>Contact Manager</h1>
            <div className="leftDiv">
              <p className="profileName">{getEmailData}</p>
              <img className={`${getEmailData ? 'show' : 'hide'}`} src={userImage} />
              <button className={`navButton loginbtn ${getEmailData&&getPwdData ? 'hide' : 'show'}`}
              onClick={handleLogin}>Login</button>
              <button className={`navButton logoutbtn ${getEmailData&&getPwdData ? 'show' : 'hide'}`}
              onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Header