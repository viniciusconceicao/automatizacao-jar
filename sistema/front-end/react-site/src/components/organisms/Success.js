import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../shared/Colors';
import Trofeu1 from '../../assets/trophy.svg'
import Trofeu2 from '../../assets/trophy1.svg';
import Trofeu3 from '../../assets/trophy2.svg'
import { Button } from '../molecules/Button';


const Success = (props) => {

    const {
        text = "",
        type = "",
        textButton,
        onclick
    } = props

    return (
        <>
            <Center>

                {
                    type === "1" ?

                    <img src={Trofeu1} />
                    :
                    type === "2" ?
                    <img src={Trofeu2} />
                    :
                    <img src={Trofeu3} />
                }
                <span>{text}</span>

                <Button contentText={textButton} onClick={onclick} />
            </Center>
        </>
    )
}

export default Success;

const Center = styled.div `
margin: 40px 0;
display: flex;
flex-direction: column;
width: 100%;
height: 50vh;
justify-content: center;
align-items: center;

img {
    width: 200px;
    filter: opacity(0.6);
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