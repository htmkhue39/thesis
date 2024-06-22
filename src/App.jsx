import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OnboardingPage from './CreateAccount/OnboardingPage';
import CreatePassword from './CreateAccount/CreatePassword';
import SecureAccount from './CreateAccount/SecureAccount';
import ConfirmAccount from './CreateAccount/ConfirmAccount';
import ImportAccountMnemonic from './CreateAccount/ImportAccountMnemonic';
import ImportAccountPassword from './CreateAccount/ImportAccountPassword';
import Homepage from './Homepage/Homepage';
import SendCoin from './Homepage/SendCoin'; // Ensure the path is correct
import SwapCoin from './Homepage/SwapCoin';
import { AccountProvider } from './AccountContext';

import './App.css';

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/create-account/create-password" element={<CreatePassword />} />
          <Route path="/create-account/secure-account" element={<SecureAccount />} />
          <Route path="/create-account/confirm-account" element={<ConfirmAccount />} />
          <Route path="/import-account-mnemonic" element={<ImportAccountMnemonic />} />
          <Route path="/import-account-password" element={<ImportAccountPassword />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/homepage-send" element={<SendCoin />} />
          <Route path="/homepage-swap" element={<SwapCoin />} />
        </Routes>
    </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
