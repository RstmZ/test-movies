import { useQuery } from '@tanstack/react-query';

export type Movie = {
  id: number;
  title: string;
  publishingYear: number;
  poster: string;
};
type PaginatedMoviesResponse = {
  data: Movie[];
  page: number;
  totalPages: number;
  totalItems: number;
};

export function useMovies(page: number, limit: number = 8) {
  return useQuery<PaginatedMoviesResponse>({
    queryKey: ['movies', page, limit],
    queryFn: async (): Promise<PaginatedMoviesResponse> => {
      const res = await fetch(`/api/movies?page=${page}&limit=${limit}`);
      if (!res.ok) {
        throw new Error('Failed to fetch movies');
      }
      return res.json();
    },
  });
}
