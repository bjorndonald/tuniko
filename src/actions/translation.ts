export const getTranslationsByCorpusId = async (corpusid: string) => {
    const res = await fetch(process.env.SERVER_URI + '/translations/' + corpusid)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return (await res.json()).translations
}

export const getVoteOfTranslation = async (tId: string, email: string) => {
    const res = await fetch(process.env.SERVER_URI + '/translation/' + tId+ "/votes", {
        method: "POST",
        body: JSON.stringify({
            email,
        })
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return (await res.json()).vote
}