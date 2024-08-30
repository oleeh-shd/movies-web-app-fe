import { FC } from "react";

export const CardSkeleton: FC = () => {
    return (
        <div className="flex min-w-[180px] flex-col items-center rounded-xl bg-card md:min-w-[282px] md:p-2">
            <div className="mb-4 flex max-h-[246px] min-h-[246px] w-full animate-pulse items-center justify-center rounded-xl bg-gray-300 md:max-h-[400px] md:min-h-[400px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-12 text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
            </div>
            <div className="flex w-full flex-col items-start gap-2 pb-4  md:pb-4 ">
                <div className="h-8 w-full animate-pulse rounded-md bg-gray-300" />
                <div className="h-5 w-full animate-pulse rounded-md bg-gray-300" />
            </div>
        </div>
    );
};
