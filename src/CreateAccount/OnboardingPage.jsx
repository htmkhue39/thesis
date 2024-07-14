import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './OnboardingPage.css'; 
import '../components/Button.css'
import logo from '../assets/logo.jpg';

const OnboardingPage = () => {
  const navigate = useNavigate(); 
  const handleCreateAccount = () => {
    // Handle create account logic
    console.log('Create new account clicked');
    navigate("/create-account/create-password")
  };

  const handleImportAccount = () => {
    // Handle import account logic
    console.log('Import existing account clicked');
    navigate("/import-account-mnemonic")
  };

  return (
    <div className='app'>
      <div className="onboarding-flow">
        <div className="onboarding-flow-wrapper">
          <h2>Let's get started</h2>
          <div className='logo-wrapper'>
            <img src={logo} alt="Logo" className='logo' />
          </div>
          
          <div className='button-container'>
            <button className='btn-primary' onClick={handleCreateAccount}>Create New Account</button>
            <button className='btn-secondary' onClick={handleImportAccount}>Import an Existing Account</button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
