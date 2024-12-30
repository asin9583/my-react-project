import React, { useState } from "react";

function Products({ isLoggedIn }) {
  const [message, setMessage] = useState("");

  const handleAddProduct = () => {
    setMessage("商品已成功新增！"); // 顯示成功訊息
    setTimeout(() => setMessage(""), 3000); // 3 秒後清除訊息
  };

  return (
    <div className="add-product-form">
      <h2>新增商品</h2>
      {isLoggedIn ? (
        <>
          <button onClick={handleAddProduct}>新增商品</button>
          {message && <p>{message}</p>} {/* 成功訊息 */}
        </>
      ) : (
        <p>請先登入以新增商品。</p>
      )}
    </div>
  );
}

export default Products;
