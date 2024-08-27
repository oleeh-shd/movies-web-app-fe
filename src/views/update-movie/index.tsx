import Image from "next/image";

import { FC, useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";

import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import * as yup from "yup";

import { updateMovie } from "@/api/update-movie";
import { uploadPoster } from "@/api/upload-poster";
import { Button } from "@/components/button";
import { Heading } from "@/components/heading";

import { Input } from "@/components/input";
import { Loader } from "@/components/loader";
import { fileTypes, maxPublishingYear } from "@/utils/constants";
import { cn } from "@/utils/tailwind";

import { useMovieStore } from "@/zustand/useMovieStore";

import { useViewStore } from "@/zustand/useViewStore";

const validationSchema = yup.object().shape({
    title: yup.string(),
    publishingYear: yup
        .string()
        .matches(/^\d{4}$/, "Please enter valid year")
        .test(
            "max-value",
            `Max publishing year is ${maxPublishingYear}`,
            (value) => {
                return value ? parseInt(value, 10) <= maxPublishingYear : false;
            }
        ),
    posterId: yup.number(),
});

type FormInputs = {
    title: string;
    publishingYear: string;
    posterId: number;
};

export const UpdateMovie: FC = () => {
    const { changeView } = useViewStore();
    const { fetchMovies, movieToUpdate, currentPage } = useMovieStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver<Partial<FormInputs>>(validationSchema),
        defaultValues: {
            ...movieToUpdate,
            publishingYear: String(movieToUpdate.publishingYear),
        },
    });

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (file: File) => {
        try {
            setUploading(true);
            setFile(file);

            const { data } = await uploadPoster(file);
            return data.posterId;
        } catch (error) {
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async ({
        title,
        posterId,
        publishingYear,
    }: Partial<FormInputs>) => {
        try {
            const { data } = await updateMovie(movieToUpdate.id, {
                title: title ? title : undefined,
                posterId: posterId ? Number(posterId) : undefined,
                publishingYear: publishingYear
                    ? Number(publishingYear)
                    : undefined,
            });

            await fetchMovies(currentPage);

            toast.success(data.message);

            setFile(null);
            reset();
            changeView("home");
        } catch (error) {
            toast.error("Updating failed");
        }
    };

    return (
        <div className="mb-[89px] flex flex-col items-start">
            <div>
                <Heading
                    variant="h2"
                    title="Update movie"
                    classes="mb-20 lg:mb-[100px] text-left!"
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
                        onClick={() => changeView("home")}
                    />
                    <Button variant="contained" text="Submit" />
                </div>
                <Controller
                    name="posterId"
                    control={control}
                    render={({ field }) => (
                        <div
                            className={cn(
                                "h-[372px] lg:h-[504px] w-full lg:w-[473px] cursor-pointer rounded-[10px] border border-dashed bg-input hover:bg-input/50",
                                !!errors["posterId"] ? "border-red-500" : ""
                            )}
                        >
                            <FileUploader
                                {...field}
                                handleChange={async (file: File) => {
                                    const posterId = await handleUpload(file);
                                    field.onChange(String(posterId));
                                }}
                                types={fileTypes}
                                hoverTitle=" "
                                maxSize={2}
                            >
                                <div className="flex size-full cursor-pointer flex-col items-center justify-center gap-3">
                                    {uploading ? (
                                        <Loader />
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </div>
                            </FileUploader>
                            <ErrorMessage
                                errors={errors}
                                name="posterId"
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
                                    <Input
                                        {...field}
                                        placeholder="Title"
                                        error={!!errors["title"]}
                                    />
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
                            name="publishingYear"
                            control={control}
                            render={({ field }) => (
                                <div className="relative flex flex-col gap-1">
                                    <Input
                                        {...field}
                                        placeholder="Publishing year"
                                        error={!!errors["publishingYear"]}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="publishingYear"
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
                            onClick={() => changeView("home")}
                        />
                        <Button variant="contained" text="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};
