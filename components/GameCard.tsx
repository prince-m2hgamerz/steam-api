import Link from "next/link";
import { Game } from "../types";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Link href={`/game/${game.appid}`}> 
      <a className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
        <img
          src={game.header_image}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate" title={game.name}>
            {game.name}
          </h3>
        </div>
      </a>
    </Link>
  );
}
