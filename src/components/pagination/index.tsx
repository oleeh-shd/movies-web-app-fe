"use client";

import { FC } from "react";

import { cn } from "@/utils/tailwind";

export const Pagination: FC = () => {
    return (
        <div className="flex items-center gap-4 text-base font-bold text-white">
            <span className="cursor-pointer">Prev</span>
            <div className="flex gap-2">
                {[1, 2, 3].map((page) => (
                    <Toggler
                        key={page}
                        page={page}
                        active={page === 1}
                        onClick={() => {}}
                    />
                ))}
            </div>
            <span className="cursor-pointer">Next</span>
        </div>
    );
};

type TogglerProps = {
    page: number;
    active: boolean;
    onClick: () => void;
};

const Toggler: FC<TogglerProps> = ({ page, active, onClick }) => {
    return (
        <button
            className={cn(
                "flex items-center justify-center size-8 rounded",
                active
                    ? "bg-primary pointer-events-none"
                    : "bg-card hover:bg-input"
            )}
            onClick={onClick}
        >
            {page}
        </button>
    );
};
