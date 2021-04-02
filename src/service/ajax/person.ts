import { ajax } from 'rxjs/ajax';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { normalize, schema } from "normalizr";
import { searchPerson, searchPersonDetail } from "../api"
import { PersonSucceededPayload } from "../../containers/SearchContainer/slice"
import { Person } from "../../containers/SearchContainer/model";
import { DirectorSucceeededPayload } from '../../containers/DirectorContainer/slice';
import { Movie } from '../../containers/DirectorContainer/model';

const SCHEMA_FEATURE_KEY = 'person';

export const ajaxPerson = (person: string): Observable<PersonSucceededPayload> => {
    return ajax.getJSON<PersonSucceededPayload>(searchPerson(person)).pipe(
        map((data: any) => {
            const normalized = normalize<
                any,
                {
                    [SCHEMA_FEATURE_KEY]: { [key: string]: Person }
                }
            >(data.results, [new schema.Entity(SCHEMA_FEATURE_KEY)])

            return {
                byIds: normalized.entities[SCHEMA_FEATURE_KEY],
                allIds: normalized.result,
                currentPage: data.page,
                totalPages: data.total_pages,
                totalResults: data.total_results,
            }
        })
    )
}


const SCHEMA_DETAIL_FEATURE_KEY = 'personDetail';
export const ajaxPersonDetail = (id: string): Observable<DirectorSucceeededPayload> => {
    return ajax.getJSON<DirectorSucceeededPayload>(searchPersonDetail(id)).pipe(
        map((data: any) => {
            const normalized = normalize<
                any,
                {
                    [SCHEMA_DETAIL_FEATURE_KEY]: { [key: string]: Movie }
                }
            >(data.cast, [new schema.Entity(SCHEMA_DETAIL_FEATURE_KEY)])

            return {
                byIds: normalized.entities[SCHEMA_DETAIL_FEATURE_KEY],
                allIds: normalized.result,
            }
        })
    )
}