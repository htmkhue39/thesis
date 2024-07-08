import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAccount } from '../AccountContext';

import connectIcon from '../assets/connected-status.png';
import disconnectIcon from '../assets/disconnect-status.png';
import moreIcon from '../assets/more-icon.png';

import './AccountHeader.css';

const AccountHeader = () => {
  const { selectedAccount, clearConnectedNodeAddress } = useAccount();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const handleMoreClick = () => {
    setShowMoreOptions(prevState => !prevState);
  };

  const handleViewAccountDetail = () => {
    navigate('/account-details');
  };

  const handleLogout = async () => {
    await clearConnectedNodeAddress();
    selectedAccount(null); // Clear the selected account to update the authentication state
    alert('Logged out successfully');
    navigate('/');
  };

  const Menus = [
    { name: 'Trade', path: '/swap' },
    { name: 'Explore', path: '/explore' },
    { name: 'Node', path: '/nodes' },
    { name: 'Pool', path: '/pool' }
  ];

  const MoreOptions = [
    { name: 'Account Info', action: handleViewAccountDetail },
    { name: 'Logout', action: handleLogout },
  ];

  if (!selectedAccount) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header-wrapper">
      <div className='header'>
        <div className='nav-menu'>
          <ul>
            {Menus.map((menu) => (
              <li
                key={menu.name}
                onClick={() => navigate(menu.path)}
                className={`menu-item ${location.pathname === menu.path ? 'active' : ''}`}
              >
                {menu.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="account-status-wrapper tooltip">
          <div className="account-status">
            {selectedAccount.connectedNodeAddress ? (
              <span className="connected">
                <img src={connectIcon} alt="Connected" className="status-icon" />
                Connected
              </span>
            ) : (
              <span className="disconnected">
                <img src={disconnectIcon} alt="Disconnected" className="status-icon" />
                Disconnected
              </span>
            )}
          </div>
          {selectedAccount.connectedNodeAddress && (
            <div className="tooltiptext">{selectedAccount.connectedNodeAddress}</div>
          )}
        </div>

        <div className='more-icon-wrapper'>
          <button className='more-icon-btn' onClick={handleMoreClick}>
            <img src={moreIcon} className='more-icon'/>
          </button>
          {showMoreOptions && (
            <div className="more-options">
              <ul>
                {MoreOptions.map((menu) => (
                  <li key={menu.name} onClick={menu.action}>
                    {menu.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;