import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../shared/Colors';
import Empty from '../../assets/box.svg'
import Correio from '../../assets/mailbox.svg';
import Pasta from '../../assets/folder.svg'


const EmptyState = (props) => {

    const {
        text = "",
        type = ""

    } = props

    return (
        <>
            <Center>

                {
                    type === "correio" ?

                    <img className="correio" src={Correio} />
                    :
                    type === "arquivo" ?
                    <img className="caixa" src={Pasta} />
                    :
                    <img className="caixa" src={Empty} />
                }
                <span>{text}</span>
            </Center>
        </>
    )
}

export default EmptyState;

const Center = styled.div `
padding: 20px;
display: flex;
flex-direction: column;
width: 100%;
height: 50vh;
justify-content: center;
align-items: center;

.caixa {
    width: 200px;
    filter: opacity(0.6);
}

.correio {
    width: 150px;
    filter: opacity(0.4);
}

span {
    text-align: center;
    opacity: 0.7;
    color: ${Colors.gray.grayTitle};
    padding: 20px;
    font-size: 18px;
    font-weight: 400;
}
`