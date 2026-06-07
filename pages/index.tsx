import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Steam Game Explorer</title>
        <meta name="description" content="Discover and explore Steam games" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white py-12 text-center">
          <h1 className="text-4xl font-bold">Steam Game Explorer</h1>
          <p className="mt-2 text-lg">Find your next favorite game</p>
        </header>
        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search games..."
              className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Featured Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded mb-2"></div>
                  <h3 className="font-medium">Game {i + 1}</h3>
                </div>
              ))}
            </div>
          </section>
        </main>
        <footer className="bg-gray-800 text-gray-300 py-4 text-center">
          <p>&copy; {new Date().getFullYear()} Steam Game Explorer</p>
        </footer>
      </div>
    </>
  );
}
