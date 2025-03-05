"use client";
import AdminLayout from '@/app/admin/AdminLayout';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to fetch the total user count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('/api/contact');
        console.log('Fetched Data:', response.data); // Debugging

        if (response.status === 200) {
          setCount(response.data.contacts.length); // Ensure count is a valid number
        } else {
          console.error('Failed to fetch total customers:', response.data.message);
        }
      } catch (error) {
        console.error(
          'Error fetching total customers:',
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCount();
  }, []);

  return (
    <AdminLayout>
      <div className="relative min-h-screen flex">
        {/* Menu Icon for Mobile */}
        <button
          className="fixed top-4 left-4 z-50 text-gray-800 md:hidden bg-gray-200 rounded-full p-2 shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        {/* Sidebar Component */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-gray-800 text-white w-64 h-full p-4 transition-transform transform md:translate-x-0">
            <button
              className="absolute top-4 right-4 text-gray-200 text-3xl"
              onClick={() => setSidebarOpen(false)}
            >
              &times;
            </button>
            <nav className="mt-16">
              <Link href="/admin/dashboard">
                <div className="block py-2 px-4 text-xl font-semibold hover:bg-gray-700">
                  Dashboard
                </div>
              </Link>
              <Link href="/admin/customers">
                <div className="block py-2 px-4 hover:bg-gray-700">Customers</div>
              </Link>
              <Link href="/admin/services">
                <div className="block py-2 px-4 hover:bg-gray-700">Services</div>
              </Link>
              <Link href="/admin/registration">
                <div className="block py-2 px-4 hover:bg-gray-700">Registrations</div>
              </Link>
              <button className="block py-2 px-4 mt-4 bg-red-400 rounded-md text-center hover:bg-red-500">
                Logout
              </button>
            </nav>
          </div>
        )}

        {/* Main Dashboard Content */}
        <div className={`flex-1 ${sidebarOpen ? 'md:ml-64' : ''} p-6`}>
          <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

          <div className="flex flex-col flex-wrap gap-4 mt-10 justify-center items-center sm:flex-row">
            <Link href="/admin/customers">
              <div className="w-40 sm:w-64 h-32 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white flex flex-col items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
                <h2 className="text-4xl font-bold">{count}</h2>
                <p className="text-lg">Total Customers</p>
              </div>
            </Link>

            <Link href="/admin/services">
              <div className="w-40 sm:w-64 h-32 rounded-lg bg-gradient-to-r from-blue-400 to-teal-400 text-white flex flex-col items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
                <h2 className="text-4xl font-bold">70</h2>
                <p className="text-lg">Total Services</p>
              </div>
            </Link>

            <Link href="/admin/registration">
              <div className="w-40 sm:w-64 h-32 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
                <h2 className="text-4xl font-bold">8</h2>
                <p className="text-lg">Total Registrations</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
