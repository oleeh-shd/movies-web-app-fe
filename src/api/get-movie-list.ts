import { api } from "./axios";

type MovieListSearchParams = {
    limit: number;
    offset: number;
};

export type Movie = {
    id: number;
    title: string;
    publishingYear: number;
    poster: string;
};

type GetMovieListResponse = {
    movies: Movie[];
    total: number;
};

export const getMovieList = async ({
    limit,
    offset,
}: MovieListSearchParams) => {
    return api.get<GetMovieListResponse>("movies", {
        params: { limit, offset },
    });
};
