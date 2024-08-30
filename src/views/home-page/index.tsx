import { FC, useEffect } from "react";

import { Header } from "@/components/header";
import { HeaderSkeleton } from "@/components/header/header-skeleton";
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
    }, [isAuth, currentPage, fetchMovies]);

    return (
        <section className="mb-[100px] flex size-full flex-col items-center">
            {loading && !totalMovies ? (
                <>
                    <HeaderSkeleton />
                    <MovieList />
                </>
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
