import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { HeaderPainel } from '../../organisms/header/HeaderPainel';
import { Row } from 'antd';
import { Route } from 'react-router';
import MeusDados from './MeusDados';
import Seguranca from './Seguranca';
import Privacidade from './Privacidade';

const Configuracoes = () => {

    return (
        <>
            <HeaderPainel painel />
            <Base>
                <Title>
                    <h1>Configurações da conta</h1>
                </Title>
                <Config>
                    <Row style={{ height: "100%" }}>
                        <Route exact path='/configuracoes' component={MeusDados} />
                        <Route path='/configuracoes/seguranca' component={Seguranca} />
                        <Route path='/configuracoes/privacidade' component={Privacidade} />
                    </Row>
                </Config>

            </Base>

        </>
    )
}

export default Configuracoes;

const Base = styled.div`
width: 100%;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
`
const Title = styled.div`
margin-top: 12vh;
width: 90%;
color: ${Colors.gray.grayText};

h1 {
   font-size: 20px; 
   padding: 15px 0;
   font-weight: 400;
}

`

const Config = styled.div`
width: 90%;
border-radius: 6px;
background-color: ${Colors.gray.grayWhite};
margin-bottom: 10vh;
`

export const SubMenu = styled.div`
background-color: ${Colors.gray.grayMilk};
border-radius: 6px 0 0px 6px;
border-right: 1px solid ${Colors.gray.grayTab};
height: 100%;

ul {
    padding: 0;
}

ul li {
    cursor: pointer;
    font-size: 16px;
    list-style: none;
    padding: 24px 40px;
    color: ${Colors.gray.grayText};
    transition: all .5s;
}

ul li:hover {
    background-color: ${Colors.green.greenLight};
    color: ${Colors.green.greenAqua};

    
}

ul li:first-child {
    border-radius: 6px 0 0 0;
}

.active, .active:hover {
    background-color: ${Colors.green.greenAqua};
    color: ${Colors.gray.grayWhite};
    font-weight: 500;
}
`

export const Content = styled.div`
padding: 30px;
`

export const Grade = styled.div`
border-radius: 6px;
border: 1px solid ${Colors.gray.grayTab};
margin: 40px 0;

table {
    width: 100%;
}

tr {
    cursor: pointer;
    transition: all 0.5s;
}

tr:hover {
    background-color: ${Colors.green.greenLight};
}

td {
    color: ${Colors.gray.grayText};
    padding: 25px 15px;
    border-bottom: 1px solid ${Colors.gray.grayTab};
}

.td-collapse {
    padding: 0;
    border: 0;
}

.value-config {
    color: ${Colors.gray.grayTabLine};
}

.arrow-config {
    width: 60px;

    svg {
        color: ${Colors.green.greenAqua};
        font-size: 18px;
    }
}
`

export const Collapse = styled.div`
width: 100%;
background-color: ${Colors.gray.grayMilk};
padding: 30px 20px;

h4 {
        color: ${Colors.gray.graySubTitle};
    }

.box-collapse {
    display: flex;
    padding-top: 20px;
}

@media (max-width: 1029px) {
    .box-collapse {
        flex-direction: column;
    }

    input {
        
    }

    button {
        width: 70%;
        margin-top: 15px;
    }
}
`