import { FC } from "react";

import { Button } from "@/components/button";
import { Heading } from "@/components/heading";

import { HomePageView } from "../../../app/page";

type HomePageEmptyProps = {
    changeView: (view: HomePageView) => void;
};

export const HomePageEmpty: FC<HomePageEmptyProps> = ({ changeView }) => (
    <section className="flex h-full flex-col items-stretch justify-center md:items-center">
        <Heading
            variant="h2"
            title="Your movie list is empty"
            classes="mb-10"
        />
        <Button
            variant="contained"
            text="Add a new movie"
            onClick={() => changeView("create")}
        />
    </section>
);
