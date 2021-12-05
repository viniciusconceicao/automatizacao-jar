import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { useHistory } from 'react-router-dom';
import { Button } from '../../molecules/Button';

const CadastroInicio = ({ aoEnviar }) => {
    const [role, setrole] = useState();
    const history = useHistory();

    return (
        <>
            <Welcome>
                <Title>Seja bem vindo ao Search Developers!</Title>
                <SubTitle>O que você gostaria de fazer em nossa plataforma?</SubTitle>
                <Buttons>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                                aoEnviar({ role });
                        }}>
                        <Button
                            onClick={() => setrole("clt")}
                            type="submit"
                            contentText="Quero solicitar um serviço"
                            style={{ width: "100%", margin: "20px 0" }} />
                        <Button
                            onClick={() => setrole("dev")}
                            type="submit"
                            contentText="Quero prestar serviço"
                            style={{ width: "100%", margin: "10px 0" }} />
                    </form>
                    <Button
                        onClick={() => history.push('/')}
                        contentText="Voltar para página principal"
                        primary={false} 
                        style={{ width: "100%", margin: "10px 0" }} />
                </Buttons>
            </Welcome>

        </>
    );
};


export default CadastroInicio;
const Welcome = styled.div`
display: flex;
align-items: center;
flex-direction: column;
margin: 50px;
`

const Title = styled.h1`
font-size: 24px;
color: ${Colors.gray.grayTitle};
text-align: center;
`

const SubTitle = styled.p`
width: 80%;
font-size: 18px;
color: ${Colors.gray.grayText};
text-align: center;
`

const Buttons = styled.div`
width: 100%;
display: flex;
align-items: center;
flex-direction: column;

form {
    width: 100%;
}

.button {
    width: 100%;
    padding-bottom: 10px;
}

`