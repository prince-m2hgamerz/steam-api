export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 py-6">
      <div className="container mx-auto text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Steam Explorer. All rights reserved.
      </div>
    </footer>
  );
}
