import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../molecules/Button';
import Code from '../../assets/bannerBackground.png';

export function Banner() {

    return (
        <BannerBackground>

            <BannerText>
                <TitleText>
                Beneficios para o developer
                </TitleText>
                <TitleSubTitle>
                    Faça o seu cadastro, importe seus trabalhos já feitos direto do GitHub. Acumule pontos e faça seu proprio planejamento, turbine seu perfil e procure serviços de sua especialidade
                </TitleSubTitle>
            </BannerText>

            <LocalButton>
                <Button
                    primary={true}
                    enabled={true}
                    contentText="Saiba mais"
                >
                </Button>
            </LocalButton>

        </BannerBackground>
    )

}


const BannerBackground = styled.image`
width: 100%;
height: 200px;
display: flex;
background-image: url(${Code});
justify-content: space-between;
align-items: center;
`

const BannerText = styled.div`
    padding-left: 5%;
    flex-direction: column;
    display: flex;
    color: #fff;
`;

const TitleText = styled.strong`
    font-size: 36px;
    line-height: 42,19px;
    font-weight: bold;
`;

const TitleSubTitle = styled.p`
    margin-top: 20px;
    width: 50%;
    font-size: 14px;
    line-height: 42,19px;
`;

const LocalButton = styled.div`
width: 23%;
`;