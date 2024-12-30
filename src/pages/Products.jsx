import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Products.css";
import { fetchProducts } from "../services/productService";
import { addFavorite, removeFavorite, fetchFavorites } from "../services/favoriteService";

const Products = ({ addToCart, isLoggedIn }) => {
  const [products, setProducts] = useState([]); // 全部商品
  const [filteredProducts, setFilteredProducts] = useState([]); // 篩選後的商品
  const location = useLocation(); // 用於取得搜尋參數
  const [favorites, setFavorites] = useState(new Set()); // 用 Set 儲存關注的商品 ID
  // 從後端獲取商品列表
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products"); // 修改為您的 API 端點
        const data = await response.json();
        if (data.status === 200 && Array.isArray(data.data)) {
          setProducts(data.data); // 提取 data 屬性中的商品列表
          setFilteredProducts(data.data); // 預設顯示所有商品
        } else {
          console.error("API 返回的資料格式不正確:", data);
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, []);
  // 使用 useEffect 從 REST API 獲取商品資料
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiResponse = await fetchProducts(); // 使用查詢所有商品服務方法
        setProducts(apiResponse.data);
        // 使用者的關注清單
        if (isLoggedIn) {
          const favoritesResponse = await fetchFavorites(); // 查詢使用者的關注清單
          const favoriteIds = new Set(favoritesResponse.data.map((fav) => fav.id));
          setFavorites(favoriteIds);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);
  // 根據搜尋參數篩選商品
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      const keywords = searchQuery.toLowerCase().split(" "); // 將搜尋條件拆分為關鍵字
      const filtered = products.filter((product) => {
        const name = product.name.toLowerCase();
        return keywords.some((keyword) => name.includes(keyword)); // 只要商品名稱包含任一關鍵字
      });
      setFilteredProducts(filtered); // 更新篩選後的商品
    } else {
      setFilteredProducts(products); // 無搜尋條件時恢復所有商品
    }
  }, [location.search, products]);
  const handleFavoriteToggle = async (productId) => {
    try {
      if (favorites.has(productId)) {
        await removeFavorite(productId); // 執行移除關注
        const updatedFavorites = new Set(favorites);
        updatedFavorites.delete(productId);
        setFavorites(updatedFavorites);
      } else {
        await addFavorite(productId); // 執行關注
        const updatedFavorites = new Set(favorites);
        updatedFavorites.add(productId);
        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  return (
    <div className="product-list">
      <h1>商品列表</h1>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.imageBase64}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              {isLoggedIn && (
                <div className="product-actions">
                 
                  <button
                    className={`favorite-button ${favorites.has(product.id) ? "unfollow" : "follow"}`}
                    onClick={() => handleFavoriteToggle(product.id)}
                  >
                    {favorites.has(product.id) ? "移除關注" : "加入關注"}
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="add-to-cart-button"
                  >
                    加入購物車
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>沒有符合的商品...</p>
      )}
    </div>
  );
};

export default Products;
