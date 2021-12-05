import React from 'react';
import styled from 'styled-components';
import {Colors} from '../../../shared/Colors';
import One from '../../../assets/passo1.svg';
import Two from '../../../assets/passo2.svg';
import Three from '../../../assets/passo3.svg';

const HowItWorks = () => {
    return (
        <>
            <HowItWorksPage id="comoFunciona">
                <WorksText>
                    <h2>Como funciona?</h2>
                    <p>Aqui você tem início, processo e entrega! Os profissionais da SerachDevelopers estão aptos para atender 100% sua necessidade tecnológica.</p>
                </WorksText>
                <section>
                    <div>
                        <img src={One} />
                        <strong>Escolha o serviço que deseja</strong>
                        <p>Descreva para nós as suas necessidades tecnológicas</p>
                    </div>
                    <div>
                        <img src={Two} />
                        <strong>Propostas de serviço</strong>
                        <p>Os profissionais aptos terão acesso a sua necessidade e você será contatado</p>
                    </div>
                    <div>
                        <img src={Three} />
                        <strong>Feche negócio com ele!</strong>
                        <p>Explore o perfil dos profissionais, escolha o melhor e feche negócio</p>
                    </div>
                </section>
            </HowItWorksPage>
        </>
    )
}

export default HowItWorks;

const HowItWorksPage = styled.section`
background-color: ${Colors.gray.grayWhite};
padding-top: 10vh;
min-height: 100vh;

h2{
    color: ${Colors.gray.grayTitle};
    margin-bottom: 30px;
    text-align: center;
    font-size: 2rem;
}

img {
    width: 224px;
    margin-bottom: 20px;
}

p, strong { 
    text-align: center;
}

section {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

section div {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
`

const WorksText = styled.div ` 
margin: auto;
padding: 20px 0;
width: 45%;
`