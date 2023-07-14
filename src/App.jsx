import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Landing from './pages/Landing/Landing';
import Profiles from './pages/Profiles/Profiles';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import DiveSheets from './pages/DiveSheets/DiveSheets';
import NewDiveSheet from './pages/NewDiveSheet/NewDiveSheet';

import TitleBox from './components/TitleBox/TitleBox';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import RightSideBar from './components/RightSideBar/RightSideBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import * as authService from './services/authService';
import * as profileService from './services/profileService'

import './App.css';

function App() {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null)
  const [title, setTitle] = useState('Simple Sheet Pro');

  const location = useLocation();

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfile(
        profileData.find((pro) => user.profile === pro._id)
      )
    }
    if (user) fetchProfiles()
  }, [user])

  useEffect(() => {
    switch (location.pathname) {
      case '/profiles':
        setTitle('Profiles');
        break;
      case '/DiveSheets':
        setTitle('Dive Sheets');
        break;
      default:
        setTitle('Simple Sheet Pro');
    }
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const handleAuthEvt = () => {
    setUser(authService.getUser());
  };

  return (
    <>
      <TitleBox title={title} />
      <LeftSideBar user={user} profile={profile} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} profile={profile} />} />
        <Route path="/profiles" element={<ProtectedRoute user={user} profile={profile}><Profiles /></ProtectedRoute>} />
        <Route path="/auth/signup" element={<Signup handleAuthEvt={handleAuthEvt} />} />
        <Route path="/auth/login" element={<Login handleAuthEvt={handleAuthEvt} />} />
        <Route path="/DiveSheets" element={<ProtectedRoute user={user} profile={profile}><DiveSheets /></ProtectedRoute>} />
        <Route path="/NewDiveSheet" element={<ProtectedRoute user={user} profile={profile}><NewDiveSheet profile={profile} /></ProtectedRoute>} />
        <Route path="/auth/change-password" element={<ProtectedRoute user={user} profile={profile}><ChangePassword handleAuthEvt={handleAuthEvt} /></ProtectedRoute>} />
      </Routes>
      <RightSideBar />
    </>
  );
}

export default App;
