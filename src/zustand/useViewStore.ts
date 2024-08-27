import { create } from "zustand";

import { HomePageView } from "../../app/page";

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
