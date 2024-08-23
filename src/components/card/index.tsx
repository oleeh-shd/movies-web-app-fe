import Image from "next/image";

import { FC } from "react";

import { Movie } from "@/api/get-movie-list";

type CardProps = Movie & {
    onClick: () => void;
};

export const Card: FC<CardProps> = ({
    title,
    publishingYear,
    poster,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className="flex min-w-[180px] cursor-pointer flex-col items-center rounded-xl bg-card text-white hover:scale-[1.01] md:min-w-[282px] md:p-2"
        >
            <Image
                src={poster || "movie.png"}
                alt="movie"
                width={366}
                height={400}
                className="mb-4 max-h-[246px] min-h-[246px] rounded-xl object-cover md:max-h-[400px] md:min-h-[400px]"
            />
            <div className="flex w-full flex-col items-start gap-2 pb-4 pl-4 md:pb-4 md:pl-4">
                <span className="text-xl font-medium leading-8">{title}</span>
                <span className="text-sm font-normal">{publishingYear}</span>
            </div>
        </div>
    );
};
