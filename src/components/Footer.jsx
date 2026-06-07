import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4 text-sm">© {new Date().getFullYear()} Steam API. All rights reserved.</p>
        <nav className="flex justify-center space-x-6">
          <a href="https://github.com/prince-m2hgamerz/steam-api" className="hover:text-white transition-colors text-sm">GitHub</a>
          <a href="/privacy" className="hover:text-white transition-colors text-sm">Privacy</a>
          <a href="/terms" className="hover:text-white transition-colors text-sm">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
