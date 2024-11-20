// src/app/admin/dashboard.js
"use client";
import AdminLayout from '@/app/admin/AdminLayout';
import { useState, useEffect } from 'react';
import { format } from 'date-fns'; // You can use this library for date formatting

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (date) => format(new Date(date), 'd-MMM-yyyy');
  const formatTime = (date) => format(new Date(date), 'h:mm a');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <AdminLayout>
      <div className="text-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-20">Users List</h1>
      <table className=" lg:ml-64 border-collapse">
        <thead>
          <tr>
          <th className="border-4 p-2">Sr.No</th> {/* Add Sr.No header */}
            <th className="border-4 p-2">Name</th>
            <th className="border-4 p-2">Phone</th>
            <th className="border-4 p-2">Address</th>
            <th className="border-4 p-2">Service</th>
            <th className="border-4 p-2">Message</th>
            <th className="border-4 p-2">Registered At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
               <td className="border p-2">{index + 1}</td> {/* Display Sr.No */}
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.address}</td>
              <td className="border p-2">{user.service}</td>
              <td className="border p-2">{user.message}</td>
              <td className="border p-2">{user.createdAt ? (
                <>
                {formatDate(user.createdAt)}
                <br />
                {formatTime(user.createdAt)} 
                </>
              ) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>  
  );
};

export default UsersPage;