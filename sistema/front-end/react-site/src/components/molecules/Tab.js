import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../shared/Colors'

export function Tab(props) {
    const {
        text,
        active = false,
        style,
        onClick
    } = props;

    let newStyle = null;

    if (active) {
        newStyle = { ...style, backgroundColor: Colors.green.greenAqua, color: Colors.gray.grayWhite, borderColor: Colors.green.greenAqua }
    }
    return (
        <>
            <TabPattern
                onClick={onClick}
                style={{ ...style, ...newStyle }}>{text}</TabPattern>
        </>
    );
}
const TabPattern = styled.div`
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e0e0e0;
        color: ${Colors.gray.grayText};
        width: 100%; 
        height: 100%;
        line-height: 35px;
        border-left: 1px solid ${Colors.gray.grayTabLine};
        transition: 0.5s;

        &:hover {
            background-color: #3ddbc55e;
            color: ${Colors.green.greenAqua};
        }
 `

