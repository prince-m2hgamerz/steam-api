import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import { Game } from "../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR<Game[]>("/api/games/popular", fetcher);

  return (
    <>
      <Head>
        <title>Steam Game Explorer</title>
        <meta name="description" content="Browse and search Steam games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        {error && <p className="text-red-500">Failed to load games.</p>}
        {(!data && !error) && <p>Loading...</p>}
        {data && (
          <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {data.map((game) => (
              <GameCard key={game.appid} game={game} />
            ))}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Home;
