import React from "react";

const CheatsheetPage: React.FC = () => {
  return (
    <div className="flex justify-center">
      {/* Left Google Ad placeholder */}
      <div className="hidden lg:block w-60 mr-4">
        {/* Google Ad code goes here */}
      </div>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-1 text-center">Cheatsheet</h1>
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500">(for fresher)</span>
        </div>
        <p className="mb-6 text-gray-600 text-center">This page will contain useful programming cheatsheets and resources. Stay tuned!</p>
        {/* TODO: Integrate with Supabase to display uploaded PDF cheatsheets */}
        <h2 className="text-2xl font-semibold mt-8 mb-2 text-center">Tools & Technologies</h2>
        <div className="flex flex-wrap gap-4 justify-center pl-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Linux</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Git</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">GitHub</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Jenkins</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Docker</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Kubernetes</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Ansible</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Terraform</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Java</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Python</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">AWS</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-medium">Interview Preparation</button>
        </div>
      </div>
      {/* Right Google Ad placeholder */}
      <div className="hidden lg:block w-60 ml-4">
        {/* Google Ad code goes here */}
      </div>
    </div>
  );
};

export default CheatsheetPage;
