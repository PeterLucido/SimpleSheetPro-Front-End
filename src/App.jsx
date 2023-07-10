// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import DiveSheets from './pages/DiveSheets/DiveSheets'
import NewDiveSheet from './pages/NewDiveSheet/NewDiveSheet'

// components
// import NavBar from './components/NavBar/NavBar'
import TitleBox from './components/TitleBox/TitleBox'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import RightSideBar from './components/RightSideBar/RightSideBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
// import * as sheetService from './services/sheetService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const [title, setTitle] = useState('Simple Sheet Pro')


  const location = useLocation();

  // Run this effect whenever the location changes
  useEffect(() => {
    switch(location.pathname) {
      case '/profiles':
        setTitle('Profiles');
        break;
      case '/DiveSheets':
        setTitle('Dive Sheets');
        break;
      // Add more cases as needed for each route
      default:
        setTitle('Simple Sheet Pro'); // default title
    }
  }, [location]);

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <TitleBox title={title} />
      <LeftSideBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/DiveSheets"
          element={
            <ProtectedRoute user={user}>
              <DiveSheets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NewDiveSheet"
          element={
            <ProtectedRoute user={user}>
              <NewDiveSheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <RightSideBar />
    </>
  )
}

export default App
