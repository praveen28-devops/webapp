import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost } = useBlog();
  
  if (!id) {
    return <Navigate to="/" replace />;
  }

  const post = getPost(id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DevOps':
        return 'bg-green-100 text-green-800';
      case 'Cloud':
        return 'bg-blue-100 text-blue-800';
      case 'Software Development':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Link>
      </div>

      {/* Post Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime} min read
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Published {formatDate(post.publishedAt)}</span>
            </div>
            {post.updatedAt !== post.publishedAt && (
              <div className="text-gray-500 text-sm">
                Updated {formatDate(post.updatedAt)}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        <p className="text-xl text-gray-700 leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="border-t border-gray-200 pt-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author Info */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {post.author.charAt(0)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
            <p className="text-gray-600">
              DevOps Engineer & Passionate about automation, infrastructure, and modern software development practices.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostPage;