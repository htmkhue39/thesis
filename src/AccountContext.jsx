import React, { createContext, useState, useContext, useEffect } from 'react';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

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

  const handleAccountChange = (accountName) => {
    const account = accounts.find(acc => acc.name === accountName);
    setSelectedAccount(account);
  };

  const truncateAddress = (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(selectedAccount.address);
    alert('Address copied to clipboard');
  };

  const connectNode = async (nodeAddress, callback) => {
    const updatedAccount = {
      ...selectedAccount,
      node: selectedAccount.node.some(node => node.address === nodeAddress)
        ? selectedAccount.node
        : [...selectedAccount.node, { address: nodeAddress }],
      connectedNodeAddress: nodeAddress,
      connected: true,
    };

    setSelectedAccount(updatedAccount);
    setAccounts(prevAccounts =>
      prevAccounts.map(acc =>
        acc.id === selectedAccount.id
          ? updatedAccount
          : acc
      )
    );

    await updateAccountInServer(updatedAccount);

    if (callback) callback();
  };

  const updateAccountInServer = async (updatedAccount) => {
    try {
      await fetch(`http://localhost:3001/accounts/${updatedAccount.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAccount)
      });
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  return (
    <AccountContext.Provider value={{ selectedAccount, handleAccountChange, truncateAddress, copyAddress, accounts, connectNode }}>
      {children}
    </AccountContext.Provider>
  );
};
