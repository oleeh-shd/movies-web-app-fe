import Image from "next/image";

import { FC, useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { FileUploader } from "react-drag-drop-files";

import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { cn } from "@/utils/tailwind";

import { HomePageView } from "../../../app/page";

const fileTypes = ["JPG", "PNG"];

const validationSchema = yup.object().shape({
    title: yup.string().required("Please enter your movie title"),
    year: yup.string().required("Please enter your movie publishing year"),
    image: yup
        .mixed()
        .required("File is required")
        .test("fileSize", "File size is too large", (value) => {
            if (!value) return true;

            return (value as File).size <= 2000000; // 2MB size limit
        })
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true;

            return ["image/jpeg", "image/png"].includes((value as File).type);
        }),
});

type FormInputs = {
    title: string;
    year: string;
    image: File;
};

type CreateMovieProps = {
    changeView: (view: HomePageView) => void;
};

export const CreateMovie: FC<CreateMovieProps> = ({ changeView }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // @ts-expect-error
        resolver: yupResolver<FormInputs>(validationSchema),
    });
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (file: File) => {
        setFile(file);
    };

    const onSubmit = ({ title, year, image }: FormInputs) => {
        const formData = new FormData();

        formData.append("preview", image);
        formData.append("title", title);
        formData.append("year", year);
    };

    return (
        <div className="mb-[89px] flex flex-col items-start">
            <div>
                <Heading
                    variant="h2"
                    title="Create a new movie"
                    classes="mb-20 lg:mb-[120px] text-left!"
                />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col-reverse items-center gap-6 lg:flex-row lg:items-start lg:gap-[127px]"
            >
                <div className="mt-4 grid w-full grid-cols-2 gap-4 lg:hidden">
                    <Button
                        variant="outlined"
                        text="Cancel"
                        onClick={() => changeView("filled")}
                    />
                    <Button variant="contained" text="Submit" />
                </div>
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                        <div
                            className={cn(
                                "h-[372px] lg:h-[504px] w-full lg:w-[473px] cursor-pointer rounded-[10px] border border-dashed bg-input hover:bg-input/50",
                                !!errors["image"] ? "border-red-500" : ""
                            )}
                        >
                            <FileUploader
                                {...field}
                                handleChange={(file: File) => {
                                    handleChange(file);
                                    field.onChange(file);
                                }}
                                name="image"
                                types={fileTypes}
                                hoverTitle=" "
                            >
                                <div className="flex size-full cursor-pointer flex-col items-center justify-center gap-3">
                                    <Image
                                        src="/download.svg"
                                        alt="download"
                                        width={24}
                                        height={24}
                                    />
                                    <span>
                                        {file
                                            ? file.name
                                            : "Drop an image here"}
                                    </span>
                                </div>
                            </FileUploader>
                            <ErrorMessage
                                errors={errors}
                                name="image"
                                render={({ message }) => (
                                    <span className="ml-3 text-sm text-red-500">
                                        {message}
                                    </span>
                                )}
                            />
                        </div>
                    )}
                />

                <div className="flex w-full flex-col gap-16 lg:w-[362px]">
                    <div className="flex flex-col gap-6">
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <div className="relative flex flex-col gap-1">
                                    <Input {...field} placeholder="Title" />
                                    <ErrorMessage
                                        errors={errors}
                                        name="title"
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
                            name="year"
                            control={control}
                            render={({ field }) => (
                                <div className="relative flex flex-col gap-1">
                                    <Input
                                        {...field}
                                        placeholder="Publishing year"
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="year"
                                        render={({ message }) => (
                                            <span className="ml-3 text-sm text-red-500">
                                                {message}
                                            </span>
                                        )}
                                    />
                                </div>
                            )}
                        />
                    </div>
                    <div className="hidden w-full grid-cols-2 gap-4 lg:grid">
                        <Button
                            variant="outlined"
                            text="Cancel"
                            onClick={() => changeView("filled")}
                        />
                        <Button variant="contained" text="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};
