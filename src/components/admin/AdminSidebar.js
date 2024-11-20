// // src/components/AdminSidebar.js
// "use client";
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useAuth } from '@/context/authContext';

// export default function AdminSidebar() {
//  const pathname = usePathname();
//  const router = useRouter();
//  const { logout } = useAuth(); // Access the logout function from the context

//  const handleLogout = () => {
//   logout();
//   router.push('/admin/login');
//  };

//  const getLinkClasses = (path) => {
//   return pathname === path
//     ? "py-2 px-4 bg-gray-600 font-semibold text-xl text-blue-300"
//     : "py-2 px-4 hover:bg-gray-700";
// };

//   return (
//     <aside className="w-64 h-screen bg-gray-800 text-white fixed">
//       <div className='flex p-2 mt-4 gap-3 text-center justify-center'>
//       <img
//             src="../Images/logo.jpeg"
//             alt="Logo"
//             className="w-10 h-10 rounded-full"
//             />
//         <h1 className="p-2 text-lg font-bold">Admin Panel</h1>
//       </div>
//       <nav className="mt-6">
//         <ul>
//           <li className={getLinkClasses("/admin/dashboard")}>
//             <Link href="/admin/dashboard">Dashboard</Link>
//           </li>
//           <li className={getLinkClasses("/admin/users")}>
//             <Link href="/admin/users">Users</Link>
//           </li>
//           <li className={getLinkClasses("/admin/services")}>
//             <Link href="/admin/services">Services</Link>
//           </li>
//           <li className={getLinkClasses("/admin/registration")}>
//             <Link href="/admin/registration">Registrations</Link>
//           </li>
//           <li>
//           <button onClick={handleLogout} className="block py-2 px-4 ml-2 mt-4 bg-red-400 rounded-md">
//             Logout
//           </button>
//         </li>
//            {/* Add more sidebar links here */}
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// src/components/AdminSidebar.js
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { FiX } from "react-icons/fi"; // Close icon
import { IoMdAddCircleOutline } from "react-icons/io";

export default function AdminSidebar({ isOpen, onClose }) {
  // Receive isOpen and onClose as props
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const getLinkClasses = (path) => {
    return pathname === path
      ? "py-2 px-4 bg-gray-600 font-semibold text-xl text-blue-300"
      : "py-2 px-4 hover:bg-gray-700";
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full bg-gray-800 text-white w-64 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src="../Images/logo.jpeg"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <button className="md:hidden text-white text-2xl" onClick={onClose}>
          <FiX size={50} />
        </button>
      </div>
      <nav className="mt-2">
        <ul>
          <li className={getLinkClasses("/admin/dashboard")}>
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
          <li className={getLinkClasses("/admin/users")}>
            <Link href="/admin/users">Users</Link>
          </li>
          <li className={getLinkClasses("/admin/services")}>
            <Link href="/admin/services">Services</Link>
          </li>
          <li className={getLinkClasses("/admin/registration")}>
            <Link href="/admin/registration">Registrations</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 mx-4 my-4 bg-red-400 rounded-md"
            >
              Logout
            </button>
          </li>

          <li className={getLinkClasses("/admin/banner")}>
            <div className="flex items-center space-x-2">
              <IoMdAddCircleOutline className="text-2xl" />
              <Link href="/admin/banner">Add Banners</Link>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
