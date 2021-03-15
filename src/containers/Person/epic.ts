
import { Epic, ofType } from "redux-observable";
import { from, of, concat } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { succeeded, pending, falied, PersonActionsType } from "./slice";
import * as api from '../../service/api'

export const fetchPerson: Epic = (actions$) =>
    actions$.pipe(
        ofType(PersonActionsType.SET_FIND),
        switchMap(({ payload }) =>
            concat(
                of(pending()),
                from(api.fetchPerson(payload)).pipe(
                    map(succeeded),
                    catchError((error) => of(falied(error)))
                ),
            )
        ),
    )
