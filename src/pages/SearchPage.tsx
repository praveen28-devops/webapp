import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import BlogList from '../components/Blog/BlogList';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { searchPosts } = useBlog();
  const [results, setResults] = useState<any[]>([]);
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      const searchResults = searchPosts(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, searchPosts]);

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

      {/* Search Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="h-8 w-8 text-gray-400" />
          <h1 className="text-4xl font-bold text-gray-900">Search Results</h1>
        </div>
        
        {query && (
          <p className="text-xl text-gray-600 mb-4">
            Results for: <span className="font-semibold">"{query}"</span>
          </p>
        )}
        
        <div className="text-sm text-gray-500">
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </div>
      </div>

      {/* Search Results */}
      {query ? (
        <BlogList posts={results} />
      ) : (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Enter a search term to find posts.</p>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            No posts found for "{query}". Try different keywords or browse our categories.
          </p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Browse all posts
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchPage;