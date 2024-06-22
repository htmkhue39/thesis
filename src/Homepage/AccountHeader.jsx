import React from 'react';
import { useAccount } from '../AccountContext';
import dropIcon from '../assets/dropdown-icon.svg';
import copyIcon from '../assets/copy-icon.svg';
import './AccountHeader.css';

const AccountHeader = ({ setShowAccountSelector }) => {
  const { selectedAccount, truncateAddress, copyAddress } = useAccount();

  if (!selectedAccount) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header">
      <div className="account-info">
        <div className="account-details" onClick={() => setShowAccountSelector && setShowAccountSelector(true)}>
          <div className="account-text">
            <span className="account-name">{selectedAccount.name}</span>
            {setShowAccountSelector && <img src={dropIcon} className="dropdown-icon" alt="Dropdown" />}
          </div>
        </div>
        <div className="account-address-wrapper">
          <span className="account-address">{truncateAddress(selectedAccount.address)}</span>
          <button onClick={copyAddress} className="copy-button">
            <img src={copyIcon} className="copy-icon" alt="Copy" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
