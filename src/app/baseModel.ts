import { SerializedError } from "@reduxjs/toolkit";
import { ApiState } from "./epicActions";

export interface BaseApiState<T> {
    byIds: { [key: string]: T } | null
    allIds: number[] | null,
    loading: ApiState.IDLE | ApiState.PENDING | ApiState.FAILED | ApiState.SUCCEEDED,
    error: SerializedError | null
}