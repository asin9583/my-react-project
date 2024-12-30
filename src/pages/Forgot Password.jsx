import React, { useState } from 'react';
import './Forgot Password.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('輸入的內容:', email);
    alert('已提交: ' + email);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box"></div>
      <h2 className="title">忘記密碼</h2>
      <p className="subtitle">請輸入電子郵件地址</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={email}
            onChange={handleInputChange}
            placeholder="電子郵件地址"
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          繼續
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
