import { configureStore } from '@reduxjs/toolkit'
import personReducer, { featureKey as personFeatureKey, IPersonState, } from '../containers/Person/slice';
import { epicMiddleware, rootEpic } from './epicsRoot';

export interface IState {
    [personFeatureKey]: IPersonState;
}

const reducer = {
    [personFeatureKey]: personReducer
}

export const store = configureStore({
    reducer,
    middleware: [epicMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
    // preloadedState,
    // enhancers: [reduxBatch]
})
epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch