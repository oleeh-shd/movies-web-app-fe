import { ButtonHTMLAttributes, FC } from "react";

import { cn } from "@/utils/tailwind";

type Variant = "contained" | "outlined";

type Props = {
    variant: Variant;
    text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<Variant, string> = {
    contained: "bg-primary hover:bg-opacity-70",
    outlined: "border border-white hover:bg-white hover:bg-opacity-10",
};

export const Button: FC<Props> = ({ type, variant, text, onClick }) => {
    return (
        <button
            type={type}
            className={cn(
                "py-4 px-[28px] rounded-[10px] text-base text-center font-bold text-white",
                variants[variant]
            )}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
