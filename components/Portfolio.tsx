"use client";

import React, { useState } from 'react';
import { Terminal, Code, User, BookOpen, Github, Mail } from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState(['Welcome! Type "help" to see available commands']);

  const handleCommand = (command: string) => {
    const commands: { [key: string]: string } = {
      help: 'Available commands: about, projects, blog, contact, clear',
      about: 'Switching to About section...',
      projects: 'Switching to Projects section...',
      blog: 'Switching to Blog section...',
      contact: 'Switching to Contact section...',
      clear: 'Clearing terminal...'
    };

    const newHistory = [...terminalHistory, `> ${command}`];
    
    if (command in commands) {
      if (command === 'clear') {
        setTerminalHistory([]);
        return;
      }
      newHistory.push(commands[command]);
      setActiveTab(command);
    } else {
      newHistory.push('Command not found. Type "help" for available commands.');
    }
    
    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">DPortfolio</span>
            </div>
            <div className="flex items-center space-x-4">
              {['about', 'projects', 'blog', 'contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <User className="h-12 w-12 text-blue-500" />
                  <h2 className="text-2xl font-bold">About Me</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Full-stack developer passionate about creating innovative web solutions.
                  Experienced in React, Next.js, and modern web technologies.
                </p>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Github className="h-12 w-12 text-blue-500" />
                  <h2 className="text-2xl font-bold">Projects</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((project) => (
                    <div key={project} className="border dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-bold">Project {project}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Description of project {project}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <BookOpen className="h-12 w-12 text-blue-500" />
                  <h2 className="text-2xl font-bold">Blog</h2>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="border dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-bold">Blog Post {post}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Preview of blog post {post}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-12 w-12 text-blue-500" />
                  <h2 className="text-2xl font-bold">Contact</h2>
                </div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border dark:border-gray-700 rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border dark:border-gray-700 rounded"
                  />
                  <textarea
                    placeholder="Message"
                    className="w-full p-2 border dark:border-gray-700 rounded"
                    rows={4}
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Terminal Section */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-4 font-mono">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-5 w-5 text-green-500" />
              <span className="text-green-500">Portfolio Terminal</span>
            </div>
            <div className="h-96 overflow-y-auto space-y-2">
              {terminalHistory.map((line, index) => (
                <div key={index} className="text-green-500">
                  {line}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-green-500">{'>'}</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCommand(terminalInput.toLowerCase().trim());
                    }
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-green-500 ml-2"
                  placeholder="Type a command..."
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio; 