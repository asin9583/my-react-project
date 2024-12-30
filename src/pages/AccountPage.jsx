import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AccountPage.css";

function AccountPage() {
  return (
    <div className="account-container">
      {/* 側邊欄 */}
      <div className="sidebar">
        <h3>我的帳戶</h3>
        <ul>
          <li>
            <Link to="/account/profile">修改資料</Link>
          </li>
          <li>
            <Link to="/account/password">修改密碼</Link>
          </li>
        </ul>
      </div>

      {/* 主要內容 */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountPage;
