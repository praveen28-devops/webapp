import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './contexts/BlogContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostEditor from './pages/admin/PostEditor';
import PostList from './pages/admin/PostList';
import PostsPage from './pages/PostsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/post/:id" element={<Layout><PostPage /></Layout>} />
            <Route path="/category/:category" element={<Layout><CategoryPage /></Layout>} />
            <Route path="/search" element={<Layout><SearchPage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/posts" element={<Layout><PostsPage /></Layout>} />
            <Route path="/login" element={<LoginPage />} />
            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/posts" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
            <Route path="/admin/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
            <Route path="/admin/edit/:id" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
          </Routes>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;