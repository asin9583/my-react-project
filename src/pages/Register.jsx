import React, { useState } from "react";
import "./Register.css";
import { registerUser } from "../services/registerService";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    role: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatDate = (date) => date.replace(/\//g, "-");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedData = {
        ...formData,
        birthDate: formatDate(formData.birthDate), // 格式化日期
      };

      const response = await registerUser(formattedData);
      alert("註冊成功！");
      console.log("註冊成功:", response);
      // 成功後跳轉到登入頁面
      window.location.href = "/signin";
    } catch (error) {
      console.error("註冊失敗:", error);
      alert("註冊失敗，請檢查您的資料或稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1>FANTASY</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>帳號權限</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">帳號權限</option>
            <option value="MEMBER">會員</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="userName"
            placeholder="帳號名稱"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="電子郵件地址"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="密碼"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phone"
            placeholder="手機號碼"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>生日</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>性別</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">選擇性別</option>
            <option value="MALE">男性</option>
            <option value="FEMALE">女性</option>
            <option value="OTHER">其他</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "註冊中..." : "註冊"}
        </button>
      </form>
    </div>
  );
}

export default Register;
