import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

import "./CreatePassword.css";
import "./Grid.css";
import "../components/Button.css";
import "../components/Step.css";

const ImportAccountMnemonic = () => {
  const navigate = useNavigate();
  const [inputMnemonic, setInputMnemonic] = useState(Array(12).fill(""));

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pastedWords = pasteData.split(" ").slice(0, 12);
    const newInputMnemonic = Array(12).fill("");
    pastedWords.forEach((word, index) => {
      newInputMnemonic[index] = word;
    });
    setInputMnemonic(newInputMnemonic);
  };

  const handleInputChange = (index, value) => {
    const newInputMnemonic = [...inputMnemonic];
    newInputMnemonic[index] = value.trim();
    setInputMnemonic(newInputMnemonic);
  };

  const handleNextClick = () => {
    console.log("Input Mnemonic:", inputMnemonic);
    navigate("/import-account-password", {
      state: { mnemonic: inputMnemonic },
    });
  };

  return (
    <div className="app-content-wrapper">
      <div className="app-content">
        <Header />
        <div className="app">
          <div className="onboarding-flow">
            <div className="onboarding-flow-wrapper">
              <div className="circle-container">
                <div className="circle-item">
                  <div className="circle blue-border">1</div>
                  <div className="description blue">Enter mnemonic phrase</div>
                </div>

                <div className="circle-item">
                  <div className="circle gray-border">2</div>
                  <div className="description">Enter passcode</div>
                </div>
              </div>
              <h2>Enter mnemmonic phrase</h2>
              <div className="container">
                <div className="grid-container">
                  {inputMnemonic.map((word, index) => (
                    <div key={index} className="grid-item">
                      <div className="grid-item-number">{index + 1}</div>
                      <input
                        className="grid-item-input"
                        type="text"
                        value={word}
                        onPaste={handlePaste}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="button-wrapper">
                <button
                  className="btn-primary medium"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportAccountMnemonic;
