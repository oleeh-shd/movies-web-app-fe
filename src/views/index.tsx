"use client";

import { FC } from "react";

import { HeaderSkeleton } from "@/components/header/header-skeleton";
import { MovieList } from "@/components/movie-list";
import { useAuthStore } from "@/zustand/authStore";
import { useViewStore } from "@/zustand/useViewStore";

import { CreateMovie } from "./create-movie";
import { HomePage } from "./home-page";
import { UpdateMovie } from "./update-movie";

export const HomeView: FC = () => {
    const { loading } = useAuthStore();
    const { view } = useViewStore();

    const views = {
        home: <HomePage />,
        create: <CreateMovie />,
        update: <UpdateMovie />,
    };
    return (
        <main className="size-full text-white">
            {loading ? (
                <section className="mb-[100px] flex size-full flex-col items-center">
                    <HeaderSkeleton />
                    <MovieList />
                </section>
            ) : (
                views[view]
            )}
        </main>
    );
};
