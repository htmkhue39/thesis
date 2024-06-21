import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePassword.css';
import './OnboardingPage.css';
import '../components/Button.css';
import '../components/Step.css';

const CreatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const handleCreate = async (event) => {
    event.preventDefault();

    if (newPassword.length < 8) {
      setPasswordStrength('Password not long enough');
      return;
    }

    setPasswordStrength('');

    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
      navigate("/create-account/secure-account");
      
      // TODO: API call to create account
      try {
        const response = await fetch('http://localhost:3001/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: 'New Account', address: '0xNewAddress', password: newPassword })
        });
  
        if (response.ok) {
          alert('Passwords match and meet the requirements!');
          navigate("/create-account/secure-account");
        } else {
          console.error('Failed to create account');
        }
      } catch (error) {
        console.error('Error creating account:', error);
      }
    }
  };

  const handlePasswordChange = (password) => {
    setNewPassword(password);
    if (password.length < 8) {
      setPasswordStrength('Password not long enough');
    } else {
      setPasswordStrength('Password strength: Good');
    }
  };

  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
    setPasswordsMatch(password === newPassword);
  };

  return (
    <div className='app'>
      <div className='onboarding-flow'>
        <div className='onboarding-flow-wrapper'>
            <div className="circle-container">
              <div className="circle-item">
                <div className="circle blue-border">1</div>
                <div className="description blue">Create password</div>
              </div>
              <div className="circle-item">
                <div className="circle gray-border">2</div>
                <div className="description">Secure Account</div>
              </div>
              <div className="circle-item">
                <div className="circle gray-border">3</div>
                <div className="description">Confirm secure chain</div>
              </div>
            </div>

            <h1>Create Password</h1>
            <div className='form-wrapper'>
              <form className="password-form" onSubmit={handleCreate}>
                <div className="form-group">
                  <label htmlFor="new-password">New password (8 characters min)</label>
                  <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className='password-input'
                  />
                  {passwordStrength && <p className="error">{passwordStrength}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    className='password-input'
                  />
                  {!passwordsMatch && <p className="error">Passwords don't match</p>}
                </div>

                <button type="submit" className='btn-primary'>Create a new account</button>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
