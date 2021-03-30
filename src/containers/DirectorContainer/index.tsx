import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { start } from "./slice";


export const DirectorContainer = () => {
    
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(start({ id }))
    }, [dispatch, id])


    return <div>container director works</div>
}