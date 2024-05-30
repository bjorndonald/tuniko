import { ENGLISH_LANGUAGE_ID } from "@/constants/strings";
import Language from "@/types/language";
import {create} from "zustand";
type EntryType = "Text" | "Document";
interface ILanguageState {
    languageFrom: string,
    languageTo: string,
    isEditing: boolean,
    corpus: string,
    translation: string
    entryType: EntryType
    setEntryType: (entry: EntryType) => void
    setCorpus: (str: string) => void
    setTranslation: (str: string) => void
    setIsEditing: (bool: boolean) => void
    setLanguageTo: (id: string) => void
    setLanguageFrom: (id: string) => void
    reset: () => void
    swap: () => void
}
const useLanguageStore = create<ILanguageState>((set, get) => ({
    languageFrom: "",
    languageTo: "",
    isEditing: false,
    corpus: "",
    translation: "",
    entryType: "Text",
    setEntryType: (entry: EntryType) => set({
        entryType: entry
    }),
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
    setLanguageTo: (id: string) => {
        set({
            languageTo: id,
            languageFrom: ENGLISH_LANGUAGE_ID
        })
    },
    setLanguageFrom: (id: string) => {
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