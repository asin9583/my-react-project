import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 是否已登入
  const [menuVisible, setMenuVisible] = useState(false); // 下拉選單顯示狀態
  const [userEmail, setUserEmail] = useState(""); // 儲存使用者 Email
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋關鍵字
  const navigate = useNavigate();

  // 檢查登入狀態
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/isLoggedIn", {
          method: "GET",
          credentials: "include", // 攜帶 Cookie
        });
        const result = await response.json();
        if (result.data.isLoggedIn) {
          setIsLoggedIn(true);
          setUserEmail(result.data.email || ""); // 設置 Email
        }
      } catch (error) {
        console.error("檢查登入狀態失敗:", error);
      }
    };
    checkLoginStatus();
  }, []);

  // 登出功能
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      setIsLoggedIn(false);
      setUserEmail("");
      window.location.href = "/";
    } catch (error) {
      console.error("登出失敗:", error);
    }
  };

  // 搜尋功能
  const handleSearch = (event) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  const closeMenu = () => setMenuVisible(false);

  return (
    <div className="navbar">
      {/* Logo and Home Button */}
      <Link to="/" className="logo">
        <img src="/img/f.png" alt="Logo" />
        <span>FANTASY</span>
      </Link>

      {/* Search Bar */}
      <div className="search">
        <input
          type="text"
          placeholder=""
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Actions */}
      <div className="actions">
        {isLoggedIn ? (
          <>
            {/* 新增的後台管理按鈕 */}
            <Link to="/admin" className="admin-button">
              後台管理
            </Link>
            <div
              className="account"
              onMouseEnter={toggleMenu}
              onMouseLeave={closeMenu}
            >
              <button className="account-button">我的帳戶</button>
              {menuVisible && (
                <div className="dropdown-menu">
                  <p className="user-email">{userEmail}</p>
                  <Link to="/account/profile" className="dropdown-item">
                    <span className="icon">👤</span> 帳戶信息
                  </Link>
                  
                  <Link to="/orders" className="dropdown-item">
                    <span className="icon">🛒</span> 歷史訂單
                  </Link>
                  <Link to="/wishlist" className="dropdown-item">
                    <span className="icon">❤️</span> 願望清單
                  </Link>

                  <a href="#" onClick={handleLogout} className="dropdown-item">
                    <span className="icon">🚪</span> 登出
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/Signin" className="sign-in-button">
            登入/註冊
          </Link>
        )}
        <Link to="/products" className="icon shadow">
          商品列表
        </Link>

        <Link to="/cart" className="cart shadow">
          <span className="icon">購物車&#x1F6D2;</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
