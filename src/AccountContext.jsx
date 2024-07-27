import { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAccounts,
  clearConnectedNodeAddress as clearConnectedNodeAddressApi 
} from '../mockApi';
import { createAccount as createAccountApi } from './api/accounts';
import { connectNode as connectNodeApi } from './api/nodes';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
    const savedAccount = localStorage.getItem('selectedAccount');
    if (savedAccount) {
      setSelectedAccount(JSON.parse(savedAccount));
    }
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      localStorage.setItem('selectedAccount', JSON.stringify(selectedAccount));
    } else {
      localStorage.removeItem('selectedAccount');
    }
  }, [selectedAccount]);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const createAccount = async (newAccount) => {
    try {
      const createdAccount = await createAccountApi(newAccount);
      setAccounts(prevAccounts => [...prevAccounts, createdAccount]);
      return createdAccount;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  };

  const connectNode = async (nodeAddress, callback) => {
    try {
      const res = await connectNodeApi(selectedAccount.address, nodeAddress);

      if (!res.connected) {
        alert("Error while connecting node")
        return
      }
    
      const updatedAccount = {
        ...selectedAccount,
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

      if (callback) callback();
    } catch (error) {
      console.error('Error connecting node:', error);
      throw error;
    }
  };

  const clearConnectedNodeAddress = async () => {
    try {
      await clearConnectedNodeAddressApi(selectedAccount.id);
      const updatedAccount = { ...selectedAccount, connectedNodeAddress: '', connected: false };
      setSelectedAccount(updatedAccount);
      setAccounts(prevAccounts =>
        prevAccounts.map(acc =>
          acc.id === selectedAccount.id
            ? updatedAccount
            : acc
        )
      );
    } catch (error) {
      console.error('Error clearing connected node address:', error);
    }
  };

  const logout = async () => {
    if (selectedAccount) {
      await clearConnectedNodeAddress();
      setSelectedAccount(null);
    }
  };

  return (
    <AccountContext.Provider value={{
      selectedAccount,
      setSelectedAccount,
      accounts,
      setAccounts,
      createAccount,
      connectNode,
      clearConnectedNodeAddress,
      logout,
    }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
