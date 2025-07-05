
import React from 'react';

const AboutPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
    <div className="max-w-2xl w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-900">About DevBlog</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        DevBlog is a community-driven platform sharing practical knowledge on DevOps, Cloud, and Software Development. Our mission is to empower developers and engineers with actionable guides, real-world tips, and the latest trends in tech.
      </p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-700">Our Mission</h2>
        <p className="text-gray-600">
          We believe in open knowledge and collaboration. Our content is crafted by passionate engineers for the community, focusing on clarity, depth, and real-world application.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-700">Meet the Team</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2">G</div>
            <div className="text-lg font-semibold text-gray-900">Gokul</div>
            <div className="text-gray-500 text-sm">Founder & DevOps Engineer</div>
          </div>
          {/* Add more team members here if needed */}
        </div>
      </div>
      <div className="text-center">
        <span className="text-gray-500">Contact: <a href="mailto:devblogss@gmail.com" className="text-blue-600 hover:underline">devblogss@gmail.com</a></span>
      </div>
    </div>
  </div>
);

export default AboutPage;
