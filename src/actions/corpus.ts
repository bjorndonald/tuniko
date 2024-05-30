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

export const getCorpus = async () => {
    const res = await fetch(process.env.SERVER_URI + '/corpus', {
        
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return (await res.json()).list
}

export const getChosen = async (corpusId: string) => {
    const res = await fetch(process.env.SERVER_URI + '/corpus/chosen/' + corpusId,{
       
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return (await res.json()).chosen
}