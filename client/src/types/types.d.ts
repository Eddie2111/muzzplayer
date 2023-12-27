interface ISongsProps{
    id?: string
    title: string
    genre?: string
    artist: string
    song: string
    albumImage?: string
}
interface ResponseProps{
    data?: {
        method: string,
        data?: {
            songs: ISongsProps[]
            genres: string[]
            artists: string[]
        }
        songs?: ISongsProps[]
        genres?: string[]
        artists?: string[]
        status: number
    }
}

export {
    ISongsProps,
    ResponseProps
}