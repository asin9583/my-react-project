const API_BASE_URL = "http://localhost:8080"; // 替換為您的後端 API 地址

/**
 * 註冊用戶
 * @param {Object} formData - 用戶註冊資料
 * @returns {Promise<Object>} - 註冊結果
 */
export const registerUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "註冊失敗");
  }

  return response.json();
};
