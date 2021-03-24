import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchPerson } from '../containers/SearchContainer/epic';

export const rootEpic = combineEpics(fetchPerson);

export const epicMiddleware = createEpicMiddleware();
