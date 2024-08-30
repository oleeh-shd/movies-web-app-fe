import { FC } from "react";

import { Movie } from "@/api/get-movie-list";
import { useMovieStore } from "@/zustand/useMovieStore";

import { useViewStore } from "@/zustand/useViewStore";

import { Card } from "../card";
import { CardSkeleton } from "../card/card-skeleton";

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
                <div className=" grid w-full grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {[1, 2, 3, 4].map((skeleton) => (
                        <CardSkeleton key={skeleton} />
                    ))}
                </div>
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
