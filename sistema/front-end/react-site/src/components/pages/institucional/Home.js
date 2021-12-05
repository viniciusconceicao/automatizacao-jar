import React from 'react'
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import Ilustration from '../../../assets/home.png';
import { Button } from '../../molecules/Button';


const Home = () => {
    return (
    <>
        <HomePage id="principal">
            <TextContent>
                <h1>A maneira mais rápida e eficiente de contratar serviços tecnológicos.</h1>
                <p>Diga o que você precisa e receba um orçamento do desenvolvedor mais adequado para a sua necessidade.</p>
                <div>
                    <Button contentText="Contratar serviço"></Button>
                    <Button contentText="Cadastrar meu serviço" primary={false}></Button>
                </div>
            </TextContent>
            <Image>
                <img src={Ilustration} />
            </Image>
        </HomePage>
    </>)
}

export default Home;

const HomePage = styled.section`
background-color: ${Colors.gray.grayWhite};
min-height: 100vh;
display: flex;
align-items: center;
justify-content: space-around;`

const TextContent = styled.div`
margin-top: 15vh;
width: 40%;

h1 {
    color: ${Colors.gray.grayTitle};
    font-size: 36px;
}

p {
    font-size: 18px;
}

div {
    display: flex;
}

div button {
    margin-right: 20px;
}`

const Image = styled.div`
img {
    height: 100vh;
}`


