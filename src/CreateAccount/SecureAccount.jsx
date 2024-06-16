import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePassword.css';
import Grid from './Grid';

const SecureAccount = () => {
    const navigate = useNavigate();

    const handleNextClick = () => {
        navigate("/create-account/confirm-account"); // Điều hướng đến "/create-account/confirm-account"
    };

    return (
        <div>
            <h1>Secure Account Page</h1>

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
                    <div className="circle gray-border">3</div>
                    <div className="description">Confirm secure chain</div>
                    </div>
                </div>

                <h2>Your mnemmonic phrase</h2>
                <p className="mnemonic-phrase-description">Write down this 12-word Secret Recovery Phrase and save it in a place that you trust and only you can access.</p>
                <Grid /> {/* Render Grid component here */}
                <button onClick={handleNextClick}>Next</button>
            </div>
        </div>
    );
};

export default SecureAccount;
