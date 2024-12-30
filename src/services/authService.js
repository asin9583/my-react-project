const API_BASE_URL = "http://localhost:8080";

/**
 * 檢查登入狀態
 * @returns {Promise<Object>} 包含登入狀態的 API 回應
 */
export const checkLoginStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/isLoggedIn`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("無法取得登入狀態");
    }
console.log(response);
    return await response.json();
  } catch (error) {
    console.error("檢查登入狀態時發生錯誤:", error);
    throw error;
  }
};

/**
 * 登入
 * @param {string} email 電子郵件地址
 * @param {string} password 密碼
 * @returns {Promise<Object>} 包含登入結果的 API 回應
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
      
      
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || "登入失敗");
    }

    return await response.json();
  } catch (error) {
    console.error("登入時發生錯誤:", error);
    throw error;
  }
};

/**
 * 登出
 * @returns {Promise<Object>} 包含登出結果的 API 回應
 */
export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
      
    });

    if (!response.ok) {
      throw new Error("登出失敗");
    }

    return await response.json();
  } catch (error) {
    console.error("登出時發生錯誤:", error);
    throw error;
  }
};
