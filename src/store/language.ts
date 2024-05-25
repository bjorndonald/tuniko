import { ENGLISH_LANGUAGE_ID } from "@/constants/languages";
import Language from "@/types/language";
import create from "zustand";

interface ILanguageState {
    languageFrom: number,
    languageTo: number,
    isEditing: boolean,
    corpus: string,
    translation: string
    setCorpus: (str: string) => void
    setTranslation: (str: string) => void
    setIsEditing: (bool: boolean) => void
    setLanguageTo: (id: number) => void
    setLanguageFrom: (id: number) => void
    reset: () => void
    swap: () => void
}
const useLanguageStore = create<ILanguageState>((set, get) => ({
    languageFrom: 0,
    languageTo: 0,
    isEditing: false,
    corpus: "",
    translation: "",
    setCorpus(str) {
        set({
            corpus: str
        })
    },
    setTranslation(str) {
        set({
            translation: str
        })
    },
    setIsEditing: (bool: boolean) => {
        set({
            isEditing: bool
        })
    },
    setLanguageTo: (id: number) => {
        set({
            languageTo: id,
            languageFrom: ENGLISH_LANGUAGE_ID
        })
    },
    setLanguageFrom: (id: number) => {
        set({
            languageTo: ENGLISH_LANGUAGE_ID,
            languageFrom: id
        })
     },
    swap: () => set(state => ({
        languageFrom: state.languageTo,
        languageTo: state.languageFrom,
    })),
    reset: () => set({
        languageTo: ENGLISH_LANGUAGE_ID,
    })
}));

export default useLanguageStore;