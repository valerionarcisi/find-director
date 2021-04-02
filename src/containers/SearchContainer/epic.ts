
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionsObservable, Epic, ofType } from "redux-observable";
import { of, concat } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { ajaxPerson } from "../../service/ajax";
import { succeeded, pending, falied, PersonActionsType } from "./slice";

export const fetchPerson: Epic = (actions$: ActionsObservable<PayloadAction<string>>) =>
    actions$.pipe(
        ofType(PersonActionsType.SET_FIND),
        switchMap(({ payload }) => concat(
            of(pending()),
            ajaxPerson(payload).pipe(
                map(succeeded),
                catchError((error) => of(falied(error)))
            )
        )
        )
    )
