import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Steam API Explorer
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover, search and fetch data from the Steam platform with a clean, modern UI.
          </p>
          <a
            href="/docs"
            className="inline-block bg-primary hover:bg-primary/80 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Get Started
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
