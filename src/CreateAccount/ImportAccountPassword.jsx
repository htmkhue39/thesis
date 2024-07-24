import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAccount } from '../AccountContext';
import Header from '../components/Header';
import { checkAccount } from '../../mockApi';
import './CreatePassword.css';
import '../components/Button.css';
import '../components/Step.css';

const ImportAccountPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mnemonic } = location.state || [];
  const { setSelectedAccount } = useAccount();
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const account = await checkAccount(mnemonic, password);
      setSelectedAccount(account);
      navigate('/swap');
    } catch (error) {
      alert('Mnemonic phrase or password is incorrect.');
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
                    <div className="description blue">Enter mnemonic phrase</div>
                  </div>
                  
                  <div className="circle-item">
                    <div className="circle blue-border">2</div>
                    <div className="description blue">Enter passcode</div>
                  </div>
              </div>

              <h2>Enter passcode</h2>
              <p className="mnemonic-phrase-description">Please enter your passcode to import account.</p>

              <div className='form-wrapper'>
                <input 
                    type="password" 
                    placeholder="Enter your passcode" 
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
