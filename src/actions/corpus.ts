import { SortType } from "@/types/options"


export const getCorpusById = async (id: string) => {
    const res = await fetch(process.env.SERVER_URI + '/corpus/'+ id)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return (await res.json()).corpus
} 

export const getCorpus = async (page: number = 1, sort_by: string = "", search: string = "") => {
    const res = await fetch(process.env.SERVER_URI + `/corpus?page=${page}&limit=10&sort_by=${sort_by}&search=${search}`, {
        cache: "reload"
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return (await res.json()).list
}

export const getCorpusFile = async () => {
    const res = await fetch(process.env.SERVER_URI + '/download', {
        cache: "reload"
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return (await res.blob())
}

export const getChosen = async (corpusId: string) => {
    const res = await fetch(process.env.SERVER_URI + '/corpus/chosen/' + corpusId,{
       
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return (await res.json()).chosen
}

export const chooseTranslation = async (corpus: string, translation: string) => {
    const res = await fetch(process.env.SERVER_URI + `/corpus/chosen/${corpus}`, {
        method: "POST",
        body: JSON.stringify({
            translation,
        })
    })
    
    if (!res.ok) {
        throw new Error('Failed to post data')
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
        throw new Error('Failed to post data')
    }

    return (await res.json()).vote
}

