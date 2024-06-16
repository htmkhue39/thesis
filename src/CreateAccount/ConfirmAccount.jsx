import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePassword.css';
import Grid from './Grid';

const ConfirmAccount = () => {
  return (
    <div>
        <h1>Confirm Account Page</h1>

        <div className='create-account-wrapper'>

            <div className="circle-container">
                <div className="circle-item">
                <div className="circle blue-border">1</div>
                <div className="description">Create password</div>
                </div>
                
                <div className="circle-item">
                <div className="circle blue-border">2</div>
                <div className="description">Secure Account</div>
                </div>
                <div className="circle-item">
                <div className="circle blue-border">3</div>
                <div className="description">Confirm secure chain</div>
                </div>
            </div>

            <h2>Confirm Secret Recovery Phrase</h2>
            <Grid /> {/* Render Grid component here */}
            <button>Next</button>
        </div>
    </div>
  );
};

export default ConfirmAccount;
