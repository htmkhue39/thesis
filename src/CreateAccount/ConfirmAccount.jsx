import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreatePassword.css'
import '../components/Button.css'
import '../components/Step.css'

const ConfirmSecureChain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInput, setUserInput] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const mnemonic = location.state?.mnemonic || [];

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleConfirm = async () => {
    if (userInput === mnemonic.join(' ')) {
      setIsConfirmed(true);

      // Mock API call to confirm mnemonic
      try {
        const response = await fetch('http://localhost:3001/confirm-mnemonic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mnemonic })
        });

        if (response.ok) {
          navigate('/homepage');
        } else {
          console.error('Failed to confirm mnemonic');
        }
      } catch (error) {
        console.error('Error confirming mnemonic:', error);
      }

    } else {
      setIsConfirmed(false);
      alert('Mnemonic phrase does not match.');
    }
  };

  return (
    <div className='app'>
      <div className='onboarding-flow'>
        <div className='onboarding-flow-wrapper'>
          <div className="circle-container">
              <div className="circle-item">
                <div className="circle blue-full">1</div>
                <div className="description blue">Create password</div>
              </div>
              <div className="circle-item">
                <div className="circle blue-full">2</div>
                <div className="description blue">Secure Account</div>
              </div>
              <div className="circle-item">
                <div className="circle blue-border">3</div>
                <div className="description blue">Confirm secure chain</div>
              </div>
          </div>

          <h2>Confirm Mnemonic Phrase</h2>
          <p className="mnemonic-phrase-description">Please enter your mnemonic phrase to confirm your account.</p>

          <div className='form-wrapper'>
            <textarea 
                value={userInput}
                onChange={handleInputChange}
                className="mnemonic-input"
            />
            <button className='btn-primary medium' onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSecureChain;
