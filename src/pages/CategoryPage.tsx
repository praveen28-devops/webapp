import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import BlogList from '../components/Blog/BlogList';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { getPostsByCategory } = useBlog();

  if (!category) {
    return <div>Category not found</div>;
  }

  const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const posts = getPostsByCategory(categoryName);

  const getCategoryDescription = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'devops':
        return 'Automation, CI/CD, infrastructure as code, and operational best practices for modern software delivery.';
      case 'cloud':
        return 'AWS, Azure, serverless computing, cloud architecture, and scalable infrastructure solutions.';
      case 'software development':
        return 'Modern development practices, frameworks, patterns, and technologies for building robust applications.';
      default:
        return 'Explore articles in this category.';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {categoryName}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {getCategoryDescription(categoryName)}
        </p>
        <div className="mt-4">
          <span className="text-sm text-gray-500">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>
      </div>

      {/* Posts List */}
      <BlogList posts={posts} />

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No posts found in this category yet.</p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Explore other categories
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;