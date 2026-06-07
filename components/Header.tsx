import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Steam Explorer
        </Link>
        <nav>
          <Link href="/" className="text-gray-600 hover:text-gray-900 mr-4">
            Home
          </Link>
          <Link href="https://store.steampowered.com/" className="text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
            Steam Store
          </Link>
        </nav>
      </div>
    </header>
  );
}
