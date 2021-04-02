import { normalize, schema } from "normalizr";
import { ajax } from 'rxjs/ajax';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Movie } from "../../containers/DirectorContainer/model";
import { DirectorSucceeededPayload } from "../../containers/DirectorContainer/slice";
import { searchPersonDetail } from "../api";

const SCHEMA_DETAIL_FEATURE_KEY = 'personDetail';
interface ResultPersonDetailService {
    crew: Movie[]
}

const personDetailAdapter = (data: ResultPersonDetailService): DirectorSucceeededPayload => {
   
    console.log(data)
   
    const normalized = normalize<
        any,
        {
            [SCHEMA_DETAIL_FEATURE_KEY]: { [key: string]: Movie }
        }
    >(data.crew, [new schema.Entity(SCHEMA_DETAIL_FEATURE_KEY)])
    
    return {
        byIds: normalized.entities[SCHEMA_DETAIL_FEATURE_KEY],
        allIds: normalized.result,
    }
}

export const ajaxPersonDetail = (id: string): Observable<DirectorSucceeededPayload> => {
    return ajax.getJSON<ResultPersonDetailService>(searchPersonDetail(id)).pipe(
        map(personDetailAdapter)
    )
}