import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import { fetchPersonDetail } from "../../service/api";


export const DirectorContainer = () => {
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
       fetchPersonDetail(id);
    }, [id]);

    return <div>container director works</div>
}