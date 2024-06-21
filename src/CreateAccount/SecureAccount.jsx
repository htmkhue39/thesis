import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePassword.css';
import './SecureAccount.css';
import Grid from './Grid';
import '../components/Button.css'
import '../components/Step.css'

const generateMnemonic = () => [
    "brush", "swing", "cram", "width", "spoon", "visual",
    "typical", "recipe", "obvious", "damp", "smart", "depend"
  ];

const SecureAccount = () => {
    const navigate = useNavigate();
    const gridRef = useRef(null);
    const [mnemonic, setMnemonic] = useState([]);

    useEffect(() => {
      const fetchMnemonic = async () => {
        try {
          const response = await fetch('http://localhost:3001/mnemonics/1');
          const data = await response.json();
          setMnemonic(data.phrase);
        } catch (error) {
          console.error('Error fetching mnemonic:', error);
        }
      };

      fetchMnemonic();
    }, []);

    const handleNextClick = () => {
        console.log("Mnemonic:", mnemonic);
        navigate("/create-account/confirm-account", { state: { mnemonic } });
    };

    const handleCopyClick = () => {
        if (gridRef.current) {
          const textToCopy = Array.from(gridRef.current.querySelectorAll('.grid-item-word'))
            .map(item => item.innerText)
            .join(' ');
          navigator.clipboard.writeText(textToCopy)
            .then(() => alert('Copied to clipboard!'))
            .catch((err) => console.error('Failed to copy:', err));
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
                      <div className="circle blue-border">2</div>
                      <div className="description blue">Secure Account</div>
                    </div>
                    <div className="circle-item">
                      <div className="circle gray-border">3</div>
                      <div className="description">Confirm secure chain</div>
                    </div>
                </div>

                <h1>Write down your Mnemonic Phrase</h1>

                <p className="mnemonic-phrase-description">Write down this 12-word Mnemonic Phrase and save it in a place that you trust and only you can access.</p>
                
                <Grid mnemonic={mnemonic} ref={gridRef} />

                <div className='button-wrapper'>
                  <button className='btn-primary medium' onClick={handleCopyClick}>Copy Mnemonic Phrase</button>
                  <button className='btn-primary medium' onClick={handleNextClick}>Next</button>
                </div>
            </div>
        </div>
      </div>
    );
};

export default SecureAccount;
