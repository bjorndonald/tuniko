import Setting from "@/types/setting"

export const postCorpusSuggestions = async (email: string, value: "None" | "Hourly" | "Daily" | "Weekly") => {
    const res = await fetch(process.env.SERVER_URI + `/settings/update`, {
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
    const res = await fetch(process.env.SERVER_URI + `/settings/update`, {
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

export const getSettings = async (email: string, page: number) => {
    const res = await fetch(process.env.SERVER_URI + `/settings/${email}?page=${page}&limit=6`)
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).settings as Setting[]
}