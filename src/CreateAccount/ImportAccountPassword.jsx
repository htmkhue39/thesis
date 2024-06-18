import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './CreatePassword.css'

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
      navigate('/home');
    } else {
      alert('Please enter a password.');
    }
  };

  return (
    <div>
      <h1>Import Account Page</h1>

      <div className='create-account-wrapper'>
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

          <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={handlePasswordChange} 
                className="password-input"
            />
            <button className='import-button' onClick={handleSubmit}>Import Account</button>
      </div>
    </div>

  );
}

export default ImportAccountPassword;