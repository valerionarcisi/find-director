import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseApiState } from "../../app/baseModel";
import { ApiState, FailedAction, isFailedAction } from "../../app/epicActions";
import { Movie } from "./model";

export interface IDirectorState extends BaseApiState<Movie> {}

export type DirectorSucceeededPayload = Pick<IDirectorState, 'allIds' | 'byIds'>

export const initialState: IDirectorState = {
    byIds: null,
    allIds: null,
    loading: ApiState.IDLE,
    error: null
}

export enum DirectorActionsType {
    FETCH_START = 'director/api/fetch/start',
    FETCH_SUCCEEDED = 'director/api/fetch/success',
    FETCH_PENDING = 'director/api/fetch/pending',
    FETCH_FAILED = 'director/api/fetch/failed',
}

export type FetchDirectorPayload = {
    id: string
}

export const start = createAction<FetchDirectorPayload>(DirectorActionsType.FETCH_START)
export const succeeded = createAction<DirectorSucceeededPayload>(DirectorActionsType.FETCH_SUCCEEDED)
export const falied = createAction<FailedAction>(DirectorActionsType.FETCH_FAILED)
export const pending = createAction(DirectorActionsType.FETCH_PENDING)

const directorSlice = createSlice({
    name: 'director',
    initialState,
    reducers: {},
    extraReducers: (builder)=>
        builder
            .addCase(pending, (state: IDirectorState) => { state.loading = ApiState.PENDING })
            .addCase(succeeded, (state: IDirectorState, { payload }: PayloadAction<DirectorSucceeededPayload>) => {
                state.loading = ApiState.SUCCEEDED
                state.allIds = payload.allIds
                state.byIds = payload.byIds
                state.error = {
                    ...initialState.error
                }
            })
            .addMatcher(isFailedAction, (state: IDirectorState, { payload }: FailedAction) => {
                state.loading = ApiState.FAILED
                state.error = {
                    name: payload.name,
                    code: payload.code,
                    message: payload.message,
                    stack: payload.stack,
                }
            })
})

export const {name: featureKey} = directorSlice;
export default directorSlice.reducer;