
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionsObservable, Epic, ofType } from "redux-observable";
import { of, concat } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { succeeded, pending, falied, PersonActionsType } from "./slice";
import { ajaxApiPerson } from "../../service/api";

export const fetchPerson: Epic = (actions$: ActionsObservable<PayloadAction<string>>) =>
    actions$.pipe(
        ofType(PersonActionsType.SET_FIND),
        switchMap(({ payload }) => concat(
            of(pending()),
            ajaxApiPerson(payload).pipe(
                map(succeeded),
                catchError((error) => of(falied(error)))
            )
        )
        )
    )