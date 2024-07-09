import Language from "@/types/language"

export const getLanguages = async (page: number = 1, search: string = "") => {
    const res = await fetch(process.env.SERVER_URI + `/languages?search=${search}&limit=10`, {
        cache: "no-cache"
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).languages as Language[]
}