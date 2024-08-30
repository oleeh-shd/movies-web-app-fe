import { FC } from "react";

export const HeaderSkeleton: FC = () => (
    <div className="mb-20 flex h-14 w-full items-center justify-between lg:mb-[100px]">
        <div className="h-full w-[310px] animate-pulse rounded-md bg-gray-300" />
        <div className="h-full w-[100px] animate-pulse rounded-md bg-gray-300 " />
    </div>
);
