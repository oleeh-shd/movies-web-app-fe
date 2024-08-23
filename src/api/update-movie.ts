import { api } from "./axios";
import { CreateMovieBody } from "./create-movie";

export type UpdateMovieBody = Partial<CreateMovieBody>;

export const updateMovie = (id: number, body: UpdateMovieBody) => {
    return api.patch<{ message: string }>(`movies/${id}`, body);
};
