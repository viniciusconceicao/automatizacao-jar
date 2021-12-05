import React from 'react';
import styled from 'styled-components';
import {Colors} from '../../../shared/Colors';
import { useHistory } from 'react-router-dom';
import { Button } from '../../molecules/Button';
import Ilustration from '../../../assets/sucesso.png';
import { CheckCircleOutlined } from '@ant-design/icons';

const CadastroConcluido = () => {
    const history = useHistory();
    return (
        <>
            <Success>
                <img src={Ilustration} />
                <SuccessText>
                    <CheckCircleOutlined className="icon" />
                    <h2>Sua conta na <b>SearchDevelopers</b> foi criada com sucesso!</h2>
                    <Button 
                    onClick={() => history.push('/')}
                    contentText="Entrar na minha conta" 
                    style={{padding: "10px 20px"}} />
                </SuccessText>
            </Success>
        </>
    )
}

export default CadastroConcluido;


const Success = styled.div `
display: flex;
align-items: center;

img {
    width: 50%;
}

@media(max-width: 1040px) {
    img {
        display: none;
    }
}

`
const SuccessText = styled.div `
margin: 30px;

.icon svg {
    font-size: 50px;
    fill: ${Colors.blue.bluePrimary};
}

h2{
    color: ${Colors.gray.grayTitle};
    margin: 10px 0;
}

h2 b {
    color: ${Colors.green.greenPrimary};
    font-size: 24px;
}

@media(max-width: 1070px) {
    .icon svg {
        font-size: 30px;
    }

    h2{
        font-size: 16px;
    }

    h2 b {
        font-size: 18px;
    }
}

`