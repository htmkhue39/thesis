import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../AccountContext';
import Header from '../components/Header';
import './CreatePassword.css';
import '../components/Button.css';
import '../components/Step.css';

const ImportAccountPassword = () => {
  const navigate = useNavigate();
  const { accounts, setSelectedAccount } = useAccount(); // Use the account context
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    const account = accounts.find(acc => acc.password === password);
    if (account) {
      setSelectedAccount(account);
      navigate('/swap');
    } else {
      alert('Password is incorrect.');
    }
  };

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <Header />
        <div className='app'>
          <div className='onboarding-flow'>
            <div className='onboarding-flow-wrapper'>
              <div className="circle-container">
                  <div className="circle-item">
                    <div className="circle blue-full">1</div>
                    <div className="description">Enter mnemonic phrase</div>
                  </div>
                  
                  <div className="circle-item">
                    <div className="circle blue-border">2</div>
                    <div className="description">Enter password</div>
                  </div>
              </div>

              <h2>Enter password</h2>
              <p className="mnemonic-phrase-description">Please enter your password to import account.</p>

              <div className='form-wrapper'>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    className="password-input"
                />
                <button className='btn-primary medium import' onClick={handleSubmit}>Import Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportAccountPassword;
