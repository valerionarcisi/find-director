import React, { FunctionComponent } from 'react'
import { Person } from '../model'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px;
  position: relative;
`;


export const DirectorPreview: FunctionComponent<Person> = ({
    know_for,
    known_for_department,
    name,
    popularity,
    profile_path,
    id
}) => {
    return <Card>
        <Link 
            to={`/person/${id}`}
        >
            {name}
            {know_for}<br />
            {known_for_department}<br />
            {popularity}<br />
            {profile_path}
        </Link>
    </Card>
}