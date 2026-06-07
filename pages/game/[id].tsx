import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

type Screenshot = {
  path_full: string;
};

type GameDetail = {
  name?: string;
  short_description?: string;
  header_image?: string;
  screenshots?: Screenshot[];
  // allow any other fields returned by Steam API
  [key: string]: any;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const res = await fetch(
    `https://store.steampowered.com/api/appdetails?appids=${id}&filters=basic`
  );
  const json = await res.json();
  const data: GameDetail = json[id]?.data || {};
  return { props: { data } };
};

export default function GamePage({ data }: { data: GameDetail }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{data.name ?? 'Game Detail'}</title>
        <meta name="description" content={data.short_description || ''} />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        {data.header_image && (
          <img
            src={data.header_image}
            alt={data.name}
            className="w-full max-w-md mb-4 rounded"
          />
        )}
        {data.short_description && (
          <p className="mb-6">{data.short_description}</p>
        )}

        {Array.isArray(data.screenshots) && data.screenshots.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.screenshots.map((shot, idx) => (
                <img
                  key={idx}
                  src={shot.path_full}
                  alt={`Screenshot ${idx + 1}`}
                  className="rounded"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
