import { createSelector } from "@reduxjs/toolkit"
import { IState } from "../../app/store"
import { featureKey } from "./slice"

export const getPersonas = createSelector(
    (state: IState) => state[featureKey],
    (personState) => Object.values(personState.byIds || {})
)

export const getDirector = createSelector(
    getPersonas,
    (personas) => personas.filter(p => p.known_for_department === 'Directing')
)