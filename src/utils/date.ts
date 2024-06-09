import moment from "moment"

export const getDifferenceFromDate = (date: string) => {
    const now = moment()
    const diff = now.diff(moment(date))

    if (diff > 86400000)
        return Math.ceil(diff / 86400000) + " days"
    else if (diff > 3600000)
        return Math.ceil(diff / 3600000) + " hours"
    else if(diff > 60000)
        return Math.ceil(diff/ 60000) + "m"
    else if(diff > 1000)
        return Math.ceil(diff / 1000)+"s"
    else return "1s"
}