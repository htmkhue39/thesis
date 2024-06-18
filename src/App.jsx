import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './welcome/WelcomePage';
import CreatePassword from './CreateAccount/CreatePassword';
import SecureAccount from './CreateAccount/SecureAccount';
import ConfirmAccount from './CreateAccount/ConfirmAccount';
import ImportAccountMnemonic from './CreateAccount/ImportAccountMnemonic';
import ImportAccountPassword from './CreateAccount/ImportAccountPassword';
import Homepage from './Homepage/Homepage'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/create-account/create-password" element={<CreatePassword />} />
          <Route path="/create-account/secure-account" element={<SecureAccount />} />
          <Route path="/create-account/confirm-account" element={<ConfirmAccount />} />
          <Route path="/import-account-mnemonic" element={<ImportAccountMnemonic />} />
          <Route path="/import-account-password" element={<ImportAccountPassword />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;