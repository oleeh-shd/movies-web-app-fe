import Image from "next/image";

import { FC } from "react";

import { useAuthStore } from "@/zustand/authStore";

import { useViewStore } from "@/zustand/useViewStore";

import { Heading } from "../heading";

export const Header: FC = () => {
    const { logout } = useAuthStore();
    const { changeView } = useViewStore();

    return (
        <div className="mb-20 flex w-full items-center justify-between lg:mb-[100px]">
            <div className="flex items-center gap-3">
                <Heading variant="h2" title="My movies" />
                <button
                    onClick={() => changeView("create")}
                    className="size-8 hover:opacity-70"
                >
                    <Image src="/plus.svg" alt="plus" width={26} height={26} />
                </button>
            </div>
            <button
                onClick={logout}
                className="flex items-center gap-3 hover:opacity-70"
            >
                <span className="text-base font-bold">Logout</span>
                <Image src="/logout.svg" alt="logout" width={26} height={26} />
            </button>
        </div>
    );
};
