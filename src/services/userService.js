import axios from "axios";

// 獲取用戶資料
export const getUserProfile = async () => {
  const response = await axios.get("http://localhost:8080/auth/userProfile", {
    withCredentials: true,
  });
  return response.data.data; // 返回後端的 userDTO
};

// 更新用戶資料
export const updateUserProfile = async (formData) => {
  const response = await axios.put(
    "http://localhost:8080/auth/updateProfile",
    formData,
    { withCredentials: true }
  );
  return response.data;
};
