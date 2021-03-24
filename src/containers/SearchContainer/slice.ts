import { createAction, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { ApiState, FailedAction, isFailedAction } from '../../app/epicActions'
import { Person } from './model'

export interface IPersonState {
    byIds: { [key: string]: Person } | null
    allIds: number[] | null,
    currentPage: number | null,
    totalPages: number | null,
    totalResults: number | null,
    searched: string | null,
    loading: ApiState.IDLE | ApiState.PENDING | ApiState.FAILED | ApiState.SUCCEEDED,
    error: SerializedError | null
}

export type PersonSucceededPayload = Pick<IPersonState, 'allIds' | 'byIds' | 'currentPage' | 'totalPages' | 'totalResults'>

export const initialState: IPersonState = {
    byIds: null,
    allIds: null,
    currentPage: null,
    totalPages: null,
    totalResults: null,
    searched: null,
    loading: ApiState.IDLE,
    error: null
}


export enum PersonActionsType {
    SET_FIND = 'person/set/searched',
    RESET_FIND = 'person/reset/searched',
    FETCH_SUCCEEDED = 'person/api/fetch/success',
    FETCH_PENDING = 'person/api/fetch/pending',
    FETCH_FAILED = 'person/api/fetch/failed',
}


export const setFind = createAction<string>(PersonActionsType.SET_FIND)
export const resetFind = createAction(PersonActionsType.RESET_FIND)
export const succeeded = createAction<PersonSucceededPayload>(PersonActionsType.FETCH_SUCCEEDED)
export const falied = createAction<FailedAction>(PersonActionsType.FETCH_FAILED)
export const pending = createAction(PersonActionsType.FETCH_PENDING)

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(setFind, (state: IPersonState, { payload }: PayloadAction<string>) => { state.searched = payload })
            .addCase(resetFind, (state: IPersonState) => { state.searched = initialState.searched })
            .addCase(pending, (state: IPersonState) => { state.loading = ApiState.PENDING })
            .addCase(succeeded, (state: IPersonState, { payload }: PayloadAction<PersonSucceededPayload>) => {
                state.loading = ApiState.SUCCEEDED
                state.allIds = payload.allIds
                state.byIds = payload.byIds
                state.currentPage = payload.currentPage
                state.totalPages = payload.totalPages
                state.totalResults = payload.totalResults
                state.error = {
                    ...initialState.error
                }
            })
            .addMatcher(isFailedAction, (state: IPersonState, { payload }: FailedAction) => {
                state.loading = ApiState.FAILED
                state.error = {
                    name: payload.name,
                    code: payload.code,
                    message: payload.message,
                    stack: payload.stack,
                }
            })
})

export const { name: featureKey } = personSlice
export default personSlice.reducer