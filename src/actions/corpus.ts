import Translation from "@/types/translation"

export const getCorpusById = async (id: string) => {
    const res = await fetch(process.env.SERVER_URI + "/corpus/"+ id)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).corpus
} 

export const getCorpus = async (page: number = 1, sortBy: string = "", search: string = "", from: string = "All", to: string = "All", limit: number = 10) => {
    const res = await fetch(process.env.SERVER_URI + `/corpus?page=${page}&limit=${limit}&sort_by=${sortBy}&search=${search}&from=${from}&to=${to}`, {
        cache: "default",
        
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).list
}

export const postCorpusSuggestions = async (email: string, search: string) => {
    const res = await fetch(process.env.SERVER_URI + `/corpus/email`, {
        cache: "reload",
        method: "POST",
        body: JSON.stringify({
            email,
            search
        })
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).list
}

export const getCorpusFile = async () => {
    const res = await fetch(process.env.SERVER_URI + "/download", {
        cache: "reload"
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.blob())
}

export const getChosen = async (corpusId: string) => {
    const res = await fetch(process.env.SERVER_URI + "/corpus/chosen/" + corpusId,{
        cache: "reload"
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).chosen as Translation
}

export const chooseTranslation = async (corpus: string, translation: string) => {
    const res = await fetch(process.env.SERVER_URI + `/corpus/chosen/${corpus}`, {
        method: "POST",
        body: JSON.stringify({
            translation,
        })
    })
    
    if (!res.ok) {
        throw new Error("Failed to post data")
    }

    return (await res.json()).vote
}

export const unchooseTranslation = async (corpus: string, translation: string) => {
    const res = await fetch(process.env.SERVER_URI + `/corpus/unchoose/${corpus}`, {
        method: "POST",
        body: JSON.stringify({
            translation,
        })
    })

    if (!res.ok) {
        throw new Error("Failed to post data")
    }

    return (await res.json()).vote
}

