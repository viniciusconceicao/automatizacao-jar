import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button';

import StarRating from './StarRating';


function Evaluate (props) {

    const {
        fecharModal,
        idStorage = localStorage.getItem('idUser'),
    } = props

    const history = useHistory();

    const [user, setUser] = useState();

    const teste = () => {
        console.log("botão funcionando")
    }

    const caracters = 20;

    return (
        <Container>
            <Title>Avalie este usuário e conte sua experiência pra gente!</Title>
            <SubTitle>Sua avaliação e comentário estará visível para o remetente e para outros usuários da plataforma.</SubTitle>
            <Note>
                <div className="textNote">Nota:</div>
                
                <StarRating />

            </Note>
            <Comment>
                <div>Comentário:</div>
                <textarea className="inputComment" placeholder="Faça um Comentário ..." maxLength="200" />
                <div className="subComment">{caracters}/200 caracters permitidos</div>
            </Comment>
            <Button 
            size="small"
            enabled={true}
            onClick={teste}
            contentText="Avaliar"/>
        </Container>
    );
}

export default Evaluate;



const Container = styled.div`
font-family: Roboto;
width: 378px;
height: 382px;
border-radius: 4px;
flex-direction: column;
display: flex;
padding: 30px;
margin-right: -100px;
`

const Title = styled.text`
font-size: 16px;
line-height: 19px;
color: #000000;
`

const SubTitle = styled.text`
font-size: 12px;
line-height: 14px;
margin-top: 10px;
color: #636363;
`

const Note = styled.text`
flex-direction: row;
display: flex;
align-items: center;
font-size: 12px;
line-height: 14px;
margin-top: 25px;
color: #636363;

.textNote{
    margin-right: 20px;
}
`

const Comment = styled.text`
flex-direction: column;
display: flex;
font-size: 12px;
line-height: 14px;
margin-top: 25px;
color: #636363;

.inputComment{
    width: 320px;
    height: 82px;
    border-radius: 5px;
    margin: 10px 0 5px 0;
    border:1px solid #C4C4C4;
}

.subComment{
    font-size: 12px;
    line-height: 14px;
    text-align: right;
    margin-bottom: 10px;
    color: #2F9CD3;
    }
`
