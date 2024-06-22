// AccountContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:3001/accounts');
        const data = await response.json();
        setAccounts(data);
        const currentAccount = data.find(account => account.current === true);
        setSelectedAccount(currentAccount);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountChange = (accountName) => {
    const account = accounts.find((acc) => acc.name === accountName);
    setSelectedAccount(account);
  };

  const truncateAddress = (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(selectedAccount.address);
    alert('Address copied to clipboard');
  };

  return (
    <AccountContext.Provider value={{ selectedAccount, handleAccountChange, truncateAddress, copyAddress, accounts }}>
      {children}
    </AccountContext.Provider>
  );
};
