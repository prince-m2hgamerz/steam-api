import { useRouter } from "next/router";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const query = router.query.query as string || "";

  const goTo = (page: number) => {
    router.push(`/search?query=${encodeURIComponent(query)}&page=${page}`);
  };

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        disabled={currentPage <= 1}
        onClick={() => goTo(currentPage - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => goTo(currentPage + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
