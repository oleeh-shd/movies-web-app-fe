import { create } from "zustand";

import { AuthBody, signIn, signUp } from "@/api/auth";
import { api } from "@/api/axios";

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
};

type Actions = {
    signIn: (body: AuthBody) => Promise<void>;
    signUp: (body: AuthBody) => Promise<void>;
    logout: () => void;
    checkLogin: () => Promise<void>;
};

type AuthStore = Store & Actions;

const initialState: Store = {
    user: { id: null, email: "", createdAt: "", updatedAt: "" },
    isAuth: false,
    loading: false,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
    ...initialState,
    signIn: async (body) => {
        try {
            set({ loading: true });

            const { accessToken, ...user } = await signIn(body);
            localStorage.setItem("token", accessToken);

            set({ user });
            set({ isAuth: true });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    signUp: async (body) => {
        try {
            set({ loading: true });

            const { accessToken, ...user } = await signUp(body);
            localStorage.setItem("token", accessToken);

            set({ user });
            set({ isAuth: true });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    logout: () => {
        set(initialState);
        localStorage.removeItem("token");
        set({ isAuth: false });
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
        }
    },
}));
