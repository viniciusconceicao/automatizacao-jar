import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../molecules/Tab';
import { TabsPattern, BoxPerfil } from './Perfil';
import { useHistory } from "react-router";
import CardReputacao from '../../molecules/perfil/CardReputacao';


const Reputacao = () => {

    const history = useHistory();
    const roleStorage = localStorage.getItem('role');

    return (
        <>
            <TabsPattern>
                {
                    roleStorage === "clt" ?
                        <>
                            <Tab text="Projetos Solicitados"
                                style={{ borderRadius: "10px 0 0 0" }}
                                onClick={() => history.push('/perfil')} />
                            <Tab text="Reputação"
                                active={true}
                                style={{ borderRadius: "0 10px 0 0" }}
                                onClick={() => history.push('/perfil/reputacao')} />

                        </>

                        :
                        <>
                            <Tab text="Competências"
                                style={{ borderRadius: "10px 0 0 0" }}
                                onClick={() => history.push('/perfil')} />
                            <Tab text="Experiências"
                                onClick={() => history.push('/perfil/experiencia')} />
                            <Tab text="Formação Acadêmica"
                                onClick={() => history.push('/perfil/formacao')} />
                            <Tab text="Projetos Realizados"
                                onClick={() => history.push('/perfil/projetos')} />
                            <Tab text="Reputação"
                                active={true}
                                style={{ borderRadius: "0 10px 0 0" }}
                                onClick={() => history.push('/perfil/reputacao')} />
                        </>

                }

            </TabsPattern>

            <BoxPerfil>
                {
                    roleStorage === "clt" ?
                        <h2>Avaliação dos profissionais</h2>
                        :
                        <h2>Avaliação dos clientes</h2>
                }
                <ContainerReputacao>
                    <CardReputacao />
                    <CardReputacao />
                </ContainerReputacao>
            </BoxPerfil>
        </>
    )
}
export default Reputacao;

const ContainerReputacao = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;

`