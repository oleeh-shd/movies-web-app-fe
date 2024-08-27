import { FC, useEffect } from "react";

import { Header } from "@/components/header";
import { Heading } from "@/components/heading";
import { MovieList } from "@/components/movie-list";
import { Pagination } from "@/components/pagination";

import { useAuthStore } from "@/zustand/authStore";
import { useMovieStore } from "@/zustand/useMovieStore";

import { HomePageEmpty } from "../home-page-empty";

export const HomePage: FC = () => {
    const { isAuth } = useAuthStore();
    const { fetchMovies, currentPage, loading, totalMovies } = useMovieStore();

    useEffect(() => {
        if (isAuth) {
            fetchMovies(currentPage);
        }
    }, [isAuth, currentPage]);

    return (
        <section className="mb-[100px] flex size-full flex-col items-center">
            {loading && !totalMovies ? (
                <div className="flex size-full items-center justify-center">
                    <Heading variant="h2" title="Loading..." />
                </div>
            ) : totalMovies ? (
                <>
                    <Header />
                    <MovieList />
                    <Pagination />
                </>
            ) : (
                <HomePageEmpty />
            )}
        </section>
    );
};
