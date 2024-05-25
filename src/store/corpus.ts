import create from "zustand";

interface ICorpusState {
    selected: string[],
    addSelected: (str: string) => void
    removeSelection: (str: string) => void
    resetSelections: () => void
}
const useCorpus = create<ICorpusState>((set) => ({
    selected: [],
    addSelected: (str) => set(state => ({ selected: [...state.selected, str], })),
    removeSelection: (str) => set(state => ({ selected: [...state.selected.filter(x => x !== str)], })),
    resetSelections: () => set(() => ({ selected: [] }))
}));

export default useCorpus;