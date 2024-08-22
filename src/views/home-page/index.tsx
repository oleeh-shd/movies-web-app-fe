import Image from "next/image";

import { FC } from "react";

import { Card } from "@/components/card";
import { Heading } from "@/components/heading";
import { Pagination } from "@/components/pagination";

import { HomePageView } from "../../../app/page";

type Props = {
    changeView: (view: HomePageView) => void;
};

export const HomePage: FC<Props> = ({ changeView }) => {
    return (
        <section className="mb-[120px] flex flex-col items-center">
            <div className="mb-20 flex w-full items-center justify-between md:mb-[120px]">
                <div className="flex items-center gap-3">
                    <Heading variant="h2" title="My movies" />
                    <button
                        onClick={() => changeView("create")}
                        className="size-8 hover:opacity-70"
                    >
                        <Image
                            src="/plus.svg"
                            alt="plus"
                            width={26}
                            height={26}
                        />
                    </button>
                </div>
                <button className="flex items-center gap-3 hover:opacity-70">
                    <span className="text-base font-bold">Logout</span>
                    <Image
                        src="/logout.svg"
                        alt="logout"
                        width={26}
                        height={26}
                    />
                </button>
            </div>
            <div className="mb-[109px] grid w-full grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <Pagination />
        </section>
    );
};
