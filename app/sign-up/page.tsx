import Link from "next/link";

import { AuthForm } from "@/components/auth-form";
import { Heading } from "@/components/heading";

const SignUp = () => {
    return (
        <section className="my-auto flex size-full w-full flex-col items-center justify-center gap-6">
            <Heading variant="h1" title="Sign up" />
            <AuthForm action="sign-up" />
            <span className="text-sm text-white">
                Back to{" "}
                <Link href="/sign-in">
                    <span className="font-semibold underline underline-offset-2">
                        Sign-in
                    </span>
                </Link>
            </span>
        </section>
    );
};

export default SignUp;
