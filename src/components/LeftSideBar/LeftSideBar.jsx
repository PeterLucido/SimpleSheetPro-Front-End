import React from 'react';
import { NavLink } from 'react-router-dom';
import pfp from '/src/pfp.png';

const LeftSideBar = ({ user, handleLogout }) => {
  return (
    <div className="left-sidebar">
      <img src={pfp.png} />
      <ul>
        <h1>Welcome</h1>
        <li><NavLink to="/profiles">Profiles</NavLink></li>
        <li><NavLink to="/DiveSheets">Dive Sheets</NavLink></li>
        <li><NavLink to="/NewDiveSheet">New Dive Sheet</NavLink></li>
        <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
        <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
      </ul>
    </div>
  )
}

export default LeftSideBar;
