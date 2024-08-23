import { api } from "./axios";

export type CreateMovieBody = {
    posterId: number;
    title: string;
    publishingYear: number;
};

export const createMovie = (body: CreateMovieBody) => {
    return api.post<{ message: string }>("movies", body);
};
