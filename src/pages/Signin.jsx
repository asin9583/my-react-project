import React, { useState } from "react";
import "./Signin.css"; 

function Signin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(email, password); // 呼叫傳入的 onLogin 進行驗證
    } else {
      console.error("onLogin function is not provided.");
    }
  };

  return (
    <div className="Signin-container">
      <div className="Signin-box">
        <h1 className="logo">FANTASY</h1>
        <form className="Signin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="電子郵件地址"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="密碼"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="Signin-button">登入</button>
        </form>
        <div className="divider">或</div>
      
        <div className="register-section">
          沒有帳號嗎？ <a href="/register" className="register-link">註冊</a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
