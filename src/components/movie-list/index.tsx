import { FC } from "react";

import { Movie } from "@/api/get-movie-list";
import { useMovieStore } from "@/zustand/useMovieStore";

import { useViewStore } from "@/zustand/useViewStore";

import { Card } from "../card";
import { Loader } from "../loader";

export const MovieList: FC = () => {
    const { movies, setMovieToUpdate, loading } = useMovieStore();
    const { changeView } = useViewStore();

    const updateMovie = (movie: Movie) => {
        setMovieToUpdate(movie);
        changeView("update");
    };

    return (
        <div className="mb-16 flex min-h-[508px] w-full items-center justify-center">
            {loading ? (
                <Loader />
            ) : (
                <div className=" grid w-full grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {movies.map((movie) => (
                        <Card
                            key={movie.id}
                            {...movie}
                            onClick={() => updateMovie(movie)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
