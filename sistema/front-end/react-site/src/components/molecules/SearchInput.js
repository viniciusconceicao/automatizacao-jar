import React from 'react';
import styled from 'styled-components';
import {Colors} from '../../shared/Colors';
import {Search} from '@material-ui/icons';

const SearchInput = () => {
    return (
        <>
        <Input>
        <Search />
        <input placeholder="Pesquisar" />
        </Input>
        </>
    )

}

export default SearchInput;

const Input = styled.div `
display: flex;
align-items: center;
margin-left: 15px;
border: 1px solid ${Colors.gray.grayTabLine};
border-radius: 5px;
padding: 5px;
width: 100%;
height: 45px;

svg {
    padding: 0 5px;
    font-size: 42px;
    color: ${Colors.gray.grayTabLine};
}

input {
    width: 100%;
    outline: none;
    border: none;
}


`