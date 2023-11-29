import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Header from './components/Header/Header';
// import BasicReg from './views/BasicReg';
import React from 'react';
import './styles/styles.css';
// import Card from './components/PropertyCard';
// import Map from './components/Map';
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {FirebaseAppProvider} from "reactfire";
import firebaseApp from './firebaseConfig';
import CreateListing from "./pages/CreateListing";
import SignupPage from './pages/SignupPage';
import PropertyPage from './pages/PropertyPage';
import Dashboard from './pages/Dashboard';
import UserInfo from './pages/UserInfo';
import PasswordResetPage from './components/PasswordResetPage';

// const emptyListing = {
//     "Property ID": null,
//     "Photo File Name": null,
//     "Street Address": null,
//     "Rent Estimate (Zillow)": null,
//     "Bedrooms": null,
//     "Bathrooms": null,
//     "Square Feet": null
// };


function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseApp}>
      <Router>
        <div id="app">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/create-listing" element={<CreateListing />} />
            {/*<Route path="/reset-password" element={<PasswordResetPage />} />*/}
            <Route path="/property/:propertyId" element={<PropertyPage />} />
            <Route path="/dashboard" element={<Dashboard /> } />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/reset-password" element={<PasswordResetPage />} />
          </Routes>
          {/*<BasicReg />*/}
          {/* <Card listing={emptyListing} />
          <Map /> */}
        </div>
      </Router>
    </FirebaseAppProvider>
  );
}
export default App;


