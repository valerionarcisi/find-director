export type MovieOverview = {
    genre_dds: number[],
    id: number,
    media_type: string,
    original_language: string,
    original_title: string
    overview: string
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    vote_count: number
}

export type Person = {
    id: number,
    known_for_department: string,
    name: string,
    popularity: number,
    profile_path: string,
    know_for: MovieOverview[]
}