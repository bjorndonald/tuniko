export const getUserScore = async (email: string) => {
    const res = await fetch(process.env.SERVER_URI + `/users/${email}/score`, {
        cache: "reload"
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).score
}