import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { featureKey } from "./slice"

export const getPersonas = createSelector(
    (state: RootState) => state[featureKey],
    (personState) => Object.values(personState.byIds || {})
)

export const getDirector = createSelector(
    getPersonas,
    (personas) => personas.filter(p => p.known_for_department === 'Directing')
)

export const getSearched = createSelector(
    (state: RootState) => state[featureKey],
    (state) => state.searched
)