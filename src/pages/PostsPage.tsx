
import React, { useState, useMemo } from 'react';
import { useBlog } from '../contexts/BlogContext';
import BlogList from '../components/Blog/BlogList';


const PostsPage: React.FC = () => {
  const { posts } = useBlog();
  const publishedPosts = useMemo(() => posts.filter(post => post.status === 'published'), [posts]);
  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    publishedPosts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [publishedPosts]);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const filteredPosts = selectedTag
    ? publishedPosts.filter(post => post.tags.includes(selectedTag))
    : publishedPosts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${!selectedTag ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${selectedTag === tag ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <BlogList posts={filteredPosts} />
    </div>
  );
};

export default PostsPage;