// AccountContext.js
import React, { createContext, useState, useContext } from 'react';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const accounts = [
    { name: 'Account 1', address: '0x76721d7dE385beF55F8447C0afC704f7057e9aBE' },
    { name: 'Account 2', address: '0x12345d7dE385beF55F8447C0afC704f7057e1234' }
  ];

  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);

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
