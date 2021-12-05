import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export function ButtonOpen(props) {

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

ButtonOpen.propTypes = {
    onClick: PropTypes.func,
    contentText: PropTypes.string,
    style: PropTypes.object,
}

const BasicButton = styled.text`
cursor: pointer;
font-size: 14px;
line-height: 16px;
text-align: right;
color: #2686CB;
`