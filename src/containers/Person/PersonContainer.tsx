import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { setFind } from './store';


export function PersonContainer() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setFind('Martin+Scorsese'))
    }, [])
    return <div>
        dassadsas
    </div>
}