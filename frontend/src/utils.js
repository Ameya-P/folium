export function namesListToJSON(names) {
    const data = []
    for (const name of names) {
        data.push({common_name: name})
    }

    return JSON.stringify(data)
}