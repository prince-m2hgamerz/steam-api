import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search Steam games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md px-4 py-2"
      >
        Search
      </button>
    </form>
  );
}
