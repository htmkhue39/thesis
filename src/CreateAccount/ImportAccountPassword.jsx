import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './CreatePassword.css'
import '../components/Button.css'
import '../components/Step.css'

const ImportAccountPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Xử lý logic đăng nhập ở đây, ví dụ: kiểm tra mật khẩu và điều hướng
    if (password) {
      // Điều hướng tới trang khác sau khi nhập mật khẩu
      navigate('/homepage');
    } else {
      alert('Please enter a password.');
    }
  };

  return (
    <div className='app'>
      <div className='onboarding-flow'>
        <div className='onboarding-flow-wrapper'>
          <div className="circle-container">
              <div className="circle-item">
                <div className="circle blue-full">1</div>
                <div className="description">Enter mnemonic phrase</div>
              </div>
              
              <div className="circle-item">
                <div className="circle blue-border">2</div>
                <div className="description">Enter password</div>
              </div>
          </div>

          <h2>Enter password</h2>
          <p className="mnemonic-phrase-description">Please enter your password to import account.</p>

          <div className='form-wrapper'>
            <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={handlePasswordChange} 
                className="password-input"
            />
            <button className='btn-primary medium import' onClick={handleSubmit}>Import Account</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ImportAccountPassword;