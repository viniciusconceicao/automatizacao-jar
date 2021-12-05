import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { Route } from 'react-router-dom';
import { HeaderPainel } from '../../organisms/header/HeaderPainel';
import Competencias from './Competencias';
import Experiencia from './Experiencia';
import ProjetosRealizados from './ProjetosRealizados';
import Reputacao from './Reputacao';
import FormacaoAcademica from './FormacaoAcademica';
import Profile from '../../organisms/perfil/Profile';

const Perfil = () => {
    const roleStorage = localStorage.getItem('role');
    return (
        <>
            <HeaderPainel painel />
            <ContainerPerfil>
                <Profile />
                {
                    roleStorage === "dev" ?
                        <TemplatePerfil>
                            <Route exact path="/perfil" component={Competencias} />
                            <Route path="/perfil/experiencia" component={Experiencia} />
                            <Route path="/perfil/formacao" component={FormacaoAcademica} />
                            <Route path="/perfil/projetos" component={ProjetosRealizados} />
                            <Route path="/perfil/reputacao" component={Reputacao} />
                        </TemplatePerfil>

                        :
                        <TemplatePerfil>
                            <Route exact path="/perfil" component={ProjetosRealizados} />
                            <Route path="/perfil/reputacao" component={Reputacao} />
                        </TemplatePerfil>
                }

            </ContainerPerfil>
        </>
    )
}

export default Perfil;

export const TabsPattern = styled.div`
width: 100%;
height: 45px;
display: flex;
`

export const BoxPerfil = styled.div` 
padding: 50px;

h2 {
    color: ${Colors.gray.grayTitle};
    font-weight: 500;
    font-size: 18px;
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid ${Colors.gray.grayTab};
    display: flex;
    align-items: center;

    svg {
        margin-right: 10px;
    }
}

.add {
    font-size: 35px;
    color: #C4C4C4;
    cursor: pointer;
    transition: all 0.5s
}

.add:hover {
    transform: scale(1.1);
    color: ${Colors.blue.bluePrimary};
}
`

const ContainerPerfil = styled.main`
margin: auto;
padding: 15vh 0;
width: 90%;
background: ${Colors.gray.grayLight};
`

const TemplatePerfil = styled.div`
margin-top: 30px;
width: 100%;
min-height: 550px;
background-color: ${Colors.gray.grayWhite};
border-radius: 10px;
`