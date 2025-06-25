import React from 'react';
import { BlogPost } from '../../types/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ posts, showFeatured = false }) => {
  const publishedPosts = posts.filter(post => post.status === 'published');
  
  if (publishedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No posts found.</p>
      </div>
    );
  }

  const featuredPost = showFeatured ? publishedPosts[0] : null;
  const remainingPosts = showFeatured ? publishedPosts.slice(1) : publishedPosts;

  return (
    <div className="space-y-8">
      {featuredPost && (
        <div className="mb-12">
          <BlogCard post={featuredPost} featured={true} />
        </div>
      )}
      
      {remainingPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;