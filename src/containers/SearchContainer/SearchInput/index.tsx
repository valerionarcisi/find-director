import React, { FunctionComponent, useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { InputText } from "../../../components/InputText"

interface ISearchInput {
    onValueChange: (query: string) => void
}

export const SearchInput: FunctionComponent<ISearchInput> = ({ onValueChange }) => {

    const { search } = useLocation()
    const urlParams = new URLSearchParams(search);
    const name = urlParams.get('name');
    const history = useHistory()
    const [query, setQuery] = useState(name || "")

    useEffect(() => {
        const params = new URLSearchParams()
        if (query) {
            params.append("name", query)
        } else {
            params.delete("name")
        }
        history.push({ search: params.toString() })
        onValueChange(query);

    }, [query, history, onValueChange])

    return <InputText value={query} onValueChange={setQuery} />
}