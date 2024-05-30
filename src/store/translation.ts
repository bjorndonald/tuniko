import Translation from "@/types/translation";
import { create } from "zustand";

interface ITranslationState {
    list: Translation[],
    setList: (t: Translation[]) => void
    addToList: (t: Translation) => void
}
const useTranslationStore = create<ITranslationState>((set) => ({
    list: [],
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