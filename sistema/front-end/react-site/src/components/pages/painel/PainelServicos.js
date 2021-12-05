import React, { useEffect, useState } from 'react'
import { ServiceInProgress } from '../../organisms/card/ServiceInProgress'
import { SubMenu } from '../../organisms/SubMenu';
import { Route } from 'react-router-dom';
import { Breadcrumb, Skeleton } from 'antd';
import api from '../../../services/api';
import { SolicitationCard } from '../../organisms/card/SolicitationCard';
import ServicoDetalhes from './ServicoDetalhes';
import EmptyState from '../../organisms/EmptyState';

const PainelServicos = () => {
    const idStorage = localStorage.getItem('idUser');
    const roleStorage = localStorage.getItem('role');
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [atuais, setAtuais] = useState([]);
    const [concluidos, setConcluidos] = useState([]);
    const [loading, setLoading] = useState(false);


    const getSolicitacoesServ = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/services/inactive/${idStorage}`)
            setSolicitacoes(response.data);
            console.log("sucesso ao listar solicitacoes", response.data)
            setLoading(false);
        } catch (err) {
            console.log("erro ao listar solicitacoes")
        }
    }

    async function getServAndamento() {
        try {
            setLoading(true);
            const response = await api.get(`/api/services/active/${idStorage}`)
            setAtuais(response.data);
            console.log("sucesso ao listar servicos atuais", response.data)
            setLoading(false);

        } catch (err) {
            console.log("erro ao listar servicos atuais")
        }
    }

    async function getServConcluidos() {
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

    useEffect(() => {
        getSolicitacoesServ()
        getServAndamento()
        getServConcluidos()

    }, [])

    return (
        <>

            <div className="template header">
                <SubMenu />
            </div>
            <div className="template body">
                <Route exact path="/painel/servicos/solicitados">

                    <Breadcrumb style={{ marginBottom: "20px" }}>
                        <Breadcrumb.Item>Painel</Breadcrumb.Item>
                        <Breadcrumb.Item>Serviços</Breadcrumb.Item>
                        <Breadcrumb.Item>Solicitações</Breadcrumb.Item>
                    </Breadcrumb>

                    {loading ?
                        <>
                            <Skeleton avatar paragraph={{ rows: 2 }} active />
                            <Skeleton avatar paragraph={{ rows: 2 }} active />
                        </>
                        :
                        !solicitacoes.length == 0 ?
                            solicitacoes.map((user) => {

                                if (roleStorage === "clt") {

                                    return (
                                        <SolicitationCard key={user.userDev.idUser}
                                            id={user.service.idService}
                                            idUser={user.userDev.idUser}
                                            pic={user.userDev.photo}
                                            name={user.userDev.nameUser}
                                            description={user.service.descriptionService}
                                            rate={user.userDev.stars}
                                        />
                                    )
                                } else {

                                    return (
                                        <SolicitationCard key={user.userClt.idUser}
                                            id={user.service.idService}
                                            idUser={user.userClt.idUser}
                                            pic={user.userClt.photo}
                                            name={user.userClt.nameUser}
                                            description={user.service.descriptionService}
                                            rate={user.userClt.stars}
                                        />
                                    )
                                }
                            })
                            :
                            <EmptyState text="Você ainda não possui solicitações de serviço" />
                    }
                </Route>
                <Route exact path="/painel/servicos">

                    <Breadcrumb style={{ marginBottom: "20px" }}>
                        <Breadcrumb.Item>Painel</Breadcrumb.Item>
                        <Breadcrumb.Item>Serviços</Breadcrumb.Item>
                        <Breadcrumb.Item>Em andamento</Breadcrumb.Item>
                    </Breadcrumb>

                    {
                        loading ?
                            <>
                                <Skeleton avatar paragraph={{ rows: 2 }} active />
                                <Skeleton avatar paragraph={{ rows: 2 }} active />
                            </>
                            :
                            !atuais.length == 0 ?

                                atuais.map((service) => {

                                    if (roleStorage === "clt") {

                                        return (
                                            <ServiceInProgress
                                                id={service.service.idService}
                                                idUser={service.userDev.idUser}
                                                pic={service.userDev.photo}
                                                percentBar={service.service.progress}
                                                categoryProject={service.service.tag}
                                                infoProject={service.service.descriptionService}
                                                clientProject={service.userDev.nameUser}
                                                numberClient={service.userDev.phone} />
                                        )
                                    } else {

                                        return (
                                            <ServiceInProgress
                                                id={service.service.idService}
                                                idUser={service.userClt.idUser}
                                                pic={service.userClt.photo}
                                                percentBar={service.service.progress}
                                                categoryProject={service.service.tag}
                                                infoProject={service.service.descriptionService}
                                                clientProject={service.userClt.nameUser}
                                                numberClient={service.userClt.phone} />
                                        )
                                    }
                                })
                                :
                                <EmptyState text="Você ainda não possui serviços em andamento" />
                    }

                </Route>
                <Route exact path="/painel/servicos/concluidos">

                    <Breadcrumb style={{ marginBottom: "20px" }}>
                        <Breadcrumb.Item>Painel</Breadcrumb.Item>
                        <Breadcrumb.Item>Serviços</Breadcrumb.Item>
                        <Breadcrumb.Item>Concluídos</Breadcrumb.Item>
                    </Breadcrumb>

                    {
                        loading ?
                            <>
                                <Skeleton avatar paragraph={{ rows: 2 }} active />
                                <Skeleton avatar paragraph={{ rows: 2 }} active />
                            </>
                            :
                            !concluidos.length == 0 ?
                                concluidos.map((service) => {

                                    if (roleStorage === "clt") {

                                        return (
                                            <ServiceInProgress
                                                id={service.service.idService}
                                                pic={service.userDev.photo}
                                                percentBar={service.service.progress}
                                                categoryProject={service.service.tag}
                                                infoProject={service.service.descriptionService}
                                                clientProject={service.userDev.nameUser}
                                                numberClient={service.userDev.phone} />
                                        )
                                    } else {

                                        return (
                                            <ServiceInProgress
                                                id={service.service.idService}
                                                pic={service.userClt.photo}
                                                percentBar={service.service.progress}
                                                categoryProject={service.service.tag}
                                                infoProject={service.service.descriptionService}
                                                clientProject={service.userClt.nameUser}
                                                numberClient={service.userClt.phone} />
                                        )
                                    }
                                })
                                :
                                <EmptyState text="Você ainda não possui serviços concluídos" />
                    }

                </Route>
                <Route exact path={`/painel/servicos/detalhes/:id`}>
                    <ServicoDetalhes />
                </Route>
            </div>

        </>
    )
}

export default PainelServicos;