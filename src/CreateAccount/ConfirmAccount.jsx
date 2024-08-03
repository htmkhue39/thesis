import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "../AccountContext";
import Header from "../components/Header";
import "./CreatePassword.css";
import "./Grid.css";
import "./OnboardingPage.css";
import "../components/Button.css";
import "../components/Step.css";

const ConfirmAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mnemonic } = location.state || [];
  const { setSelectedAccount, createAccount } = useAccount();
  const [inputMnemonic, setInputMnemonic] = useState(Array(12).fill(""));

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pastedWords = pasteData.split(" ").slice(0, 12);
    setInputMnemonic(pastedWords);
  };

  const handleInputChange = (index, value) => {
    const newInputMnemonic = [...inputMnemonic];
    newInputMnemonic[index] = value.trim();
    setInputMnemonic(newInputMnemonic);
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  };

  const handleNextClick = async () => {
    if (arraysEqual(inputMnemonic, mnemonic)) {
      alert("Mnemonic phrase matches!");
      const password = localStorage.getItem("newPassword");
      const newAccount = {
        password,
        mnemonic,
      };

      try {
        const createdAccount = await createAccount(newAccount);
        console.log("createdAccount: ", createdAccount);
        setSelectedAccount(createdAccount);
        alert("Account created successfully!");
        navigate("/swap");
      } catch (error) {
        console.error("Error creating account:", error);
      }
    } else {
      alert("Mnemonic phrase does not match. Please try again.");
    }
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
                  <div className="circle blue-full">1</div>
                  <div className="description blue">Create passcode</div>
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

export default ConfirmAccount;
