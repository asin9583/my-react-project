const API_BASE_URL = "http://localhost:8080";

/**
 * 新增產品
 * @param {Object} newProduct 新產品的資料
 * @returns {Promise<Object>} API 回應
 */
export const addProduct = async (newProduct) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
     // 包含 cookies/session
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error("新增商品失敗");
  }

  return response.json();
};
