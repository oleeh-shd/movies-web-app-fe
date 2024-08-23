import { api } from "./axios";

type UploadPosterResponse = {
    posterId: number;
};

export const uploadPoster = async (poster: File) => {
    const formData = new FormData();

    formData.append("file", poster);

    return api.post<UploadPosterResponse>("movies/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
