import CorpusText from "@/types/corpustext"
import Translation from "@/types/translation"

export const getTranslationsByCorpusId = async (corpusid: string, page: number = 1, sortBy: string = "", search: string = "") => {
    const res = await fetch(process.env.SERVER_URI + "/translations/" + corpusid + `?page=${page}&limit=5&sort_by=${sortBy}&search=${search}`, {
        cache: "no-cache",
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).translations
}

export const getTranslationById = async (id: string) => {
    const res = await fetch(process.env.SERVER_URI + "/translation/" + id, {
        cache: "no-cache",
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).translation as Translation
}

export const getTranslationsByUser = async (email: string, page: number = 1,  search: string = "") => {
    const res = await fetch(process.env.SERVER_URI + "/translations/user/" + email + `?page=${page}&limit=5&search=${search}`, {
        cache: "no-cache",
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).translations as {corpustext: CorpusText, translation: Translation, id: string}[]
}

export const TranslationIsChosen = async (tid: string) => {
    const res = await fetch(process.env.SERVER_URI + "/translation/" + tid+ "/chosen", {
        cache: "no-cache",
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).chosen as Translation
}

export const getVoteOfTranslation = async (tId: string, email: string) => {
    const res = await fetch(process.env.SERVER_URI + "/translation/" + tId+ "/votes", {
        method: "POST",
        body: JSON.stringify({
            email,
        })
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).vote
}