import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import './App.css';
import GuestPage from './Components/Pages/GuestPage';
import LandingPage from './Components/Pages/LandingPage';

function App() {
  return (
    <div className="pageContainer">
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
