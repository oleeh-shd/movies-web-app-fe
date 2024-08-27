"use client";

import { Heading } from "@/components/heading";
import { CreateMovie } from "@/views/create-movie";
import { HomePage } from "@/views/home-page";
import { UpdateMovie } from "@/views/update-movie";
import { useAuthStore } from "@/zustand/authStore";
import { useViewStore } from "@/zustand/useViewStore";

export type HomePageView = "home" | "create" | "update";

const Home = () => {
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

export default Home;
