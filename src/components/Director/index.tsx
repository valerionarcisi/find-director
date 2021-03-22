import React, { FunctionComponent } from 'react'
import { Person } from '../../containers/PersonContainer/model'
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px;
  position: relative;
`;


export const Director: FunctionComponent<Person> = ({
    know_for,
    known_for_department,
    name,
    popularity,
    profile_path
}) => {
    return <Card>
        {name}
        {know_for}<br />
        {known_for_department}<br />
        {popularity}<br />
        {profile_path}
    </Card>
}