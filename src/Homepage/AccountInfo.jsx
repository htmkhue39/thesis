import React, { useState, useEffect } from 'react';
import { useAccount } from '../AccountContext';
import { getAccountByAddress } from '../../mockApi';
import './Explore.css';
import './SwapCoin.css';
import './AccountInfo.css';
import Grid from '../CreateAccount/Grid';
import copyIcon from '../assets/copy-icon.svg';
import showIcon from '../assets/show-icon.png';

const AccountInfo = () => {
  const { selectedAccount } = useAccount();
  const [mnemonicVisible, setMnemonicVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [correctPassword, setCorrectPassword] = useState('');

  useEffect(() => {
    if (selectedAccount) {
      const fetchPassword = async () => {
        try {
          const data = await getAccountByAddress(selectedAccount.address);
          setCorrectPassword(data.passcode);
        } catch (error) {
          console.error('Error fetching account password:', error);
        }
      };

      fetchPassword();
    }
  }, [selectedAccount]);

  if (!selectedAccount) {
    return <div>Loading...</div>;
  }

  const handleRevealMnemonic = () => {
    if (password === correctPassword) {
      setMnemonicVisible(true);
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedAccount.address);
    alert('Address copied to clipboard');
  };

  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(selectedAccount.mnemonic.join(' '));
    alert('Mnemonic Phrase copied to clipboard');
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleShowMnemonic = () => {
    setShowModal(true);
  };

  return (
    <div className="app-content-wrapper">
      <div className='app-content'>
        <div className='swap-coin-wrapper'>
          <div className="swap-coin-content">
            <div className='swap-coin-header'>
              <h2 className='title'>Account Details</h2>
            </div>
            <div className="account-detail-wrapper">
              <div className='account-detail'>
                <p><strong>Account Address:</strong>
                  <span className="address">
                    {truncateAddress(selectedAccount.address)}
                    <img
                      src={copyIcon}
                      alt="Copy"
                      className="copy-icon"
                      onClick={handleCopyAddress}
                    />
                  </span>
                </p>
                <p>
                  <strong>Mnemonic Phrase:</strong> 
                  <span>
                    {'**********'}
                    <img
                      src={showIcon}
                      alt="Show"
                      className="show-icon"
                      onClick={handleShowMnemonic}
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="token-modal">
            <div className="modal-content">
              <h2>View Mnemonic Phrase</h2>
              {mnemonicVisible ? (
                <>
                  <Grid mnemonic={selectedAccount.mnemonic} />
                  <div className='button-wrapper'>
                    <button className="btn-secondary medium" onClick={handleCopyMnemonic}>
                      Copy Mnemonic Phrase
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="password"
                    className="mnemonic-input"
                    placeholder="Enter password to reveal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!isPasswordCorrect && <p className="error-message">Incorrect password</p>}
                  <div className='button-wrapper'>
                    <button className="btn-secondary medium" onClick={handleRevealMnemonic}>
                      Reveal
                    </button>
                  </div>
                </>
              )}
              <div className='button-wrapper'>
                <button className="btn-primary medium" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountInfo;
