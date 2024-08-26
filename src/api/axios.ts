import axios from "axios";

import { AuthResponse } from "./auth";

export type CustomError = {
    response: {
        data: {
            message: string;
        };
    };
};

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<
                    Pick<AuthResponse, "accessToken" | "refreshToken">
                >(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem("token", response.data.accessToken);
                return api.request(originalRequest);
            } catch (e) {
                console.log("Unauthorize");
            }
        }
        throw error;
    }
);
