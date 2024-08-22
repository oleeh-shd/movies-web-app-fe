"use client";

import { FC } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Heading } from "../heading";
import { Input } from "../input";

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

export const SignInForm: FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async ({ email, password }: FormInputs) => {};
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6 md:w-[300px] "
        >
            <Heading variant="h1" title="Sign in" />
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

            <div className="mx-auto">
                <Checkbox />
            </div>
            <Button type="submit" variant="contained" text="Login" />
        </form>
    );
};
