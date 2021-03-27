import React, { FunctionComponent, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DirectorPreview } from './DirectorPreview';
import { Person } from './model';
import { SearchInput } from './SearchInput';
import { getDirector } from './selectors';
import { setFind } from './slice';

export const SearchContainer: FunctionComponent = () => {

    const dispatch = useAppDispatch();

    const handleOnSearch = useCallback((value) => {
        if (!!value) {
            dispatch(setFind(value))
        }
    }, [dispatch])

    const directos = useAppSelector(getDirector)

    return <div>
        <SearchInput onValueChange={handleOnSearch} />
        {directos.map((d: Person) => (
            <DirectorPreview
                key={d.id}
                id={d.id}
                name={d.name}
                know_for={d.know_for}
                known_for_department={d.known_for_department}
                popularity={d.popularity}
                profile_path={d.profile_path}
            />
        ))}
    </div>
}