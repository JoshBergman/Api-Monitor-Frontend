import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from "react-router-dom";

import './App.css';
import { RootState } from './App/Store';
import Header from './Components/UI/GUI/Header/Header';
import Footer from './Components/UI/GUI/Footer/Footer';
import LoadingPage from './Components/Pages/LoadingPage';
// import GuestPage from './Components/Pages/GuestPage';
// import LandingPage from './Components/Pages/LandingPage';
// import Login from './Components/Pages/Login';
// import Signup from './Components/Pages/Signup';
// import ManageAccount from './Components/Pages/ManageAccount';

function App() {
  const pageBackground = useSelector((state: RootState) => state.style.styles.pageBackground);

  const LandingPage = React.lazy(() => import('./Components/Pages/LandingPage'));
  const GuestPage = React.lazy(() => import('./Components/Pages/GuestPage'));
  const ManageAccount = React.lazy(() => import('./Components/Pages/ManageAccount'));
  const Login = React.lazy(() => import('./Components/Pages/Login'));
  const Signup = React.lazy(() => import('./Components/Pages/Signup'));


  return (
    <div className="pageContainer" style={pageBackground}>
      <Header />
      <div className="widthControlContainer">
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route 
            path="/welcome" 
            element={<LandingPage />}
            />
            <Route 
            path="/work-area" 
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
            path="/forever/loading" 
            element={<LoadingPage />}
            />
            <Route
            path="*"
            element={<Navigate to="/welcome" replace />}
            />
          </Routes>
        </Suspense>
      </div>
    <Footer />
    </div>
  );
}

export default App;
