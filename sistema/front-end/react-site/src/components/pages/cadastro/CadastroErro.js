import React from 'react';
import styled from 'styled-components';
import {Colors} from '../../../shared/Colors';
import { useHistory } from 'react-router-dom';
import { Button } from '../../molecules/Button';
import Ilustration from '../../../assets/erro-cadastro.jpeg';
import { CloseCircleOutlined } from '@ant-design/icons';

const CadastroErro = () => {
    const history = useHistory();
    return (
        <>
            <Success>
                <img src={Ilustration} />
                <SuccessText>
                    <CloseCircleOutlined className="icon" />
                    <h2>Erro ao cadastrar seus dados! Tente novamente mais tarde.</h2>
                    <Button 
                    onClick={() => history.push('/')}
                    contentText="Voltar a página inicial" 
                    style={{padding: "10px 20px"}} />
                </SuccessText>
            </Success>
        </>
    )
}

export default CadastroErro;


const Success = styled.div `
display: flex;
min-height: 400px;
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