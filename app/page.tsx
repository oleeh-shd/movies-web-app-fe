"use client";

import { useEffect, useState } from "react";

import { getMovieList, Movie } from "@/api/get-movie-list";
import { Heading } from "@/components/heading";
import { CreateMovie } from "@/views/create-movie";
import { HomePage } from "@/views/home-page";
import { HomePageEmpty } from "@/views/home-page-empty";
import { UpdateMovie } from "@/views/update-movie";
import { useMovieStore } from "@/zustand/useMovieStore";

export type HomePageView = "home" | "create" | "update";

const Home = () => {
    const { movies, loading, movieToUpdate, fetchMovies } = useMovieStore();

    const [view, setView] = useState<HomePageView>("home");

    const changeView = (view: HomePageView) => {
        setView(view);
    };

    useEffect(() => {
        fetchMovies({ limit: 0, offset: 0 });
    }, []);

    const views = {
        home: movies.length ? (
            <HomePage changeView={changeView} />
        ) : (
            <HomePageEmpty changeView={changeView} />
        ),

        create: <CreateMovie changeView={changeView} />,
        update: (
            <UpdateMovie
                movieToUpdate={movieToUpdate}
                changeView={changeView}
            />
        ),
    };
    return (
        <main className="size-full text-white">
            {loading ? (
                <div className="flex size-full items-center justify-center">
                    <Heading variant="h2" title="Loading..." />
                </div>
            ) : (
                views[view]
            )}
        </main>
    );
};

export default Home;
