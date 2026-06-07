export interface Game {
  appid: number;
  name: string;
  header_image: string;
  description?: string;
}

export interface GameDetail extends Game {
  short_description?: string;
  price?: {
    final_formatted: string;
  };
  developers?: string[];
  publishers?: string[];
  release_date?: {
    date: string;
  };
  screenshots?: { id: number; path_full: string }[];
  header_image: string;
}

export interface SearchResult {
  items: Game[];
  total_pages: number;
}
