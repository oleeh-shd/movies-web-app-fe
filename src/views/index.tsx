"use client";

import { FC } from "react";

import { Heading } from "@/components/heading";
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
                <div className="flex size-full items-center justify-center">
                    <Heading variant="h2" title="Loading..." />
                </div>
            ) : (
                views[view]
            )}
        </main>
    );
};
