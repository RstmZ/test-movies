import { Movie } from '@/app/lib/hooks/useMovies';
import { useQuery } from '@tanstack/react-query';
export function useMovie(id: number) {
  return useQuery<Movie>({
    queryKey: ['movie', id],
    queryFn: async (): Promise<Movie> => {
      const res = await fetch(`/api/movies/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch movies');
      }
      return res.json();
    },
  });
}
