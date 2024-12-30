"use client";

import React from 'react';
import { BarChart, Users, FileText, Settings } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Views', value: '1,234', icon: Users },
    { title: 'Projects', value: '12', icon: FileText },
    { title: 'Blog Posts', value: '8', icon: FileText },
    { title: 'Messages', value: '23', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          {stat.title}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {stat.value}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Projects
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((project) => (
                <div
                  key={project}
                  className="flex items-center justify-between border-b dark:border-gray-700 pb-2"
                >
                  <span className="text-gray-600 dark:text-gray-300">
                    Project {project}
                  </span>
                  <button className="text-blue-500 hover:text-blue-600">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Blog Posts
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((post) => (
                <div
                  key={post}
                  className="flex items-center justify-between border-b dark:border-gray-700 pb-2"
                >
                  <span className="text-gray-600 dark:text-gray-300">
                    Blog Post {post}
                  </span>
                  <button className="text-blue-500 hover:text-blue-600">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 