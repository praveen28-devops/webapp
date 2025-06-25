import React from 'react';
import { useBlog } from '../contexts/BlogContext';
import BlogList from '../components/Blog/BlogList';

const PostsPage: React.FC = () => {
  const { posts } = useBlog();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>
      <BlogList posts={posts.filter(post => post.status === 'published')} />
    </div>
  );
};

export default PostsPage;