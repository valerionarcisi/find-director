import { configureStore } from '@reduxjs/toolkit'
import personReducer, { featureKey as personFeatureKey } from '../containers/SearchContainer/slice';
import directorReducer, { featureKey as directorFeatureKey  } from '../containers/DirectorContainer/slice';
import { epicMiddleware, rootEpic } from './epicsRoot';


const reducer = {
    [personFeatureKey]: personReducer,
    [directorFeatureKey]: directorReducer
}

export const store = configureStore({
    reducer,
    middleware: [epicMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
})
epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch