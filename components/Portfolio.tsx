"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, Code, User, BookOpen, Github, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, BlogPost } from '../types';
import { createTerminalCommands } from '../utils/terminalCommands';
import { SessionProvider } from "next-auth/react";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState(['Welcome! Type "help" to see available commands']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleCommand = (command: string) => {
    if (command === 'theme') {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      return;
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <SessionProvider>
      <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Code className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DPortfolio</span>
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
                <a
                  href="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </a>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-gray-300" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700" />
                  )}
                </button>
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About Me</h2>
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((project) => (
                      <div key={project} className="border dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 dark:text-white">Project {project}</h3>
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog</h2>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((post) => (
                      <div key={post} className="border dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 dark:text-white">Blog Post {post}</h3>
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact</h2>
                  </div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2 border dark:border-gray-700 rounded"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2 border dark:border-gray-700 rounded"
                      required
                    />
                    <textarea
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2 border dark:border-gray-700 rounded"
                      rows={4}
                      required
                    />
                    <button 
                      type="submit" 
                      className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                      disabled={formStatus === 'sending'}
                    >
                      {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                    {formStatus === 'success' && (
                      <p className="text-green-500">Message sent successfully!</p>
                    )}
                    {formStatus === 'error' && (
                      <p className="text-red-500">Failed to send message. Please try again.</p>
                    )}
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
    </SessionProvider>
  );
};

export default Portfolio; 