import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { fetchFavorites, removeFavorite } from "../services/favoriteService";

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);

  // 獲取關注清單
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetchFavorites();
        if (response && response.data) {
          setFavorites(response.data);
        } else {
          console.error("回傳資料不完整:", response);
        }
      } catch (error) {
        console.error("無法加載關注清單:", error);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = async (productId) => {
    try {
      await removeFavorite(productId);
      setFavorites(favorites.filter((favorite) => favorite.id !== productId));
    } catch (error) {
      console.error("無法移除關注:", error);
    }
  };

  return (
    <div className="wishlist">
      <h1>關注清單</h1>
      {favorites.length > 0 ? (
        <div className="product-grid">
          {favorites.map((favorite) => (
            <div className="product-card" key={favorite.id}>
              <img
                src={favorite.imageBase64 || "placeholder-image-url.jpg"}
                alt={favorite.name || "商品圖片"}
                className="product-image"
              />
              <h3 className="product-name">{favorite.name || "未知商品名稱"}</h3>
              <p className="product-price">
                {favorite.price ? `$${favorite.price}` : "價格未提供"}
              </p>
              <div className="product-actions">
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="favorite-button unfollow"
                >
                  移除關注
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>您的關注清單是空的。</p>
      )}
    </div>
  );
};

export default Wishlist;
