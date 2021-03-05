import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchPerson } from './../containers/Person/epic';

export const rootEpic = combineEpics(fetchPerson);

export const epicMiddleware = createEpicMiddleware(
    // {
    //     dependencies: { getJSON: ajax.getJSON }
    // }
    );


