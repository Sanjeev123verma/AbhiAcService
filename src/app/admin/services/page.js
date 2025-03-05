"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/admin/AdminLayout";

export default function ServicesPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal for "Mark as Completed"
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  // Modal for "Delete"
  const [deleteUser, setDeleteUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // -------------------- Fetch Users -------------------- //
  const fetchUsers = async (currentPage = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Example: /api/contact?page=${currentPage}&limit=10
      // Adjust if your API needs different query params
      const response = await fetch(`/api/contact?page=${currentPage}&limit=10`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      console.log("API Response:", data);

      // If your API returns { users, total }, do this:
      const allUsers = data.contacts || [];
      // If your API returns { contacts, total }, do:
      // const allUsers = data.contacts || [];

      setUsers(allUsers);
      const totalCount = data.total || 0; // total number of docs
      const limit = 10; // same limit you used in the query
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(err.message || "Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- useEffect -------------------- //
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // -------------------- Mark as Completed -------------------- //
  const openCompleteModal = (user) => {
    setSelectedUser(user);
    setIsCompleteModalOpen(true);
  };

  const closeCompleteModal = () => {
    setSelectedUser(null);
    setIsCompleteModalOpen(false);
  };

  const updateServiceStatus = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedUser._id,
          status: "success",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const { user: updatedUser } = await response.json();
      console.log("Updated user:", updatedUser);

      // Update local state: set status to "success" & completedAt to updatedUser.completedAt
      setUsers((prev) =>
        prev.map((u) =>
          u._id === updatedUser._id
            ? {
                ...u,
                status: "success",
                completedAt: updatedUser.completedAt || new Date().toISOString(),
              }
            : u
        )
      );

      closeCompleteModal();
      // No need to reset page or re-fetch if we just update local state
    } catch (err) {
      console.error("Error updating service status:", err);
    }
  };

  // -------------------- Delete User -------------------- //
  const openDeleteModal = (user) => {
    setDeleteUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteUser) return;

    try {
      const response = await fetch(`/api/contact?id=${deleteUser._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove from local state
      setUsers((prev) => prev.filter((u) => u._id !== deleteUser._id));

      closeDeleteModal();
      // Optionally re-fetch if you want updated pagination
      // fetchUsers(page);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // -------------------- Rendering -------------------- //
  if (loading) return <p>Loading services...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center ml-72 p-4">
        <h1 className="text-2xl font-bold justify-center mb-8">Services</h1>

        <table className="border-collapse w-[80%]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center">Sr. No.</th>
              <th className="border p-2 text-center">Name</th>
              <th className="border p-2 text-center">Phone</th>
              <th className="border p-2 text-center">Service</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-center">Completed At</th>
              <th className="border p-2 text-center">Actions</th>
              <th className="border p-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const srNo = (page - 1) * 10 + index + 1;
              return (
                <tr key={user._id}>
                  <td className="border p-4 text-center">{srNo}</td>
                  <td className="border p-4 text-center">{user.name}</td>
                  <td className="border p-4 text-center">{user.phone}</td>
                  <td className="border p-4 text-center">{user.service}</td>
                  <td className="border p-4 text-center">
                    <span
                      className={`p-2 rounded ${
                        user.status === "Pending"
                          ? "bg-yellow-400 text-black"
                          : "bg-green-400 text-white"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="border p-4 text-center">
                    {user.completedAt
                      ? new Date(user.completedAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="border p-4 text-center space-x-2">
                    {/* Mark as Completed */}
                    {user.status === "Pending" && (
                      <button
                        onClick={() => openCompleteModal(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}
                  </td>
                  <td className="border p-4 text-center space-x-2">
                     {/* Delete */}
                     <button
                      onClick={() => openDeleteModal(user)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex mt-4 justify-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded mr-2 ${
              page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ml-2 ${
              page === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>

        {/* Mark as Completed Modal */}
        {isCompleteModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4 text-center">
                Mark {selectedUser.name} service as completed?
              </h2>
              <div className="flex justify-center text-center">
                <button
                  onClick={updateServiceStatus}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Yes, Complete
                </button>
                <button
                  onClick={closeCompleteModal}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && deleteUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4 text-center">
                Are you sure you want to delete {deleteUser.name}?
              </h2>
              <div className="flex justify-center text-center">
                <button
                  onClick={handleDelete}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
