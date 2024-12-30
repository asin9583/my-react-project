import React, { useState, useEffect } from "react";
import "./Profile.css";
import { getUserProfile, updateUserProfile } from "../services/userService";

function Profile() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 獲取用戶資料
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(); // 假設有一個API調用來獲取用戶資料
        setFormData(data);
      } catch (error) {
        console.error("獲取用戶資料失敗:", error);
        alert("無法載入用戶資料，請稍後再試。");
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateUserProfile(formData); // 假設有一個API調用來更新用戶資料
      alert("資料更新成功！");
      console.log("更新成功:", response);
    } catch (error) {
      console.error("資料更新失敗:", error);
      alert("更新失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>修改資料</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>帳號名稱</label>
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
          <label>電子郵件地址</label>
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
          <label>手機號碼</label>
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
          {isSubmitting ? "儲存中..." : "儲存變更"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
