import { create } from "zustand";

import { getMovieList, Movie } from "@/api/get-movie-list";

type Store = {
    movies: Movie[];
    movieToUpdate: Movie;
    loading: boolean;
};

type Actions = {
    setMovieToUpdate: (movie: Movie) => void;
    fetchMovies: ({
        limit,
        offset,
    }: {
        limit: number;
        offset: number;
    }) => Promise<void>;
};

type MovieStore = Store & Actions;

const initialState: Store = {
    movies: [],
    movieToUpdate: {} as Movie,
    loading: true,
};

export const useMovieStore = create<MovieStore>((set) => ({
    ...initialState,
    setMovieToUpdate: (movieToUpdate) => {
        set({ movieToUpdate });
    },
    fetchMovies: async ({ limit, offset }) => {
        try {
            set({ loading: true });
            const {
                data: { movies },
            } = await getMovieList({ limit, offset });

            set({ movies });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
}));
