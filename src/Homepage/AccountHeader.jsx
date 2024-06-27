import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../AccountContext';

import dropIcon from '../assets/dropdown-icon.svg';
import copyIcon from '../assets/copy-icon.svg';
import connectIcon from '../assets/connected-status.png';
import disconnectIcon from '../assets/disconnect-status.png';
import moreIcon from '../assets/more-icon.png'

import './AccountHeader.css';

const AccountHeader = ({ setShowAccountSelector }) => {
  const { selectedAccount, truncateAddress, copyAddress, clearConnectedNodeAddress } = useAccount();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const navigate = useNavigate();
  

  const handleMoreClick = () => {
    setShowMoreOptions(prevState => !prevState);
  };

  const handleViewAccountDetail = () => {
    navigate('/account-details');
  };

  const handleLogout = async () => {
    await clearConnectedNodeAddress();
    alert('Logged out successfully');
    navigate('/');
  };

  const Menus = [
    // { name: 'Account details', action: handleViewAccountDetail },
    { name: 'Logout', action: handleLogout },
  ];

  if (!selectedAccount) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header-wrapper">
      <div className='header'>
        <div className="account-info">
          <div className="account-details" onClick={() => setShowAccountSelector && setShowAccountSelector(true)}>
            <div className="account-text">
              {selectedAccount.connectedNodeAddress ? (
                <img src={connectIcon} alt="Connected" className="dropdown-icon" />
              ) : (
                <img src={disconnectIcon} alt="Disconnected" className="dropdown-icon" />
              )}
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

        <div className='more-icon-wrapper'>
          <button className='more-icon-btn' onClick={handleMoreClick}>
            <img src={moreIcon} className='more-icon'/>
          </button>
          {showMoreOptions && (
            <div className="more-options">
              <ul>
                {
                  Menus.map((menu) => (
                    <li key={menu.name} onClick={menu.action}>
                      {menu.name}
                    </li>
                  ))
                }
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
