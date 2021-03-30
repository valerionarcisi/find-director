import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchDirector } from '../containers/DirectorContainer/epic';
import { fetchPerson } from '../containers/SearchContainer/epic';

export const rootEpic = combineEpics(fetchPerson, fetchDirector);

export const epicMiddleware = createEpicMiddleware();
