"use client";

import { FC } from "react";

import { cn } from "@/utils/tailwind";
import { PAGE_LIMIT, useMovieStore } from "@/zustand/useMovieStore";

export const Pagination: FC = () => {
    const { totalMovies, currentPage, setCurrentPage } = useMovieStore();
    return (
        <div className="flex items-center gap-4 text-base font-bold text-white">
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <span className="cursor-pointer">Prev</span>
            </button>

            <div className="flex gap-2">
                {Array.from(
                    { length: Math.ceil(totalMovies / PAGE_LIMIT) },
                    (_, index) => index + 1
                ).map((page) => (
                    <Toggler
                        key={page}
                        page={page}
                        active={currentPage === page}
                        disabled={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                    />
                ))}
            </div>
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalMovies}
            >
                <span className="cursor-pointer">Next</span>
            </button>
        </div>
    );
};

type TogglerProps = {
    page: number;
    active: boolean;
    onClick: () => void;
    disabled?: boolean;
};

const Toggler: FC<TogglerProps> = ({ page, active, onClick, disabled }) => {
    return (
        <button
            className={cn(
                "flex items-center justify-center size-8 rounded",
                active
                    ? "bg-primary pointer-events-none"
                    : "bg-card hover:bg-input"
            )}
            disabled={disabled}
            onClick={onClick}
        >
            {page}
        </button>
    );
};
