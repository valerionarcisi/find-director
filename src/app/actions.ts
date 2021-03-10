import { AnyAction, PayloadAction, SerializedError } from "@reduxjs/toolkit";

export interface FailedAction extends PayloadAction {
    error: SerializedError
}

export function isFailedAction(action: AnyAction): action is FailedAction {
    return action.type.endsWith('failed')
}