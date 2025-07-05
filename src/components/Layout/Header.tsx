import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Code } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownKey, setDropdownKey] = useState(0);

  React.useEffect(() => {
    // Close all dropdowns by resetting key on route change
    setDropdownKey(prev => prev + 1);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'DevOps', path: '/category/devops' },
    { name: 'Cloud', path: '/category/cloud' },
    { name: 'Software Development', path: '/category/software-development' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DevsBlog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            {/* Blogs Dropdown */}
            
            
            
            <div
  key={`blogs-dropdown-${dropdownKey}`}
  className="relative group"
  tabIndex={0}
>
  <div className="text-gray-700 hover:text-blue-600 transition-colors flex items-center select-none cursor-pointer">
    Blogs
    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
  </div>
  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50 py-2">
    <Link to="/category/devops" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">DevOps</Link>
    <Link to="/category/cloud" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Cloud</Link>
    <Link to="/category/software-development" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Software Development</Link>
  </div>
</div>



            {/* Job Session Dropdown */}
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
              Jobs
              <span className="text-[10px] ml-1 align-top bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 bg-clip-text text-transparent font-bold">(fresher)</span>
            </Link>
            <Link to="/cheatsheets" className="text-gray-700 hover:text-blue-600 transition-colors">
              Cheatsheets
            </Link>
            {/* Policy Dropdown */}
            <div
  key={`policy-dropdown-${dropdownKey}`}
  className="relative group"
  tabIndex={0}
>
  <div className="text-gray-700 hover:text-blue-600 transition-colors flex items-center select-none cursor-pointer">
    Policy
    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
  </div>
  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50 py-2">
    <Link to="/terms" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Terms of Use</Link>
    <Link to="/privacy" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Privacy Policy</Link>
  </div>
</div>



          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Home
              </Link>
              {/* Blogs Mobile Dropdown */}
              <details className="group">
                <summary className="text-gray-700 hover:text-blue-600 cursor-pointer select-none">Blogs</summary>
                <div className="ml-4 flex flex-col space-y-2 mt-2">
                  <Link to="/category/devops" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">DevOps</Link>
                  <Link to="/category/cloud" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Cloud</Link>
                  <Link to="/category/software-development" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Software Development</Link>
                </div>
              </details>
              {/* Job Session Mobile Dropdown */}
              <Link
                to="/jobs"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                Jobs
                <span className="text-[10px] ml-1 align-top bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 bg-clip-text text-transparent font-bold">(fresher)</span>
              </Link>
              <Link
                to="/cheatsheets"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Cheatsheets
              </Link>
              {/* Policy Mobile Dropdown */}
              <details className="group">
                <summary className="text-gray-700 hover:text-blue-600 cursor-pointer select-none">Policy</summary>
                <div className="ml-4 flex flex-col space-y-2 mt-2">
                  <Link to="/terms" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Terms of Use</Link>
                  <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">Privacy Policy</Link>
                </div>
              </details>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;