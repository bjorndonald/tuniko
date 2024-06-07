import { create } from "zustand";

interface ICorpusState {
    selected: string[],
    shareModal: string | undefined
    showShareModal: (id: string)=> void
    addSelected: (str: string) => void
    removeSelection: (str: string) => void
    resetSelections: () => void
}
const useCorpus = create<ICorpusState>((set) => ({
    selected: [],
    shareModal: undefined,
    addSelected: (str) => set(state => ({ selected: [...state.selected, str], })),
    removeSelection: (str) => set(state => ({ selected: [...state.selected.filter(x => x !== str)], })),
    showShareModal(id) {
        set({
            shareModal: id
        })
    },
    resetSelections: () => set(() => ({ selected: [] }))
}));

export default useCorpus;