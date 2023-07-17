import React from 'react';
import { NavLink } from 'react-router-dom';
import pfp from '/src/pfp.png';
import Styles from './LeftSideBar.module.css';

const LeftSideBar = ({ user, profile, handleLogout }) => {

  const profileImg = profile && profile.photo ? profile.photo : pfp;

  return (
    <div className="left-sidebar">
      {user ?
        <>
      <div className={Styles.photoContainer}>
        <img src={profileImg} />
      </div>
      <h3 className={Styles.welcome}>Welcome, {profile && profile.firstName}</h3>
      <div className={Styles.navList}>
        <ul >
          <li><NavLink to="/profiles">Profiles</NavLink></li>
          <li><NavLink to="/DiveSheets">Dive Sheets</NavLink></li>
          <li><NavLink to="/NewDiveSheet">New Dive Sheet</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
        </ul>
      </div>
      </>
      :
      <div className={Styles.navList}>
        <ul >
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      </div>
      }
    </div>
  )
}

export default LeftSideBar;
