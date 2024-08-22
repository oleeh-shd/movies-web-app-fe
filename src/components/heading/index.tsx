import { createElement, FC } from "react";

import { cn } from "@/utils/tailwind";

type Variant = "h1" | "h2";

type Props = {
    title: string;
    variant: Variant;
    classes?: string;
};

const variants: Record<Variant, string> = {
    h1: "text-center font-semibold text-white text-[48px] leading-[56px] md:text-[64px] md:leading-[80px]",
    h2: "text-center font-semibold text-white text-[32px] leading-10 md:text-[48px] md:leading-[56px]",
};

export const Heading: FC<Props> = ({ title, variant, classes }) => {
    return createElement(
        variant,
        {
            className: `${cn(variants[variant], classes)}`,
        },
        title
    );
};
