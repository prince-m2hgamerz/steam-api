import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-primary">Steam API</Link>
        <nav className="space-x-4 hidden md:block">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
          <Link to="/docs" className="text-gray-600 hover:text-primary transition-colors">Docs</Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About</Link>
        </nav>
        <button className="md:hidden flex items-center" aria-label="Menu">
          <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
