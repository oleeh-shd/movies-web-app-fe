import { create } from "zustand";

import { AuthBody, signIn, signUp } from "@/api/auth";
import { api, CustomError } from "@/api/axios";

type User = {
    id: number | null;
    email: string;
    createdAt: string;
    updatedAt: string;
};

type Store = {
    user: User;
    isAuth: boolean;
    loading: boolean;
    error: string;
};

type Actions = {
    signIn: (body: AuthBody, callback: () => void) => Promise<void>;
    signUp: (body: AuthBody, callback: () => void) => Promise<void>;
    logout: () => void;
    checkLogin: () => Promise<void>;
};

type AuthStore = Store & Actions;

const initialState: Store = {
    user: { id: null, email: "", createdAt: "", updatedAt: "" },
    isAuth: false,
    loading: true,
    error: "",
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    ...initialState,
    signIn: async (body, callback) => {
        try {
            set({ loading: true });

            const { accessToken, ...user } = await signIn(body);
            localStorage.setItem("token", accessToken);

            set({ user });
            set({ isAuth: true });
            callback();
        } catch (error) {
            set({ error: (error as CustomError).response.data.message });
        } finally {
            set({ loading: false });
        }
    },
    signUp: async (body, callback) => {
        try {
            set({ loading: true });

            const { accessToken, ...user } = await signUp(body);
            localStorage.setItem("token", accessToken);

            set({ user });
            set({ isAuth: true });
            callback();
        } catch (error) {
            set({ error: (error as CustomError).response.data.message });
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        set({ ...initialState, loading: false });
        localStorage.removeItem("token");
    },
    checkLogin: async () => {
        const logout = get().logout;

        try {
            const {
                data: { userId },
            } = await api.get<{ userId: number }>("/auth/me");

            if (userId) {
                set({ isAuth: true });
            } else {
                logout();
            }
        } catch (error) {
            logout();
        } finally {
            set({ loading: false });
        }
    },
}));
