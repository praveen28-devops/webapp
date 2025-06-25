import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Plus, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, current: location.pathname === '/admin' },
    { name: 'All Posts', href: '/admin/posts', icon: FileText, current: location.pathname === '/admin/posts' },
    { name: 'New Post', href: '/admin/new', icon: Plus, current: location.pathname === '/admin/new' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
              <Link to="/admin" className="text-white text-xl font-bold">
                Admin Panel
              </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex-shrink-0 p-4 border-t border-gray-700 flex flex-col gap-2">
                <Link
                  to="/"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  ← Back to Website
                </Link>
                <button
                  onClick={signOut}
                  className="mt-2 w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;