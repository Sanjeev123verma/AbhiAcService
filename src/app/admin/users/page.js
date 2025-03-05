"use client";
import AdminLayout from "@/app/admin/AdminLayout";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns"; // Library for date formatting
import { RiDeleteBin6Fill } from "react-icons/ri";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const searchTimeout = useRef(null);

  const limit = 10;  // Fixed number of users per page

  // Fetch users from the backend
  const fetchUsers = async (searchQuery = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/users?page=${currentPage}&limit=${limit}&sort=${sortField}&order=${sortOrder}&search=${searchQuery}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      setUsers(data.users);
      setTotalUsers(data.total);
      setTotalPages(Math.ceil(data.total / limit)); // Calculate total pages based on the response
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle search input with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      setCurrentPage(1); // Reset to the first page for new searches
      fetchUsers(value);
    }, 1200); // Debounce delay
  };

  // Handle deleting a user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users?id=${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      // Refetch users after successful deletion
      fetchUsers(search);
    } catch (error) {
      // alert(error.message);
    }
  };

  // Open delete modal
  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Confirm delete action
  const handleDeleteConfirm = async () => {
    await handleDelete(userToDelete);
    setIsDeleteModalOpen(false);
  };

  // Fetch users on component mount or when dependencies change
  useEffect(() => {
    fetchUsers(search);
  }, [currentPage, sortField, sortOrder, limit]);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const formatDate = (date) => format(new Date(date), "d-MMM-yyyy");
  const formatTime = (date) => format(new Date(date), "h:mm a");

  if (loading) return <div className="flex justify-center items-center mt-20"><div className="spinner-border animate-spin text-blue-500 w-16 h-16 border-4 rounded-full" /></div>;
  if (error) return <div className="flex justify-center items-center mt-20"><div className="bg-red-500 text-white p-4 rounded-md"><p>{error}</p><button onClick={() => fetchUsers(search)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Retry</button></div></div>;

  return (
    <AdminLayout>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to delete this user?</h2>
            <div className="flex justify-end gap-4">
              <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center justify-center px-4 overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <div className="text-2xl font-abc text-purple-400 mb-8">
          <p><strong>Total Users:</strong> {totalUsers}</p>
        </div>

        {/* Search Input */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            className="border-2 p-2 rounded w-1/3"
          />
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="border-collapse lg:ml-64">
            <thead>
              <tr>
                <th className="border-4 p-2">Sr.No</th>
                <th className="border-4 p-2 cursor-pointer text-xl font-abc text-blue-500" onClick={() => { setSortField("name"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
                  Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="border-4 p-2 text-xl font-abc text-blue-500">Phone</th>
                <th className="border-4 p-2">Address</th>
                <th className="border-4 p-2">Service</th>
                <th className="border-4 p-2">Message</th>
                <th className="border-4 px-4 font-abc text-xl text-green-500 cursor-pointer" onClick={() => { setSortField("createdAt"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
                  Registered At {sortField === "createdAt" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="border-4 p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td className="border p-2">{index + 1 + (currentPage - 1) * limit}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.phone}</td>
                  <td className="border p-2">{user.address}</td>
                  <td className="border p-2">{user.service}</td>
                  <td className="border p-2">{user.message}</td>
                  <td className="border p-2">
                    {user.createdAt ? (
                      <>
                        {formatDate(user.createdAt)}<br />
                        {formatTime(user.createdAt)}
                      </>
                    ) : "N/A"}
                  </td>
                  <td className="border p-2">
                    <button onClick={() => openDeleteModal(user._id)} className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600">
                      <RiDeleteBin6Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50">
            Previous
          </button>
          <span className="px-4 py-1">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
