import { FC } from "react";

import { Button } from "@/components/button";
import { Heading } from "@/components/heading";

import { useViewStore } from "@/zustand/useViewStore";

export const HomePageEmpty: FC = () => {
    const { changeView } = useViewStore();
    return (
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
};
