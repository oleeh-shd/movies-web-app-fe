import { api } from "../axios";

export type AuthBody = {
    email: string;
    password: string;
};

type AuthResponse = {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    accessToken: string;
};

export const signUp = async (body: AuthBody) => {
    const { data } = await api.post<AuthResponse>("/auth/sign-up", body);
    return data;
};

export const signIn = async (body: AuthBody) => {
    const { data } = await api.post<AuthResponse>("/auth/sign-in", body);
    return data;
};
