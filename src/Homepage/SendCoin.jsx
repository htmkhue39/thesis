import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountHeader from './AccountHeader';
import Header from '../components/Header';
import './SendCoin.css';
import '../components/Button.css';

const accounts = [
  { name: 'Account 1', address: '0x76721d7dE385beF55F8447C0afC704f7057e9aBE' },
  { name: 'Account 2', address: '0x12345d7dE385beF55F8447C0afC704f7057e1234' }
];

const mockApiCall = (address) => {
  const accountDetails = {
    '0x76721d7dE385beF55F8447C0afC704f7057e9aBE': { name: 'Account 1', balance: '0 ETH' },
    '0x12345d7dE385beF55F8447C0afC704f7057e1234': { name: 'Account 2', balance: '1.5 ETH' }
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accountDetails[address]);
    }, 1000);
  });
};

function SendCoin() {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [validAddress, setValidAddress] = useState(false);
  const [recipientDetails, setRecipientDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const copyAddress = () => {
    navigator.clipboard.writeText(selectedAccount.address);
    alert('Address copied to clipboard');
  };

  const handleAccountChange = (event) => {
    const accountName = event.target.value;
    const account = accounts.find((acc) => acc.name === accountName);
    setSelectedAccount(account);
    setShowAccountSelector(false);
  };

  const truncateAddress = (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setRecipientAddress(address);
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
    setValidAddress(isValid);
    if (isValid) {
      setLoading(true);
      const details = await mockApiCall(address);
      setRecipientDetails(details);
      setLoading(false);
    } else {
      setRecipientDetails(null);
    }
  };

  const handleClear = () => {
    setRecipientAddress('');
    setValidAddress(false);
    setRecipientDetails(null);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSend = () => {
    if (validAddress && amount) {
      // Perform send transaction here
      alert(`Sending ${amount} ETH to ${recipientAddress} from ${selectedAccount.name}`);
    }
  };

  const handleCancel = () => {
    navigate('/homepage');
  };

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <Header />
        <AccountHeader
          selectedAccount={selectedAccount}
          setShowAccountSelector={setShowAccountSelector}
          truncateAddress={truncateAddress}
          copyAddress={copyAddress}
        />
        <div className='send-coin-wrapper'>
          <div className="send-coin-content">
            <div className='send-coin-header'>
              <h2 className='title'>Send to</h2>
              <button className='btn-link' onClick={handleCancel}>Cancel</button>
            </div>

            {!validAddress ? (
              <div className="send-to">
                <input
                  type="text"
                  placeholder="Enter public address (0x) or ENS name"
                  value={recipientAddress}
                  onChange={handleAddressChange}
                  className={!validAddress && recipientAddress ? 'invalid' : ''}
                />
                {recipientAddress && (
                  <button onClick={handleClear} className="clear-button">X</button>
                )}
              </div>
            ) : (
              recipientDetails && (
                <div className="send-to">
                  <span className="send-account-address">{recipientAddress}</span>
                  <button onClick={handleClear} className="clear-button">X</button>
                </div>
              )
            )}

            {loading ? (
              <div className="loading-message">Loading...</div>
            ) : (
              !validAddress && recipientAddress && (
                <div className="error-message">
                  Recipient address is invalid
                </div>
              )
            )}

            {validAddress && recipientDetails  && !loading && (
              <div className="send-details-wrapper">
                <div className='send-details'>
                  <div className="send-row">
                    <div className='send-label'> Asset: </div>
                    <div className='send-field'>
                      
                    </div>
                    <span>ETH</span>
                    <span>Balance: {recipientDetails.balance}</span>
                  </div>
                  <div className="send-row">
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={handleAmountChange} placeholder="0 ETH" />
                  </div>
                  <div className="fee-info">
                    <label>Estimated fee:</label>
                    <span>0.00028934 ETH</span>
                    <span>Max fee: 0.00038987 ETH</span>
                  </div>
                  <button onClick={handleSend} className="send-button" disabled={!amount}>Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendCoin;
