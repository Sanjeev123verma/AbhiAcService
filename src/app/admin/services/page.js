"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/admin/AdminLayout";

export default function ServicesPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async (currentPage = 1) => {
    setLoading(true);
    setError(null);

    try {
      let pendingUsers = [];
      let nonPendingUsers = [];

      if (currentPage === 1) {
        // Fetch all pending users (no pagination for pending users)
        const pendingResponse = await fetch(`/api/users?status=Pending`);
        if (!pendingResponse.ok) {
          throw new Error("Failed to fetch pending users");
        }
        const pendingData = await pendingResponse.json();
        pendingUsers = pendingData.users; // Store pending users
      }

      const response = await fetch(`/api/users?page=${currentPage}&limit=10`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      nonPendingUsers = data.users.filter((user) => user.status !== "Pending");

      // Combine pending users first, followed by non-pending users
      const sortedUsers =
        currentPage === 1
          ? [...pendingUsers, ...nonPendingUsers]
          : nonPendingUsers;

      setUsers(sortedUsers);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (err) {
      setError(err.message || "Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);



  const updateServiceStatus = async () => {
    if (!selectedUser) return;

    try {
        const response = await fetch("/api/users", {
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

       // Update the user's status and completedAt field in the local state
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user ) // Update the specific user   
    );

      closeModal();
      setPage(1); // Reset to the first page to show updated data
      fetchUsers(1);
    } catch (err) {
      console.error(err.message);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading services...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center ml-72 p-4">
        <h1 className="text-2xl font-bold justify-center mb-8">Services</h1>

        <table className="border-collapse w-[80%]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center">Sr. No.</th>{" "}
              {/* New Sr. No. Column */}
              <th className="border p-2 text-center">Name</th>
              <th className="border p-2 text-center">Phone</th>
              <th className="border p-2 text-center">Service</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-center">Completed At</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="border p-4 text-center">
                  {" "}
                  {(page - 1) * 10 + index + 1} {/* Sr. No. Calculation */}
                </td>
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
                <td className="border p-4 text-center">
                  {user.status === "Pending" && (
                    <button
                      onClick={() => openModal(user)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {user.status === "success" && (
                    <span className="text-green-600 text-lg font-bold">✔</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4 text-center">
                Are you sure you want to mark this Service as completed?
              </h2>
              <div className="flex justify-center text-center">
                <button
                  onClick={updateServiceStatus}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Service Done.
                </button>
                <button
                  onClick={closeModal}
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
