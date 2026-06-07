import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { GameDetail } from "../../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GameDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR<GameDetail>(id ? `/api/game/${id}` : null, fetcher);

  if (error) return <p className="text-center text-red-500">Failed to load game.</p>;
  if (!data) return <p className="text-center">Loading...</p>;

  return (
    <>
      <Head>
        <title>{data.name} – Steam Explorer</title>
        <meta name="description" content={data.short_description} />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={data.header_image}
            alt={data.name}
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
            <p className="mb-4">{data.short_description}</p>
            <p className="text-lg font-medium mb-2">Price: {data.price?.final_formatted ?? "Free"}</p>
            <p className="mb-2">Developers: {data.developers?.join(", ")}</p>
            <p className="mb-2">Publishers: {data.publishers?.join(", ")}</p>
            <p className="mb-2">Release Date: {data.release_date?.date}</p>
          </div>
        </div>
        {data.screenshots?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.screenshots.map((shot) => (
                <img
                  key={shot.id}
                  src={shot.path_full}
                  alt="Screenshot"
                  className="rounded-lg object-cover w-full h-48"
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
