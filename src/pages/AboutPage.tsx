import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Cloud, Settings, Github, Linkedin, Twitter } from 'lucide-react';

const AboutPage: React.FC = () => {
  const skills = [
    { name: 'DevOps', icon: Settings, color: 'text-green-600' },
    { name: 'Cloud Architecture', icon: Cloud, color: 'text-blue-600' },
    { name: 'Software Development', icon: Code, color: 'text-purple-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8">
            M
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gokul
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            DevOps Engineer & Passionate about sharing knowledge and helping developers 
            build better, more scalable systems.
          </p>
        </section>

        {/* Bio Section */}
        {/* <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              With over 8 years of experience in software development and infrastructure, I've had the 
              privilege of working with startups and enterprise companies to build scalable, reliable systems 
              that serve millions of users.
            </p>
            <p>
              My journey began as a software developer, but I quickly became fascinated by the intersection 
              of development and operations. This led me to specialize in DevOps practices, cloud architecture, 
              and modern deployment strategies.
            </p>
            <p>
              I started this blog to share practical insights, lessons learned from real-world projects, 
              and to help other developers navigate the ever-evolving landscape of modern software development.
            </p>
          </div>
        </section> */}

        {/* Skills Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <Icon className={`h-12 w-12 ${skill.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                </div>
              );
            })}
          </div>
        </section>

        {/* Experience Section */}
        {/* <section className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience Highlights</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Senior DevOps Engineer</h3>
              <p className="text-blue-600 mb-2">TechCorp Inc. • 2021 - Present</p>
              <p className="text-gray-700">
                Leading infrastructure automation initiatives, managing Kubernetes clusters, 
                and implementing CI/CD pipelines that reduced deployment time by 75%.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Cloud Architect</h3>
              <p className="text-blue-600 mb-2">CloudFirst Solutions • 2019 - 2021</p>
              <p className="text-gray-700">
                Designed and implemented multi-cloud architectures serving 10M+ users, 
                with focus on scalability, security, and cost optimization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Full Stack Developer</h3>
              <p className="text-blue-600 mb-2">StartupXYZ • 2017 - 2019</p>
              <p className="text-gray-700">
                Built modern web applications using React, Node.js, and AWS services, 
                helping the company scale from 0 to 1M users.
              </p>
            </div>
          </div>
        </section> */}

        {/* Technologies Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technologies I Work With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Kubernetes', 'Docker', 'AWS', 'Azure',
              'Terraform', 'Jenkins', 'GitLab CI', 'React',
              'Node.js', 'Python', 'Go', 'TypeScript',
              'MongoDB', 'PostgreSQL', 'Redis', 'Prometheus'
            ].map((tech) => (
              <div key={tech} className="bg-white rounded-lg p-3 text-center shadow-sm border">
                <span className="text-sm font-medium text-gray-700">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Connect Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="text-blue-100 mb-6">
            Have questions or want to discuss technology? Feel free to reach out!
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;