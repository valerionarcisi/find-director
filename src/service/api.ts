import { normalize, schema } from "normalizr";
import { Movie } from "../containers/DirectorContainer/model";
import { Person } from "../containers/SearchContainer/model";
import { of, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';
import { PersonSucceededPayload } from "../containers/SearchContainer/slice";
import { DirectorSucceeededPayload } from "../containers/DirectorContainer/slice";

export const API_KEY = 'a90d99d87d52ef1f55e06af62b50fadc';
export const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';
export const BASE_URL = 'https://api.themoviedb.org/';
export const VERSION = '3';

const SCHEMA_FEATURE_KEY = 'person';

export const searchPerson = (query: string, page = 1): string => `${BASE_URL}${VERSION}/search/person?api_key=${API_KEY}&query=${query}&page=${page}`

export const ajaxApiPerson = (person: string): Observable<PersonSucceededPayload> => {
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
        }),
        catchError(error => {
            return of(error);
        })
    )
}

export const searchPersonDetail = (id: string): string => `${BASE_URL}${VERSION}/person/${id}/combined_credits?api_key=${API_KEY}`
const SCHEMA_DETAIL_FEATURE_KEY = 'personDetail';

export const ajaxApiPersonDetail = (id: string): Observable<DirectorSucceeededPayload> => {
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
        }),
        catchError(error => {
            return of(error);
        })
    )
}