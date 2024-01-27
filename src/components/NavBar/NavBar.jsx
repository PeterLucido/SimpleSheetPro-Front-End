import { NavLink } from 'react-router-dom';
import pfp from '/src/pfp.png';
import Styles from './NavBar.module.css';
// import TitleBox from '../TitleBox/TitleBox';
import { useState } from 'react';

const NavBar = ({ user, profile, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileImg = profile && profile.photo ? profile.photo : pfp;
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);



  return (
    <div className={Styles.NavBar}>
      {user && (
        <div className={Styles.leftSide}>
          {/* <TitleBox title={title}/> */}
          <div className={Styles.photoContainer} onClick={toggleDropdown}>
            <img src={profileImg} alt="Profile" />
          </div>
          {dropdownOpen && (
            <div className={Styles.dropdownMenu}>
              <ul>
                <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
                <li><a href="/" onClick={handleLogout}>Log Out</a></li>
              </ul>
            </div>
          )}
        </div>
      )}
      <div className={Styles.navList}>
        <ul>
          <li><NavLink to="/DiveSheets">Dive Sheets</NavLink></li>
          <li><NavLink to="/DiveSheets/New">New Dive Sheet</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar;
