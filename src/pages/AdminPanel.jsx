import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminPanel.css"; // 側邊欄樣式

function AdminPanel() {
  return (
    <div className="admin-container">
      {/* 側邊欄 */}
      <div className="sidebar">
        <h3>後台管理</h3>
        <ul>
          <li>
            <Link to="/admin/AccountManagement">帳號管理</Link>
          </li>
          <li>
            <Link to="/userpoduct">新增商品</Link>
          </li>
          <li>
            
          </li>
        </ul>
      </div>

      {/* 主要內容區域 */}
      <div className="content">
        <Outlet /> {/* 顯示子路由 */}
      </div>
    </div>
  );
}

export default AdminPanel;
