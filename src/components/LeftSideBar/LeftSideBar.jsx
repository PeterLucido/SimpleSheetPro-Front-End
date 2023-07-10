import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftSideBar = ({ user, handleLogout }) => {
  return (
    <div className="left-sidebar">
      <img src={user.profilePhoto} alt={user.name} />
      <ul>
        <li>Welcome, {user.name}</li>
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
