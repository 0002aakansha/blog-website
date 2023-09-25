const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thrus', 'Fri', 'Sat']

export function convertdate(data: string) {
    const date = new Date(data)
    return `${weekDay[date.getDay()]} ${date.getDate()}, ${date.getFullYear()}`
}