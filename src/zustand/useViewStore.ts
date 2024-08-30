import { create } from "zustand";

export type HomePageView = "home" | "create" | "update";

type ViewStore = {
    view: HomePageView;
    changeView: (view: HomePageView) => void;
};

export const useViewStore = create<ViewStore>((set) => ({
    view: "home",
    changeView(view) {
        set({ view });
    },
}));
