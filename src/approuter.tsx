import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import HomeScreen from './pages/Home/Home';
// import HomePage from './HomePage';
// import DashboardPage from './DashboardPage';
// import LoginPage from './LoginPage';

function AppRouter(): React.ReactElement | null {
  return (
      <Routes>
         <Route path="/"  element={<HomeScreen />} />
         
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
  );
}

export default AppRouter;