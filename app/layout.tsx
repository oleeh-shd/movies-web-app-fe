"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import "../src/styles/globals.css";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";

import { cn } from "@/utils/tailwind";

import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "@/zustand/authStore";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuth, checkLogin, loading: authLoading } = useAuthStore();

    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (!authLoading && !isAuth && pathname === "/") {
            router.push("/sign-in");
        }

        if (!authLoading && isAuth) {
            router.push("/");
        }
    }, [authLoading, isAuth]);

    return (
        <html lang="en">
            <body
                className={cn(
                    montserrat.className,
                    "relative min-h-screen bg-main flex justify-center"
                )}
            >
                <div className="w-full px-6 py-20 lg:w-[1440px] xl:p-[120px]">
                    {children}
                </div>
                <Image
                    src="waves.svg"
                    alt="waves"
                    width={1920}
                    height={111}
                    className="absolute bottom-0 left-0"
                />
                <ToastContainer />
            </body>
        </html>
    );
}
