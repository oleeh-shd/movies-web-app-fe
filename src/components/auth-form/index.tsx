"use client";

import { useRouter } from "next/navigation";

import { FC, useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

import { CustomError } from "@/api/axios";
import { useAuthStore } from "@/zustand/authStore";

import { Button } from "../button";
import { Input } from "../input";
import { Loader } from "../loader";

type FormInputs = {
    email: string;
    password: string;
};

const validationSchema = yup.object({
    email: yup
        .string()
        .trim()
        .email("Invalid email")
        .required("Please enter your email"),
    password: yup
        .string()
        .trim()
        .min(8, "Should contain at least 8 characters")
        .required("Please enter your password"),
});

type ActionType = "sign-in" | "sign-up";

type AuthFormProps = {
    action: ActionType;
};

export const AuthForm: FC<AuthFormProps> = ({ action }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const router = useRouter();

    const [error, setError] = useState("");

    const { signIn, signUp, loading } = useAuthStore();

    const onSubmit = async ({ email, password }: FormInputs) => {
        try {
            if (action === "sign-in") {
                await signIn({ email, password });
            }

            if (action === "sign-up") {
                await signUp({ email, password });
            }

            setError("");
            router.push("/");
        } catch (error) {
            console.log(error, "error");
            setError((error as CustomError).response?.data.message);
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6 md:w-[300px] "
        >
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <div className="relative flex flex-col gap-1">
                        <Input
                            {...field}
                            error={!!errors["email"]}
                            type="text"
                            id="login"
                            placeholder="Login"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => (
                                <span className="ml-3 text-sm text-red-500">
                                    {message}
                                </span>
                            )}
                        />
                    </div>
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <div className="relative flex flex-col gap-1">
                        <Input
                            {...field}
                            error={!!errors["password"]}
                            type="password"
                            id="password"
                            placeholder="Password"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ message }) => (
                                <span className="ml-3 text-sm text-red-500">
                                    {message}
                                </span>
                            )}
                        />
                    </div>
                )}
            />

            {error ? (
                <span className="ml-3 text-sm text-red-500">{error}</span>
            ) : null}

            {/* <div className="mx-auto">
                <Checkbox />
            </div> */}
            <Button
                type="submit"
                variant="contained"
                text={
                    loading ? (
                        <Loader size="small" />
                    ) : action === "sign-in" ? (
                        "Login"
                    ) : (
                        "Register"
                    )
                }
            />
        </form>
    );
};
