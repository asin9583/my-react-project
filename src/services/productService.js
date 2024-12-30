// services/productService.js

const API_BASE_URL = "http://localhost:8080";

/**
 * 獲取產品列表
 * @returns {Promise<Object>} API 回應
 */
export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "GET",
    credentials: "include", // 包含 cookies/session
  });

  if (!response.ok) {
    throw new Error("無法取得產品資料");
  }

  return response.json();
};

