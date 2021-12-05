import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Colors} from '../../shared/Colors';
import {Button} from '../molecules/Button';


export function Footer(props) {
    
    return (
        <FooterBackground>
            
            <FooterText>
                <TitleText>
                    {"<SearchDeveloper />"}
                </TitleText>
                <TitleSubTitle>
                    ©2021, searchDevelopers Serviços de Internet. 
                    CNPJ 14.127.813/0001-51 - Av. Rebouças, 
                    2472 - Pinheiros - São Paulo/SP - Brasil
                </TitleSubTitle>
                <FormOptions>
                <Options>Serviços</Options>
                    <Options>Como funciona</Options>
                    <Options>Depoimento</Options>
                    <Options>Login</Options>
                    <Options>Cadastre-se</Options>
                </FormOptions>
                    
            </FooterText>
            
            <FooterIcons>            
            </FooterIcons>
            

        </FooterBackground>
    )

}

const FooterBackground = styled.image `
width: 100%;
height: 188px;
display: flex;
background-color: #636363;
justify-content: space-between;
flex-direction: row;
`

const FooterText = styled.text`
    margin-left: 55px;
    margin-top: 27px;
    flex-direction: column;
    display: flex;
    color: #fff;
`;

const TitleText = styled.text `
    font-size: 24px;
    line-height: 42,19px;
    font-weight: bold;
`;

const TitleSubTitle = styled.text`
    margin-top: 13px;
    width: 458px;
    font-size: 12px;
    line-height: 42,19px;
`;

const FormOptions = styled.text`
    font-size: 14px;
    width: 100%;
    margin-top: 30px;
`;

const Options = styled.text`
    margin-right:80px;
`;

const FooterIcons = styled.image`
    display: flex;
`;

