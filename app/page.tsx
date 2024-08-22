"use client";

import { useState } from "react";

import { CreateMovie } from "@/views/create-movie";
import { HomePage } from "@/views/home-page";
import { HomePageEmpty } from "@/views/home-page-empty";

export type HomePageView = "empty" | "filled" | "create";

const Home = () => {
    const [view, setView] = useState<HomePageView>("filled");

    const changeView = (view: HomePageView) => {
        setView(view);
    };

    const views = {
        empty: <HomePageEmpty />,
        filled: <HomePage changeView={changeView} />,
        create: <CreateMovie changeView={changeView} />,
    };
    return <main className="size-full text-white">{views[view]}</main>;
};

export default Home;
