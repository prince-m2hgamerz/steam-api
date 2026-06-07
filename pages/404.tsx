import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Custom404() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-16">
        <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
        <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="text-indigo-600 hover:underline">
          ← Return to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
