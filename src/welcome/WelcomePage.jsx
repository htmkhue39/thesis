import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // You can style your welcome page in a separate CSS file

const WelcomePage = () => {
  const navigate = useNavigate(); 
  const handleCreateAccount = () => {
    // Handle create account logic
    console.log('Create new account clicked');
    navigate("/create-account")
  };

  const handleImportAccount = () => {
    // Handle import account logic
    console.log('Import existing account clicked');
    // You can navigate to the import account page or do whatever you need
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Your Website</h1>
      <div className="button-container">
        <button onClick={handleCreateAccount}>Create New Account</button>
        <button onClick={handleImportAccount}>Import an Existing Account</button>
      </div>
    </div>
  );
};

export default WelcomePage;
