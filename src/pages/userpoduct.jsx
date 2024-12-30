import React, { useState,useEffect } from "react";
import "./userpoduct.css";
import { addProduct } from "../services/userpoductService";


function Products({  isLoggedIn }) {
  
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImageBase64, setNewProductImageBase64] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newProductType, setNewProductType] = useState("");
  

  

  // 新增商品處理函式
  const handleAddProduct = async () => {
    const newProduct = {
      name: newProductName,
      price: parseFloat(newProductPrice),
      quantity: parseInt(newProductQuantity, 10),
      type: newProductType,
      imageBase64: newProductImageBase64,
    };

    try {
      const savedProduct = await addProduct(newProduct); // 呼叫服務新增商品
      setProducts([...products, savedProduct.data]); // 更新商品列表
      setNewProductName(""); // 清空表單輸入
      setNewProductPrice("");
      setNewProductQuantity("");
      setNewProductType("");
      setNewProductImageBase64("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // 圖片上傳處理
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductImageBase64(reader.result);
      };
      reader.readAsDataURL(file); // 讀取檔案並轉為 Base64 格式
    }
  };

  return (
    <div className="add-product-form">
      
      <h2>新增商品</h2>
      <input
        type="text"
        placeholder="商品名稱"
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="價格"
        value={newProductPrice}
        onChange={(e) => setNewProductPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="數量"
        value={newProductQuantity}
        onChange={(e) => setNewProductQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="類型"
        value={newProductType}
        onChange={(e) => setNewProductType(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {newProductImageBase64 && (
        <img
          src={newProductImageBase64}
          alt="預覽圖片"
          style={{ width: "100px", height: "100px", marginTop: "10px" }}
        />
      )}
      
      {isLoggedIn && (
        <button onClick={handleAddProduct}>新增商品</button>
      )}
    </div>
  );
}

export default Products;
