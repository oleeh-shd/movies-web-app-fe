import Link from "next/link";

import { AuthForm } from "@/components/auth-form";
import { Heading } from "@/components/heading";

const SignIn = () => {
    return (
        <section className="my-auto flex size-full w-full flex-col items-center justify-center gap-6">
            <Heading variant="h1" title="Sign in" />
            <AuthForm action="sign-in" />

            <span className="text-sm text-white">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up">
                    <span className="font-semibold underline underline-offset-2">
                        Sign-up
                    </span>
                </Link>
            </span>
        </section>
    );
};

export default SignIn;
