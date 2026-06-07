import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import Pagination from "../components/Pagination";
import { SearchResult } from "../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchPage() {
  const router = useRouter();
  const { query = "", page = "1" } = router.query;
  const pageNum = parseInt(page as string, 10) || 1;

  const { data, error } = useSWR<SearchResult>(
    query ? `/api/search?query=${encodeURIComponent(query as string)}&page=${pageNum}` : null,
    fetcher
  );

  return (
    <>
      <Head>
        <title>Search results for "{query}" - Steam Explorer</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {error && <p className="text-red-500">Failed to load results.</p>}
        {!data && !error && <p>Loading...</p>}
        {data && (
          <>
            <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.items.map((game) => (
                <GameCard key={game.appid} game={game} />
              ))}
            </section>
            <Pagination currentPage={pageNum} totalPages={data.total_pages} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
