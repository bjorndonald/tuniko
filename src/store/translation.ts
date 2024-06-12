import Translation from "@/types/translation";
import { create } from "zustand";

interface ITranslationState {
    list: Translation[],
    chosen: string,
    resetChosen: () => void,
    setChosen: (str: string) => void
    setList: (t: Translation[]) => void
    addToList: (t: Translation) => void
}
const useTranslationStore = create<ITranslationState>((set) => ({
    list: [],
    chosen: "",
    resetChosen: () => set({ chosen: "" }),
    setChosen(str) {
        set({ chosen: str })
    },
    setList(t) {
        set({
            list: t
        })
    },
    addToList(t) {
        set(state =>({
            list: [...state.list, t]
        }))
    },
}));

export default useTranslationStore