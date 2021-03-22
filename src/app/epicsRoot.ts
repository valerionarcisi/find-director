import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { fetchPerson } from '../containers/PersonContainer/epic';

export const rootEpic = combineEpics(fetchPerson);

export const epicMiddleware = createEpicMiddleware();
