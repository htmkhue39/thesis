import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './CreatePassword.css';
import './Grid.css';
import './OnboardingPage.css';
import '../components/Button.css'
import '../components/Step.css'

const ConfirmAccount = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { mnemonic } = location.state || [];
  const [inputMnemonic, setInputMnemonic] = useState(Array(12).fill(''));

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const pastedWords = pasteData.split(' ').slice(0, 12);
    setInputMnemonic(pastedWords);
  };

  const handleInputChange = (index, value) => {
    const newInputMnemonic = [...inputMnemonic];
    newInputMnemonic[index] = value.trim();
    setInputMnemonic(newInputMnemonic);
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const handleNextClick = () => {
    console.log("Input Mnemonic:", inputMnemonic);
    console.log("Provided Mnemonic:", mnemonic);
    if (arraysEqual(inputMnemonic, mnemonic)) {
        alert('Mnemonic phrase matches!');
        navigate('/homepage'); 
    } else {
        alert('Mnemonic phrase does not match. Please try again.');
    }
  };

  return (
    <div className='app'>
        <div className='onboarding-flow'>
          <div className='onboarding-flow-wrapper'>
            <div className="circle-container">
                <div className="circle-item">
                  <div className="circle blue-full">1</div>
                  <div className="description">Create password</div>
                </div>

                <div className="circle-item">
                  <div className="circle blue-full">2</div>
                  <div className="description">Secure Account</div>
                </div>
                <div className="circle-item">
                  <div className="circle blue-border">3</div>
                  <div className="description">Confirm secure chain</div>
                </div>
            </div>

            <h2>Confirm Secret Recovery Phrase</h2>

            <div className="grid-container">
                {inputMnemonic.map((word, index) => (
                    <div key={index} className="grid-item">
                        <div className="grid-item-number">{index + 1}</div>
                        <input 
                            className="grid-item-input" 
                            type="text" 
                            value={word} 
                            onPaste={handlePaste}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    </div>
              ))}
            </div>
            <div className='button-wrapper'>
              <button className='btn-primary medium' onClick={handleNextClick}>Next</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ConfirmAccount;