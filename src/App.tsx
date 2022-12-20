import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from "react-router-dom";

import './App.css';
import { RootState } from './App/Store';
import Header from './Components/UI/GUI/Header/Header';
import GuestPage from './Components/Pages/GuestPage';
import LandingPage from './Components/Pages/LandingPage';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import ManageAccount from './Components/Pages/ManageAccount';

//todo get loading spinner for suspense fallback

function App() {
  const pageBackground = useSelector((state: RootState) => state.style.styles.pageBackground);

  return (
    <div className="pageContainer" style={pageBackground}>
      <Header />
      <div className="widthControlContainer">
        <Suspense fallback={<p>Loading</p>}>
          <Routes>
            <Route 
            path="/welcome" 
            element={<LandingPage />}
            />
            <Route 
            path="/guest-home" 
            element={<GuestPage />}
            />
            <Route 
            path="/login" 
            element={<Login />}
            />
            <Route 
            path="/signup" 
            element={<Signup />}
            />
            <Route 
            path="/user/manage" 
            element={<ManageAccount />}
            />
            <Route
            path="*"
            element={<Navigate to="/welcome" replace />}
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
