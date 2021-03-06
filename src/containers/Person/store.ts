import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'
import { ApiState } from '../../service/api.model'
import { Person } from './model'
export interface IPersonState {
    byIds: { [key: string]: Person } | null,
    allIds: number[],
    currentPage: number | null,
    totalPages: number | null,
    totalResults: number | null,
    searched: string | null,
    loading: ApiState.IDLE | ApiState.PENDING | ApiState.FAILED | ApiState.SUCCEEDED,
    errorMsg: string | null
}

export type PersonSucceededPayload = Partial<IPersonState>

export const initialState: IPersonState = {
    byIds: null,
    allIds: [],
    currentPage: null,
    totalPages: null,
    totalResults: null,
    searched: null,
    loading: ApiState.IDLE,
    errorMsg: null
}

export const featureKey = 'person'

export enum PersonActionsType {
    SET_FIND = 'person/set/searched',
    RESET_FIND = 'person/reset/searched',
    FETCH_SUCCEEDED = 'person/api/fetch/success',
    FETCH_PENDING = 'person/api/fetch/pending',
    FETCH_FAILED = 'person/api/fetch/failed',
}


export const setFind = createAction<string>(PersonActionsType.SET_FIND)
export const resetFind = createAction(PersonActionsType.RESET_FIND)
export const successded = createAction<PersonSucceededPayload>(PersonActionsType.FETCH_SUCCEEDED)
export const falied = createAction<string>(PersonActionsType.FETCH_FAILED)
export const pending = createAction(PersonActionsType.FETCH_PENDING)

// TODO: Refactor with createSlice factory method?
export default createReducer(initialState, (builder) => {
    builder
        .addCase(setFind, (state: IPersonState, { payload }: PayloadAction<string>) => ({ ...state, searched: payload }))
    builder
        .addCase(resetFind, (state: IPersonState) => ({ ...state, searched: initialState.searched }))
    builder
        .addCase(pending, (state: IPersonState) => ({ ...state, loading: ApiState.PENDING }))
    builder
        .addCase(falied, (state: IPersonState, { payload }: PayloadAction<string>) => ({ ...state, loading: ApiState.FAILED, errorMsg: payload }))
    builder
        .addCase(successded, (state: IPersonState, { payload }: PayloadAction<PersonSucceededPayload>) => ({ ...state, loading: ApiState.SUCCEEDED, ...payload }))
})