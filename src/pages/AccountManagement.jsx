import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../services/userManagementService";
import "./AccountManagement.css";

const UserManagementPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [formData, setFormData] = useState({});

  // Load user accounts on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setAccounts(users);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };
    loadUsers();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Start editing a user
  const handleEdit = (account) => {
    setEditingAccountId(account.id);
    setFormData(account);
  };

  // Save user updates
  const handleSave = async (id) => {
    try {
      await updateUser(id, formData);
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === id ? { ...acc, ...formData } : acc))
      );
      setEditingAccountId(null);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="account-management">
      <h1>用戶管理</h1>
      <table className="account-table">
        <thead>
          <tr>
            <th>帳號名稱</th>
            <th>電子郵件</th>
            <th>權限</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>
                {editingAccountId === account.id ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.userName || ""}
                    onChange={handleChange}
                  />
                ) : (
                  account.userName
                )}
              </td>
              <td>
                {editingAccountId === account.id ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                ) : (
                  account.email
                )}
              </td>
              <td>
                {editingAccountId === account.id ? (
                  <select
                    name="role"
                    value={formData.role || ""}
                    onChange={handleChange}
                  >
                    <option value="MEMBER">MEMBER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                ) : (
                  account.role
                )}
              </td>
              <td>
                {editingAccountId === account.id ? (
                  <>
                    <button onClick={() => handleSave(account.id)}>保存</button>
                    <button onClick={() => setEditingAccountId(null)}>取消</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(account)}>編輯</button>
                    <button onClick={() => handleDelete(account.id)}>刪除</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
