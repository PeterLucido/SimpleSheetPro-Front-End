import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Signup from './pages/Signup/Signup';
// import Rules from './components/Rules/Rules.jsx'
import Login from './pages/Login/Login';
import Landing from './pages/Landing/Landing';
import Profiles from './pages/Profiles/Profiles';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import SheetList from './pages/SheetList/SheetList';
import NewDiveSheet from './pages/NewDiveSheet/NewDiveSheet';
import DiveSheetDetails from './pages/DiveSheetDetails/DiveSheetDetails';
// import Team from './pages/Team/Team';
import NavBar from './components/NavBar/NavBar';

import TitleBox from './components/TitleBox/TitleBox';
// import LeftSideBar from './components/LeftSideBar/LeftSideBar';
// import RightSideBar from './components/RightSideBar/RightSideBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import * as authService from './services/authService';
import * as profileService from './services/profileService';
import * as sheetService from './services/sheetService';

import './App.css';

function App() {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null)
  const [diveSheets, setDiveSheets] = useState([])
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

  // useEffect(() => {
  //   switch (location.pathname) {
  //     case '/profiles':
  //       setTitle('Profiles');
  //       break;
  //     case '/DiveSheets':
  //       setTitle('Dive Sheets');
  //       break;
  //     case '/divesheets/new':
  //       setTitle('New Dive Sheet');
  //       break;
  //     default:
  //       setTitle('Simple Sheet Pro');
  //   }
  // }, [location]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const handleAuthEvt = () => {
    setUser(authService.getUser());
  };

  const handleAddSheet = async (sheetFormData) => {
    const newSheet = await sheetService.create(sheetFormData)
    setDiveSheets([newSheet,...diveSheets])
    navigate('/divesheets')
  }

  const handleDeleteSheet = async (diveSheetId) => {
    try {
      // Call the deleteSheet function from the sheetService module
      await sheetService.deleteSheet(diveSheetId);
      // Update the diveSheets state to remove the deleted sheet
      setDiveSheets((prevDiveSheets) =>
        prevDiveSheets.filter((sheet) => sheet._id !== diveSheetId)
      );
      // Navigate to the diveSheets page or any other desired route
      navigate('/divesheets');
    } catch (error) {
      console.error('Error deleting dive sheet:', error);
      // Handle the error, show a message, or redirect the user if needed
    }
  }
  

  return (
    <>
      <TitleBox title={title} />
      {/* <Rules /> */}
      {/* <LeftSideBar 
        user={user} 
        profile={profile} 
        handleLogout={handleLogout} 
      /> */}
      <NavBar 
        user={user} 
        profile={profile}
        handleLogout={handleLogout}
      />

      <Routes>
        <Route 
          path="/" 
          element={
            <Landing 
              user={user} 
              profile={profile} 
            />
          } 
        />
        <Route 
          path="/profiles" 
          element={
            <ProtectedRoute user={user} profile={profile}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/auth/signup" 
          element={
            <Signup 
              handleAuthEvt={handleAuthEvt} 
            />
          } 
        />
        <Route 
          path="/auth/login" 
          element={
            <Login 
              handleAuthEvt={handleAuthEvt} 
            />
          } 
        />
        <Route 
          path="/divesheets" 
          element={
            <ProtectedRoute user={user} profile={profile}>
              <SheetList 
                user={user} 
                profile={profile} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/divesheets/:diveSheetId" 
          element={
            <ProtectedRoute user={user} profile={profile}>
              <DiveSheetDetails 
                user={user} 
                profile={profile}
                handleDeleteSheet={handleDeleteSheet}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/divesheets/new" 
          element={
            <ProtectedRoute user={user} profile={profile}>
              <NewDiveSheet 
                handleAddSheet={handleAddSheet}   
                user={user} 
                profile={profile} 
              />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/auth/change-password" 
          element={
            <ProtectedRoute user={user} profile={profile}>
              <ChangePassword 
                handleAuthEvt={handleAuthEvt} 
              />
            </ProtectedRoute>
          } 
        />
      </Routes>
      {/* <RightSideBar /> */}
    </>
  );
}

export default App;
