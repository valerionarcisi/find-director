import axios from "axios";
import { normalize, schema } from "normalizr";
import { Person } from "../containers/Person/model";
import { PersonSucceededPayload } from "../containers/Person/slice";

const API_KEY = 'a90d99d87d52ef1f55e06af62b50fadc';
const BASE_URL = 'https://api.themoviedb.org/';
const VERSION = '3';
const SCHEMA_FEATURE_KEY = 'person';

// TODO: Add page
export const queryPerson = (query: string): string => `${BASE_URL}${VERSION}/search/person?api_key=${API_KEY}&query=${query}`

export const fetchPerson = async (person: string):Promise<PersonSucceededPayload> => {
    try {

        const { data } = await axios.get(queryPerson(person));
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

    } catch (e) {
        throw new Error(e)
    }
}