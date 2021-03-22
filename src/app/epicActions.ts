import { AnyAction, PayloadAction, SerializedError } from "@reduxjs/toolkit";

export enum ApiState {
    IDLE = 'idle',
    PENDING = 'pending',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

export type FailedAction = PayloadAction<SerializedError>

export function isFailedAction(action: AnyAction): action is FailedAction {
    return action.type.endsWith(ApiState.FAILED)
}