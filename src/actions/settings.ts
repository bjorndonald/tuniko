import Setting from "@/types/setting"

export const postCorpusSuggestions = async (email: string, value: "None" | "Hourly" | "Daily" | "Weekly") => {
    const res = await fetch(process.env.SERVER_URI + "/settings/update", {
        method: "POST",
        body: JSON.stringify({
            email,
            value
        })
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).list
}

export const getUpdateSetting = async (email: string) => {
    const res = await fetch(process.env.SERVER_URI + `/settings/update/${email}`)
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).setting as string
}

export const postUpdateSetting = async (email: string, value: string) => {
    const res = await fetch(process.env.SERVER_URI + "/settings/update", {
        method: "POST",
        body: JSON.stringify({
            email,
            value
        })
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).setting as string
}

export const getLanguageSettings = async (email: string, page: number) => {
    const res = await fetch(process.env.SERVER_URI + `/settings/language/${email}?page=${page}&limit=6`)
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).settings as Setting[]
}

export const isValueTracked = async (id: string, email: string, value: string) => {
    const res = await fetch(process.env.SERVER_URI + `/settings/tracked`, {
        method: "POST",
        body: JSON.stringify({
            id, email, value
        })
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).isTracked as boolean
}

export const getSettings = async (email: string, page: number) => {
    const res = await fetch(process.env.SERVER_URI + `/settings/${email}?page=${page}&limit=6`)
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).settings as Setting[]
}

export const getCorpusSettings = async (email: string, page: number) => {
    const res = await fetch(process.env.SERVER_URI + `/settings/corpus/${email}?page=${page}&limit=6`)
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).settings as Setting[]
}

export const getTranslationSettings = async (email: string, page: number) => {
    const res = await fetch(process.env.SERVER_URI + `/settings/translation/${email}?page=${page}&limit=6`)
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).settings as Setting[]
}



export const postSetting = async (email: string, value: string, settings:Setting[]) => {
    const res = await fetch(process.env.SERVER_URI + "/settings", {
        method: "POST",
        body: JSON.stringify({
            email,
            value,
            settings
        })
    })
    if (!res.ok) {
        throw new Error("Failed to post data")
    }

    return 
}

