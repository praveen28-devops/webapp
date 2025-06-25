import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Eye, Edit, TrendingUp, Users, Clock } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';
import AdminLayout from './AdminLayout';

const AdminDashboard: React.FC = () => {
  const { posts } = useBlog();
  
  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');
  const recentPosts = posts.slice(0, 5);

  const stats = [
    {
      name: 'Total Posts',
      value: posts.length,
      icon: FileText,
      color: 'bg-blue-600',
      change: '+12%',
    },
    {
      name: 'Published',
      value: publishedPosts.length,
      icon: Eye,
      color: 'bg-green-600',
      change: '+8%',
    },
    {
      name: 'Drafts',
      value: draftPosts.length,
      icon: Edit,
      color: 'bg-yellow-600',
      change: '+4%',
    },
    {
      name: 'Monthly Views',
      value: '12.4k',
      icon: TrendingUp,
      color: 'bg-purple-600',
      change: '+23%',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your blog.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} rounded-md p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/admin/new"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-md p-3 group-hover:bg-blue-700 transition-colors">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">New Post</h3>
                  <p className="text-gray-500">Create a new blog post</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/admin/posts"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center">
                <div className="bg-green-600 rounded-md p-3 group-hover:bg-green-700 transition-colors">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Manage Posts</h3>
                  <p className="text-gray-500">Edit or delete posts</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center">
                <div className="bg-purple-600 rounded-md p-3 group-hover:bg-purple-700 transition-colors">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">View Website</h3>
                  <p className="text-gray-500">See your public blog</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Posts</h2>
              <Link
                to="/admin/posts"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentPosts.map((post) => (
              <div key={post.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.publishedAt}
                      <span className="mx-2">•</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/post/${post.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/edit/${post.id}`}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;