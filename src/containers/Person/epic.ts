
import { Epic, ofType } from "redux-observable";
import { switchMap, map, startWith, catchError, tap } from "rxjs/operators";
import { success, pending, falied, PersonActionsType } from "./store";
import { getPersonOverview } from '../../service/themoviedb'
import { from, of, concat } from "rxjs";
import axios from "axios";

export const fetchPerson: Epic = (actions$) =>
    actions$.pipe(
        tap(console.log),
        ofType(PersonActionsType.SET_FIND),
        switchMap(({ payload }) =>
            concat(
                of(pending()),
                from(axios.get(getPersonOverview(payload))).pipe(
                    map((res: any) => {
                        console.log(res)
                        return success(res.results)
                    }),
                    catchError((error) => of(falied(error.message)))
                ),
            )
        ),
    )


