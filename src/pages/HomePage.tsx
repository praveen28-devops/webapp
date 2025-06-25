import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cloud, Settings, TrendingUp } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import BlogList from '../components/Blog/BlogList';

const HomePage: React.FC = () => {
  const { posts } = useBlog();
  const recentPosts = posts.filter(post => post.status === 'published').slice(0, 6);

  const categories = [
    {
      name: 'DevOps',
      description: 'Automation, CI/CD, and infrastructure best practices',
      icon: Settings,
      color: 'bg-green-50 text-green-600 border-green-200',
      count: posts.filter(p => p.category === 'DevOps' && p.status === 'published').length,
    },
    {
      name: 'Cloud',
      description: 'AWS, Azure, serverless, and cloud architecture',
      icon: Cloud,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      count: posts.filter(p => p.category === 'Cloud' && p.status === 'published').length,
    },
    {
      name: 'Software Development',
      description: 'Modern development practices and technologies',
      icon: Code,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      count: posts.filter(p => p.category === 'Software Development' && p.status === 'published').length,
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              DevOps, Cloud & Software Development Insights
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Practical guides, best practices, and deep dives into modern development technologies 
              to help you build better, scalable systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="#recent-posts"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                Explore Posts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dive deep into specific areas of technology and development practices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="group relative bg-white rounded-xl p-8 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg border-2 ${category.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.count} posts
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section id="recent-posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Recent Posts
            </h2>
            <p className="text-lg text-gray-600">
              Latest insights and tutorials
            </p>
          </div>
          
          <Link
            to="/posts"
            className="hidden sm:inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            View All Posts
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <BlogList posts={recentPosts} showFeatured={true} />
        
        <div className="text-center mt-12">
          <Link
            to="/posts"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Growing Community</h2>
            <p className="text-gray-300">Join thousands of developers learning together</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{posts.filter(p => p.status === 'published').length}</div>
              <div className="text-gray-300">Published Posts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">10k+</div>
              <div className="text-gray-300">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
              <div className="text-gray-300">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">99%</div>
              <div className="text-gray-300">Practical Content</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;