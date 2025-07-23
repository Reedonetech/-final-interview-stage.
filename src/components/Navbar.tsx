
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from './Button';
import { useAuthStore } from '@/lib/store';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-semibold text-gray-800 dark:text-white">
            ContactApp
          </Link>

          {/* Desk Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Contact
            </Link>
            <Link
              href="/submissions"
              className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Submissions
            </Link>

            {isAuthenticated() ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome, {user?.name}
                </span>
                <Button
                  onClick={logout}
                  variant="danger"
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-primary hover:underline text-white"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile toggle button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-white dark:bg-gray-900">
          <Link
            href="/contact"
            className="block text-sm text-gray-700 dark:text-gray-200 hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/submissions"
            className="block text-sm text-gray-700 dark:text-gray-200 hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Submissions
          </Link>

          {isAuthenticated() ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hello, {user?.name}
              </p>
              <Button onClick={logout} variant="danger" className="w-full text-sm">
                Logout
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              className="block text-sm text-primary hover:underline text-white"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
