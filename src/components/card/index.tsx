import Image from "next/image";

import { FC } from "react";

export const Card: FC = () => {
    return (
        <div className="flex min-w-[180px] cursor-pointer flex-col items-center rounded-xl bg-card text-white hover:scale-[1.01] md:min-w-[282px] md:p-2">
            <Image
                src="/movie.png"
                alt="movie"
                width={366}
                height={400}
                className="mb-4 max-h-[246px] rounded-xl object-cover md:max-h-[400px]"
            />
            <div className="flex w-full flex-col items-start gap-2 pb-4 pl-4 md:pb-4 md:pl-4">
                <span className="text-xl font-medium leading-8">Movie 1</span>
                <span className="text-sm font-normal">2021</span>
            </div>
        </div>
    );
};
