import { normalize, schema } from "normalizr";
import { ajax } from 'rxjs/ajax';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { searchPerson } from "../api"
import { PersonSucceededPayload } from "../../containers/SearchContainer/slice"
import { Person } from "../../containers/SearchContainer/model";

const SCHEMA_FEATURE_KEY = 'person';
interface ResultPersonService {
    page: number,
    total_pages: number,
    total_results: number,
    results: Person[]
}

const personAdatper = (data: ResultPersonService): PersonSucceededPayload => {
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
}

export const ajaxPerson = (person: string): Observable<PersonSucceededPayload> => {
    return ajax.getJSON<ResultPersonService>(searchPerson(person)).pipe(
        map(personAdatper)
    )
}