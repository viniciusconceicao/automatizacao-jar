import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Colors } from '../../shared/Colors';
import Icon from '../../assets/magic.svg';

export function Fab(props) {

    return (
        <FabDarkMode>
            <img src={Icon} alt="dark mode" />
        </FabDarkMode>)
}

const FabDarkMode = styled.div`
position: fixed;
bottom: 20px;
right: 20px;
display: flex;
justify-content: center;
width: 60px;
height: 60px;
background-color: ${Colors.gray.grayText};
border-radius: 50%;
cursor: pointer;

    img{
        width: 27px;
    }
`