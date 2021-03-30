
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionsObservable, Epic, ofType } from "redux-observable";
import { of, concat } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { succeeded, pending, falied, DirectorActionsType, FetchDirectorPayload } from "./slice";
import { ajaxApiPersonDetail } from "../../service/api";

export const fetchDirector: Epic = (actions$: ActionsObservable<PayloadAction<FetchDirectorPayload>>) =>
    actions$.pipe(
        ofType(DirectorActionsType.FETCH_START),
        switchMap(({ payload }) => concat(
            of(pending()),
            ajaxApiPersonDetail(payload.id).pipe(
                map(succeeded),
                catchError((error) => of(falied(error)))
            )
        )
        )
    )
