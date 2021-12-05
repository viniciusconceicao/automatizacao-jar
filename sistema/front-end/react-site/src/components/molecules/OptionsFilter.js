import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Colors } from '../../shared/Colors';



export function OptionsFilter(props) {

    const {
        onClick,
        contentText = 'Botão Open',
        style,
    } = props

    const newStyle = null;

    return (
        <>
            <BasicButton
                onClick={onClick}
                style={{...style, ...newStyle}}>
                {contentText}
            </BasicButton>
        </>
    )

}

OptionsFilter.propTypes = {
    onClick: PropTypes.func,
    contentText: PropTypes.string,
    style: PropTypes.object,
}

const BasicButton = styled.text`
cursor: pointer;
font-size: 16px;
line-height: 19px;
margin: 5px;
color: ${Colors.gray.grayText};
`