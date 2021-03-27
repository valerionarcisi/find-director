import React, { ChangeEvent, FunctionComponent } from 'react'

interface IInputText {
    value?: string,
    onValueChange: (value: string) => unknown
}


export const InputText: FunctionComponent<IInputText> = ({ value, onValueChange }) => {

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        onValueChange(e.target.value)
    }

    return <input type="text" value={value} onChange={onChange} />

}