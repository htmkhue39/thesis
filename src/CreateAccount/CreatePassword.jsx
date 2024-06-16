import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePassword.css'

const CreatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic để xử lý form submission, ví dụ: kiểm tra mật khẩu
    if (newPassword.length < 8){
      alert('New Password must be at least 8 characters long.');
      return;
    }

    if (newPassword === confirmPassword) {
      alert('Passwords match and meet the requirements!');
    } 
    else {
      alert('Passwords do not match!');
      return;
    }

    navigate("/create-account/secure-account");
  };

  return (
    <div>
      <h1>Create Account Page</h1>

      <div className='create-account-wrapper'>

        <div className="circle-container">
          <div className="circle-item">
            <div className="circle blue-border">1</div>
            <div className="description">Create password</div>
          </div>
          
          <div className="circle-item">
            <div className="circle gray-border">2</div>
            <div className="description">Secure Account</div>
          </div>
          <div className="circle-item">
            <div className="circle gray-border">3</div>
            <div className="description">Confirm secure chain</div>
          </div>
        </div>

        <form className="password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Create a new account</button>
      </form>
      </div>
    </div>

  );
}

export default CreatePassword;