import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './contexts/BlogContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostEditor from './pages/admin/PostEditor';
import PostList from './pages/admin/PostList';

function App() {
  return (
    <BlogProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/post/:id" element={<Layout><PostPage /></Layout>} />
          <Route path="/category/:category" element={<Layout><CategoryPage /></Layout>} />
          <Route path="/search" element={<Layout><SearchPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/posts" element={<PostList />} />
          <Route path="/admin/new" element={<PostEditor />} />
          <Route path="/admin/edit/:id" element={<PostEditor />} />
        </Routes>
      </Router>
    </BlogProvider>
  );
}

export default App;