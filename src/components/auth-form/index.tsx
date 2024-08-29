"use client";

import { useRouter } from "next/navigation";

import { FC, useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import * as yup from "yup";

import { AuthBody } from "@/api/auth";
import { useAuthStore } from "@/zustand/authStore";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { Loader } from "../loader";

type FormInputs = AuthBody;

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
    rememberMe: yup.boolean().default(false),
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
    const [loading, setLoading] = useState(false);

    const { signIn, signUp, error } = useAuthStore();

    const onSubmit = async (body: FormInputs) => {
        setLoading(true);
        try {
            if (action === "sign-in") {
                await signIn(body, () => router.push("/"));
            }

            if (action === "sign-up") {
                await signUp(body, () => router.push("/"));
            }
        } catch (error) {
            toast.error("Something wrong with server");
        } finally {
            setLoading(false);
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

            <Controller
                name="rememberMe"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div className="mx-auto">
                        <Checkbox checked={value} onChange={onChange} />
                    </div>
                )}
            />

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
