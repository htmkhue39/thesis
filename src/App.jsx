import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './welcome/WelcomePage';
import CreatePassword from './CreateAccount/CreatePassword';
import SecureAccount from './CreateAccount/SecureAccount';
import ConfirmAccount from './CreateAccount/ConfirmAccount';
import ImportAccount from './ImportAccount/ImportAccount';
import Homepage from './Homepage/Homepage'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/create-account/create-password" element={<CreatePassword />} />
          <Route path="/create-account/secure-account" element={<SecureAccount />} />
          <Route path="/create-account/confirm-account" element={<ConfirmAccount />} />
          <Route path="/import-account" element={<ImportAccount />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;