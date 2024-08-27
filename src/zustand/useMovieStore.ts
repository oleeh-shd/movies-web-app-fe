import { create } from "zustand";

import { getMovieList, Movie } from "@/api/get-movie-list";

export const PAGE_LIMIT = 4;

type Store = {
    movies: Movie[];
    movieToUpdate: Movie;
    loading: boolean;
    currentPage: number;
    totalMovies: number;
};

type Actions = {
    setMovieToUpdate: (movie: Movie) => void;
    fetchMovies: (page: number) => Promise<void>;
    setCurrentPage: (page: number) => void;
};

type MovieStore = Store & Actions;

const initialState: Store = {
    movies: [],
    movieToUpdate: {} as Movie,
    loading: true,
    currentPage: 1,
    totalMovies: 0,
};

export const useMovieStore = create<MovieStore>((set) => ({
    ...initialState,
    setMovieToUpdate: (movieToUpdate) => {
        set({ movieToUpdate });
    },
    fetchMovies: async (page) => {
        const offset = (page - 1) * PAGE_LIMIT;
        try {
            set({ loading: true });
            const {
                data: { movies, total },
            } = await getMovieList({ limit: PAGE_LIMIT, offset });

            set({ movies, totalMovies: total });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    setCurrentPage: (page) => {
        set({ currentPage: page });
    },
}));
