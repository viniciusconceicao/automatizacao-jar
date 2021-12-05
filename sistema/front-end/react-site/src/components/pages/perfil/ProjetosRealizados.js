import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tab } from '../../molecules/Tab';
import { TabsPattern, BoxPerfil } from './Perfil';
import { useHistory } from "react-router";
import CardProjRealizados from '../../molecules/perfil/CardProjRealizados'
import api from '../../../services/api';
import { Skeleton } from 'antd';
import EmptyState from '../../organisms/EmptyState';

const ProjetosRealizados = () => {

    const idStorage = localStorage.getItem('idUser');
    const roleStorage = localStorage.getItem('role');
    const history = useHistory();
    const [concluidos, setConcluidos] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getConcluidos() {
        try {
            setLoading(true);
            const response = await api.get(`/api/services/finished/${idStorage}`)
            setConcluidos(response.data);
            console.log("sucesso ao listar servicos concluidos", response.data)
            setLoading(false);

        } catch (err) {
            console.log("erro ao listar servicos concluidos")
        }
    }

    useEffect(() => getConcluidos(), []);

    return (
        <>
            <TabsPattern>
                {
                    roleStorage === "clt" ?
                        <>
                            <Tab text="Projetos Solicitados"
                                active={true}
                                style={{ borderRadius: "10px 0 0 0" }}
                                onClick={() => history.push('/perfil')} />
                            <Tab text=""
                                style={{ borderRadius: "0 10px 0 0" }} />

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
                                active={true}
                                style={{ borderRadius: "0 10px 0 0" }}
                                onClick={() => history.push('/perfil/projetos')} />
                            {/* <Tab text="Reputação"
                                style={{ borderRadius: "0 10px 0 0" }}
                                onClick={() => history.push('/perfil/reputacao')} /> */}
                        </>
                }

            </TabsPattern>

            <BoxPerfil>
                {
                    roleStorage === "clt" ?
                    <h2>Projetos Solicitados</h2>
                    :
                    <h2>Projetos Realizados</h2>
                }
                

                {
                    loading ?
                        <>
                            <Skeleton paragraph={{ rows: 2 }} active />
                            <Skeleton paragraph={{ rows: 2 }} active />
                        </>
                        :
                        !concluidos.length == 0 ?
                            concluidos.map((concluido) => {
                                return (
                                    <ContainerProjRealizados>
                                        <CardProjRealizados
                                            pic={roleStorage === "clt" ? concluido.userDev.photo : concluido.userClt.photo}
                                            nome={roleStorage === "clt" ? concluido.userDev.nameUser : concluido.userClt.nameUser}
                                            categoria={concluido.service.tag}
                                            desc={concluido.service.descriptionService} />
                                    </ContainerProjRealizados>
                                )
                            })
                            :
                            <EmptyState type="arquivo" text="Você ainda não realizou nenhum projeto na SearchDevelopers" />
                }

            </BoxPerfil>
        </>
    )
}
export default ProjetosRealizados;

const ContainerProjRealizados = styled.div`
margin: auto;
`