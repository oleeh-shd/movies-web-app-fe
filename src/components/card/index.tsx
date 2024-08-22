import Image from "next/image";

import { FC } from "react";

export const Card: FC = () => {
    return (
        <div className="flex min-w-[282px] cursor-pointer flex-col items-center rounded-xl bg-card text-white hover:scale-[1.01] md:p-2">
            <Image
                src="/movie.png"
                alt="movie"
                width={266}
                height={400}
                className="mb-4 rounded-xl"
            />
            <div className="flex w-full flex-col items-start gap-2 pl-2">
                <span className="text-xl font-medium leading-8">Movie 1</span>
                <span className="text-sm font-normal">2021</span>
            </div>
        </div>
    );
};
