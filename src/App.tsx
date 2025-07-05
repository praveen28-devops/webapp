import React from 'react';
import './quill.snow.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './contexts/BlogContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostEditor from './pages/admin/PostEditor';
import PostList from './pages/admin/PostList';
import PostsPage from './pages/PostsPage';
import LoginPage from './pages/LoginPage';
import SubscribePage from './pages/SubscribePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import JobsPage from './pages/JobsPage';
import AdminJobs from './pages/admin/AdminJobs';
import CheatsheetPage from './pages/CheatsheetPage';

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
            <Route path="/posts" element={<Layout><PostsPage /></Layout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/subscribe" element={<Layout><SubscribePage /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms" element={<Layout><TermsOfUse /></Layout>} />
            <Route path="/jobs" element={<Layout><JobsPage /></Layout>} />
            <Route path="/cheatsheets" element={<Layout><CheatsheetPage /></Layout>} />
            {/* Admin Routes (Protected) */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/posts" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
            <Route path="/admin/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
            <Route path="/admin/edit/:id" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
            <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
          </Routes>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;