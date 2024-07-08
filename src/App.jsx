import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AccountHeader from './Homepage/AccountHeader';
import Header from './components/Header';
import OnboardingPage from './CreateAccount/OnboardingPage';
import CreatePassword from './CreateAccount/CreatePassword';
import SecureAccount from './CreateAccount/SecureAccount';
import ConfirmAccount from './CreateAccount/ConfirmAccount';
import ImportAccountMnemonic from './CreateAccount/ImportAccountMnemonic';
import ImportAccountPassword from './CreateAccount/ImportAccountPassword';
import SwapCoin from './Homepage/SwapCoin';
import Explore from './Homepage/Explore';
import NodeList from './Homepage/NodeList';
import NodeItem from './Homepage/NodeItem';
import Pool from './Homepage/Pool';
import AddLiquidity from './Homepage/AddLiquidity';

import { AccountProvider, useAccount } from './AccountContext';

import './App.css';

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </AccountProvider>
  );
}

const MainContent = () => {
  const { selectedAccount } = useAccount();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!selectedAccount);
  }, [selectedAccount]);

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <Header />
        {isAuthenticated && <AccountHeader />}
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<OnboardingPage />} />
              <Route path="/create-account/create-password" element={<CreatePassword />} />
              <Route path="/create-account/secure-account" element={<SecureAccount />} />
              <Route path="/create-account/confirm-account" element={<ConfirmAccount />} />
              <Route path="/import-account-mnemonic" element={<ImportAccountMnemonic />} />
              <Route path="/import-account-password" element={<ImportAccountPassword />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/swap" element={<SwapCoin />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/nodes" element={<NodeList />} />
              <Route path="/nodes/:nodeAddress" element={<NodeItem />} />
              <Route path="/pool" element={<Pool />} />
              <Route path="/pool/liquidity" element={<AddLiquidity />} />
              <Route path="*" element={<Navigate to="/swap" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
