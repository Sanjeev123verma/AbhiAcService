"use client";
import AdminLayout from "@/app/admin/AdminLayout";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function UsersPage() {
  // -------------------- State -------------------- //
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0); // total matching search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Debounced Search
  const [searchTerm, setSearchTerm] = useState("");       // immediate user input
  const [debouncedSearch, setDebouncedSearch] = useState(""); // actual value used in API
  const searchTimeout = useRef(null);

  // Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // -------------------- Fetch Users -------------------- //
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query params
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: limit.toString(),
          sort: sortField,
          order: sortOrder,
          search: debouncedSearch,
        });

        console.log("Fetching users with:", queryParams.toString());
        const res = await fetch(`/api/contact?${queryParams}`);
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        console.log("API Response:", data);

        // Adjust field names based on your actual API response
        // For example, if you return { contacts: [...], total: 5, allTotal: 50 }
        setUsers(data.contacts || []);
        setTotalUsers(data.total || 0);

        setTotalPages(Math.ceil((data.total || 0) / limit));
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, sortField, sortOrder, debouncedSearch]);

  // -------------------- Debounced Search -------------------- //
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear any existing timer
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Start a new timer; only after 1.2s of no typing do we update `debouncedSearch`
    searchTimeout.current = setTimeout(() => {
      setCurrentPage(1);         // reset to first page
      setDebouncedSearch(value); // trigger the actual search
    }, 1200);
  };

  // -------------------- Delete User -------------------- //
  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      const res = await fetch(`/api/contact?id=${userToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setIsDeleteModalOpen(false);
      setUserToDelete(null);

      // Remove the deleted user from state
      setUsers((prev) => prev.filter((user) => user._id !== userToDelete));
      setTotalUsers((prev) => prev - 1); // Decrement the total count by 1
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.message);
    }
  };

  // -------------------- Pagination -------------------- //
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

  // -------------------- Format Date -------------------- //
  const formatDate = (date) => format(new Date(date), "d-MMM-yyyy");

  // -------------------- Render -------------------- //
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center mt-20">
          <div className="spinner-border animate-spin text-blue-500 w-16 h-16 border-4 rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center mt-20">
          <div className="bg-red-500 text-white p-4 rounded-md">
            <p>{error}</p>
            <button
              onClick={() => setCurrentPage(1)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center px-4 overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>

        {/* Show the total matching the search */}
        <p className="text-lg text-gray-600 mb-2">
          <strong>Total Users :</strong> {totalUsers}
        </p>

        {/* Search Input */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border-2 p-2 rounded w-1/3"
          />
        </div>

        {/* Users Table */}
        <div className="md:overflow-x-auto md:ml-64">
          <table className="border-collapse w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Sr. No.</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Service</th>
                <th className="border p-2">Message</th>
                <th className="border p-2">Registered At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                // Calculate Sr. No. based on pagination
                const srNo = index + 1 + (currentPage - 1) * limit;
                return (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="border p-2">{srNo}</td>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.phone}</td>
                    <td className="border p-2">{user.address}</td>
                    <td className="border p-2">{user.service}</td>
                    <td className="border p-2">{user.message}</td>
                    <td className="border p-2">{formatDate(user.createdAt)}</td>
                    <td className="border p-2">
                      <RiDeleteBin6Fill
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setUserToDelete(user._id);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
