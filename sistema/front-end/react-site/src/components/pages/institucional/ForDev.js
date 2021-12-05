import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import Dev from '../../../assets/dev.png';

const ForDev = () => {
    return (
    <>
        <ForDevPage id="paraDev">
            <DevText>
                <h3>Você é programador? Venha trabalhar com o <b>SearchDevelopers!</b></h3>
                <p>
                    Nós nos preocupamos em promover seu perfil e garantir que não perca seu tempo. Visamos em nossa plataforma a sua autonomia, para enviar propostas aos clientes e para marcar suas tarefas, assim, poderá fazer do melhor jeito seus projetos.
                        </p>
            </DevText>
            <DevImg>
                <img src={Dev} />
            </DevImg>
        </ForDevPage>

    </>)
}

export default ForDev;

const ForDevPage = styled.section`
background-color: ${Colors.green.greenYellow};
min-height: 100vh;
display: flex;
`

const DevText = styled.div`
box-sizing: border-box;
width: 45%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 40px;

h3{
    color: ${Colors.gray.grayTitle};
    font-size: 36px;
    margin: 0;
}

h3 b{
    color: ${Colors.green.greenPrimary};
}

p{
    font-size: 18px;
}

`

const DevImg = styled.div`
flex-grow: 1;

img {
    filter: brightness(0.8);
    width: 100%;
    height: 100vh;
    object-fit: cover;
}

`