import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AccountHeader from './Homepage/AccountHeader';
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
import AccountInfo from './Homepage/AccountInfo';
import OrderBookList from './Homepage/OrderBookList';
import OrderBook from './Homepage/OrderBook';
import { AccountProvider, useAccount } from './AccountContext';
import './App.css';
import '../mockApi';

function App() {
  return (
    <AccountProvider>
      <Router>
        <MainContent />
      </Router>
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
              <Route path="/account" element={<AccountInfo />} />
              <Route path="/orderbooks" element={<OrderBookList />} />
              <Route path="/orderbooks/:orderBookId" element={<OrderBook />} />
              <Route path="*" element={<Navigate to="/swap" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
