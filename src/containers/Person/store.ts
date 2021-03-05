import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'

export type MovieOverview = {
    adult: false,
    genreIds: number[],
    id: number,
    mediaType: string,
    originalLanguage: string,
    originalTitle: string
    overview: string
    posterPath: string,
    releaseDate: string,
    title: string,
    voteAverage: number,
    voteCount: number
}

export type Person = {
    adult: boolean
    gender: number
    id: number
    knowFor: MovieOverview[]
    knownForDepartment: string,
    name: string,
    popularity: number,
    profilePath: string
}

export interface IPersonState {
    data: Person | null,
    searched: string | null,
    isLoading: boolean,
    errorMsg: string | null
}

export const initialState: IPersonState = {
    data: null,
    searched: null,
    isLoading: false,
    errorMsg: null
}

export const featureKey = 'person'

export enum PersonActionsType {
    SET_FIND = 'person/set/searched',
    RESET_FIND = 'person/reset/searched',
    FETCH_SUCCESS = 'person/api/fetch/success',
    FETCH_PENDING = 'person/api/fetch/pending',
    FETCH_FAILED = 'person/api/fetch/failed',
}

export const setFind = createAction<string>(PersonActionsType.SET_FIND)
export const resetFind = createAction(PersonActionsType.RESET_FIND)
export const success = createAction<Person>(PersonActionsType.FETCH_SUCCESS)
export const falied = createAction<string>(PersonActionsType.FETCH_FAILED)
export const pending = createAction(PersonActionsType.FETCH_PENDING)

// TODO: Refactor with createSlice factory method?
export default createReducer(initialState, (builder) => {
    builder
        .addCase(setFind, (state: IPersonState, { payload }: PayloadAction<string>) => ({ ...state, searched: payload }))
    builder
        .addCase(resetFind, (state: IPersonState) => ({ ...state, searched: initialState.searched }))
    builder
        .addCase(pending, (state: IPersonState) => ({ ...state, isLoading: true }))
    builder
        .addCase(falied, (state: IPersonState, { payload }: PayloadAction<string>) => ({ ...state, isLoading: false, errorMsg: payload }))
    builder
        .addCase(success, (state: IPersonState, { payload }: PayloadAction<Person>) => ({ ...state, isLoading: false, data: payload }))
})