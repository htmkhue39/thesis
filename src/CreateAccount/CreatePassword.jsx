import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';

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
    // event.preventDefault();

    // if (newPassword.length < 8) {
    //   setPasswordStrength('Password not long enough');
    //   return;
    // }

    // setPasswordStrength('');

    // if (newPassword !== confirmPassword) {
    //   setPasswordsMatch(false);
    //   return;
    // } else {
    //   setPasswordsMatch(true);
    //   localStorage.setItem('newPassword', newPassword);
    //   navigate("/create-account/secure-account");      
    // }

    navigate("/create-account/secure-account");      
  };

  const handlePasswordChange = (password) => {
    setNewPassword(password);
    
    const lengthRequirement = password.length >= 8;
    const uppercaseRequirement = /[A-Z]/.test(password);
    const lowercaseRequirement = /[a-z]/.test(password);
    const numberRequirement = /[0-9]/.test(password);
    const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (!lengthRequirement) {
      setPasswordStrength('Password not long enough');
    } else if (!uppercaseRequirement) {
      setPasswordStrength('Password should contain at least one uppercase letter');
    } else if (!lowercaseRequirement) {
      setPasswordStrength('Password should contain at least one lowercase letter');
    } else if (!numberRequirement) {
      setPasswordStrength('Password should contain at least one number');
    } else if (!specialCharRequirement) {
      setPasswordStrength('Password should contain at least one special character');
    } else {
      setPasswordStrength('Password strength: Good');
    }
  };

  const handleConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
    setPasswordsMatch(password === newPassword);
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
                      {passwordStrength && 
                        <p className={passwordStrength === 'Password strength: Good' ? 'good' : 'error'}>
                          {passwordStrength}
                        </p>
                      }
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
      </div>
    </div>
  );
}

export default CreatePassword;
