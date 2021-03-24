import React, { FormEvent, FunctionComponent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DirectorPreview } from './DirectorPreview';
import { getDirector } from './selectors';
import { setFind } from './slice';

export const SearchContainer: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const handleChange = (event: FormEvent<HTMLInputElement>): void => {
        dispatch(setFind(event.currentTarget.value))
    }

    const directos = useAppSelector(getDirector)

return <div>
        <input type="text" name="director" onChange={handleChange} />
        {directos.map(d => (
            <DirectorPreview
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