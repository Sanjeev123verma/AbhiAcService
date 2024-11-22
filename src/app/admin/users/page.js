// // src/app/admin/dashboard.js
// "use client";
// import AdminLayout from '@/app/admin/AdminLayout';
// import { useState, useEffect } from 'react';
// import { format } from 'date-fns'; // You can use this library for date formatting

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch('/api/users');
//         if (!res.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await res.json();
//         setUsers(data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const formatDate = (date) => format(new Date(date), 'd-MMM-yyyy');
//   const formatTime = (date) => format(new Date(date), 'h:mm a');

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
    
//     <AdminLayout>
//       <div className="text-center justify-center px-4 py-8">
//       <h1 className="text-2xl font-bold mb-20">Users List</h1>
//       <table className=" lg:ml-64 border-collapse">
//         <thead>
//           <tr>
//           <th className="border-4 p-2">Sr.No</th> {/* Add Sr.No header */}
//             <th className="border-4 p-2">Name</th>
//             <th className="border-4 p-2">Phone</th>
//             <th className="border-4 p-2">Address</th>
//             <th className="border-4 p-2">Service</th>
//             <th className="border-4 p-2">Message</th>
//             <th className="border-4 p-2">Registered At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//                <td className="border p-2">{index + 1}</td> {/* Display Sr.No */}
//               <td className="border p-2">{user.name}</td>
//               <td className="border p-2">{user.phone}</td>
//               <td className="border p-2">{user.address}</td>
//               <td className="border p-2">{user.service}</td>
//               <td className="border p-2">{user.message}</td>
//               <td className="border p-2">{user.createdAt ? (
//                 <>
//                 {formatDate(user.createdAt)}
//                 <br />
//                 {formatTime(user.createdAt)} 
//                 </>
//               ) : 'N/A'}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </AdminLayout>  
//   );
// };
// export default UsersPage;


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
  const [limit, setLimit] = useState(10);
  const searchTimeout = useRef(null);

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
      alert(error.message);
    }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      
      <div className="text-center justify-center px-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div className="text-2xl font-abc text-purple-400 mb-8">
          <p>
            <strong>Total Users:</strong> {totalUsers} {/* Display total users dynamically */}
          </p>
      </div>
         {/* Search Input */}
        <div className="flex justify-center mb-4 ">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            className="border-2 p-2 rounded w-1/3"
          />
        </div>

        {/* Users Table */}
        <table className="border-collapse lg:ml-64">
          <thead>
            <tr>
              <th className="border-4 p-2">Sr.No</th>
              <th
                className="border-4 p-2 cursor-pointer text-xl font-abc text-blue-500"
                onClick={() => {
                  setSortField("name");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="border-4 p-2 text-xl font-abc text-blue-500">Phone</th>
              <th className="border-4 p-2">Address</th>
              <th className="border-4 p-2">Service</th>
              <th className="border-4 p-2">Message</th>
              <th
                className="border-4 px-4 font-abc text-xl text-green-500 cursor-pointer"
                onClick={() => {
                  setSortField("createdAt");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Registered At{" "}
                {sortField === "createdAt" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
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
                      {formatDate(user.createdAt)}
                      <br />
                      {formatTime(user.createdAt)}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;

