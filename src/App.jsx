import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgot Password";
import Footer from "./components/Footer";
import AccountPage from "./pages/AccountPage"; // 新增帳戶主頁面
import Profile from "./pages/Profile"; // 新增修改資料頁面
import Password from "./pages/Password"; // 新增修改密碼頁面
import Userpoduct from "./pages/userpoduct";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import AdminPanel from "./pages/AdminPanel";
import AccountManagement from "./pages/AccountManagement";
import { checkLoginStatus, login, logout } from "./services/authService";
import "./App.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserData, setdLoginUserData] = useState({});

  console.log(loginUserData);

  useEffect(() => {
    const initializeLoginStatus = async () => {
      try {
        const apiResponse = await checkLoginStatus();
        setIsLoggedIn(apiResponse.data.isLoggedIn);
        setdLoginUserData(apiResponse.data);
        console.log(apiResponse.data.isLoggedIn)
      } catch (error) {
        console.error("無法檢查登入狀態:", error);
      }
    };

    initializeLoginStatus();
  }, []);

  const addToCart = (product) => {
    const item = {
      product: product,
      quantity: 1,
    }
    console.log(item);
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      if (data.message === "登入成功") {
        setIsLoggedIn(true);
        alert("登入成功");
        window.location.href = "/";
      } else {
        alert("登入失敗，請檢查您的帳號或密碼。");
      }
    } catch (error) {
      console.error("登入失敗:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      alert("登出成功");
      window.location.href = "/";
    } catch (error) {
      console.error("登出錯誤:", error);
    }
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<Signin onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userpoduct" element={<Userpoduct  isLoggedIn={isLoggedIn}/>} />
          <Route path="/products" element={<Products addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        <Route
            path="/orders"
            element={isLoggedIn ? <Checkout /> : <p>請先登入以進行結帳。</p>}
          />
           <Route
          path="/wishlist"
          element={<Wishlist  isLoggedIn={isLoggedIn}/>}
        />
          <Route path="/account" element={<AccountPage />}>
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<Password />} />
            
          </Route>
          {/* 後台管理 */}
          <Route path="/admin" element={<AdminPanel />}>
            <Route path="AccountManagement" element={<AccountManagement />} />
            <Route path="products" element={<div>商品管理內容</div>} />
            <Route path="orders" element={<div>訂單管理內容</div>} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
