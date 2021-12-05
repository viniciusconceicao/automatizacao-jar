import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import { Button } from '../../molecules/Button';
import Evaluate from '../../molecules/modal/Evaluate';
import { Colors } from '../../../shared/Colors';
import { Progress, Modal, Breadcrumb, Skeleton } from 'antd';
import { PhoneOutlined, MailOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import perfil from '../../../assets/profile.png';
import api from '../../../services/api';
import photos from '../../../services/photos';


const ServicoDetalhes = () => {

    const history = useHistory();
    const idStorage = localStorage.getItem('idUser');
    const roleStorage = localStorage.getItem('role');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [service, setService] = useState([]);
    const [userDev, setUserDev] = useState([]);
    const [userClt, setUserClt] = useState([]);
    const [progress, setProgress] = useState(0);

    let { id } = useParams();

    function getServices() {
        setLoading(true);
        api.get(`/api/services/${id}/user/${idStorage}`)
            .then(response => {
                setService(response.data.service)
                setUserDev(response.data.userDev)
                setUserClt(response.data.userClt)
                setProgress(response.data.service.progress)
                console.log("service:", response.data.service, response.data.userDev)
                setLoading(false);
            })
    }

    const updateProgressService = () => {
        setLoadingButton(true);

        try {
            api.put(`/api/services/${id}`, { ...service, progress });
            newNotification()
        } catch (err) {
            console.log('Erro ao atualizar servico!');
        }

        setLoadingButton(false);
    }

    function newNotification() {
        try {
            api.post(`/notification/sender/${idStorage}/receiver/${userClt.idUser}`, {
                typeNotification: "service",
                title: "atualizou o progresso do serviço",
                statusNotification: true,
            })
            console.log("notificação enviada com sucesso")
        } catch (err) {
            console.log("erro ao enviar notificação", err)
        }
    }


    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleOk = () => {
        setIsModalVisible(false);
        localStorage.clear();
        history.push('/');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => getServices(), [])

    useEffect(() => updateProgressService(), [progress])

    return (
        <>
            <Breadcrumb style={{ marginBottom: "20px" }}>
                <Breadcrumb.Item>Painel</Breadcrumb.Item>
                <Breadcrumb.Item>Serviços</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/painel/servicos">Em andamento</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Detalhes</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <ContainerUp>
                    <ContainerService>
                        <div className="title">
                            Detalhes do Serviço
                        </div>

                        {loading ?

                            <Skeleton paragraph={{ rows: 4 }} />

                            :
                            <>
                                <div className="textOpacity">
                                    Categoria
                                </div>
                                <div>
                                    {service.tag}
                                </div>

                                <div className="textOpacity">
                                    Descrição
                                </div>
                                <div>
                                    {service.descriptionService}
                                </div>
                                <div className="textOpacity">
                                    Data de solicitação do serviço:
                                </div>
                                <div>
                                    {service.startDateService}
                                </div>
                            </>
                        }


                    </ContainerService>

                    <ContainerData>

                        {
                            roleStorage === "clt" ?
                                <div className="title">
                                    Dados do Profissional
                                </div>
                                :
                                <div className="title">
                                    Dados do Cliente
                                </div>
                        }



                        {loading ?
                            <Skeleton avatar paragraph={{ rows: 4 }} />
                            :
                            <div className="informations">
                                {
                                    roleStorage === "clt" ?
                                        <img className="image" src={userDev.photo ? photos.url + userDev.photo : perfil} />
                                        :
                                        <img className="image" src={userClt.photo ? photos.url + userClt.photo : perfil} />

                                }


                                <div>
                                    <div className="textBold">
                                        {roleStorage === "clt" ? userDev.nameUser :  userClt.nameUser}
                                    </div>
                                    <div>{roleStorage === "clt" ? userDev.locality : userClt.locality}</div>

                                    <div className="contatc">
                                        <div className="textOpacity">Contato:</div>
                                        <span><PhoneOutlined className="icon" /> {roleStorage === "clt" ? userDev.phone : userClt.phone}</span>
                                        <span><MailOutlined className="icon" /> {roleStorage === "clt" ? userDev.email : userClt.email}</span>

                                    </div>
                                </div>
                            </div>
                        }

                        <div className="buttons">
                            <Button
                                contentText="Ver Perfil"
                                primary={false}
                                size="small"
                                style={{ width: "170px", height: "35px", marginRight: "5px" }} />

                            <Button
                                contentText="Avaliar"
                                primary={true}
                                enabled={false}
                                size="small"
                                style={{ width: "170px", height: "35px", marginLeft: "5px" }}
                                 />

                            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} className="qualquer">
                                <Evaluate fecharModal={handleCancel} />
                            </Modal>
                        </div>

                    </ContainerData>
                </ContainerUp>

                <ContainerStatus>
                    <div className="containerLeft">

                        <div className="title">
                            Status do Serviço
                        </div>

                        <div className="dados">
                            <div>
                                <div>ID do pedido</div>
                                <div className="textBold">#SD21100{service.idService}</div>

                                {progress === 100 || roleStorage === "clt" ? null :
                                    <>
                                        <Button loading={loadingButton} contentText="+10% de progresso" onClick={() => {
                                            setProgress(progress + 10)
                                        }} style={{ margin: "20px 0" }} />
                                        <span style={{ paddingBottom: "10px", display: "inline-block" }}> <ExclamationCircleOutlined /> Profissional, mantenha o progresso de seus serviços atualizados para que seus clientes possam acompanhar o status.</span>
                                    </>
                                }

                            </div>

                            {/* <div className="andamento">
                                <div>Andamento</div>
                                <div className="progressBar">
                                    <Progress percent={loading ? "carregando" : service.progress} showInfo={false} />
                                </div>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        Selecione <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div> */}

                        </div>
                    </div>
                    <div style={{ margin: " auto 40px" }}>
                        <Progress type="circle" percent={progress} />
                        {
                            progress === 100
                                ?
                                <div style={{ marginTop: "10px" }}>Concluído em {service.endDateService}</div>
                                :
                                <div style={{ marginTop: "10px", color: Colors.blue.bluePrimary }}>Faltam {100 - Number(progress)}% para finalizar o serviço</div>
                        }
                    </div>

                    <div className="containerRight">
                        <Button
                            contentText="Preciso de ajuda"
                            primary={false}
                            size="small"
                            style={{ width: "170px", height: "35px", }} />

                        <Button
                            contentText="Cancelar serviço"
                            primary={false}
                            size="small"
                            style={{ width: "170px", height: "35px", marginTop: "10px" }} />
                    </div>

                </ContainerStatus>
            </Container>
        </>
    )
}

export default ServicoDetalhes;

const Container = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Colors.gray.grayText};

    .title {
        font-size: 18px;
        line-height: 21px;
        color: ${Colors.gray.grayTitle};
    }

    .textOpacity {
        font-size: 14px;
        font-weight: 400;
        color: #AEAEAE;
        margin-top: 15px;
        margin-bottom: 4px;
    }
`

const ContainerUp = styled.div`
    width: 100%;
    flex-direction: row;
    display: flex;
    margin-top: 10px;

    @media(max-width: 900px) {
        flex-direction: column;
    }
`

const ContainerService = styled.div`
    border-radius: 10px;
    border: 1px solid ${Colors.gray.grayTab};
    width: 50%;
    margin-right: 15px;
    padding: 20px;

    @media(max-width: 900px) {
        width: 100%;
        margin-bottom: 20px;
    }
`

const ContainerData = styled.div`
border-radius: 10px;
border: 1px solid ${Colors.gray.grayTab};
width: 50%;
margin-left: 15px;
padding: 20px;

    .title {
    margin-bottom: 15px;
    }


    .informations{
    font-size: 12px;
    flex-direction: row;
    display: flex;

        .textBold {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
        }

        .image{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 150px;
        border: 3px solid ${Colors.green.greenPrimary};
        margin-right: 10px;
        }

        .contatc{
        margin-top: 10px;
        flex-direction: column;
        display: flex;

            .icon svg {
            font-size: 18px;
            fill: ${Colors.blue.bluePrimary};
            margin-right: 8px;
            }   
        }
    }

    .buttons{
    flex-direction: row;
    display: flex;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
    }

    @media(max-width: 900px) {
        width: 100%;
        margin-left: 0;
    }

`

const ContainerStatus = styled.div`
border-radius: 10px;
border: 1px solid ${Colors.gray.grayTab};
width: 100%;
margin-top: 30px;
padding: 20px;
display: flex;
justify-content: space-between;
align-items: flex-start;

    .containerLeft {
    width: 400px;

        .dados{
        flex-direction: row;
        display: flex;
        margin-top: 20px;
        color: ${Colors.gray.grayTabLine};

            .textBold {
            color: ${Colors.gray.grayTitle};
            font-size: 14px;
            font-weight: 500;
            margin-top: 10px;
            }

            .andamento{
            margin-left: 70px;
            width: 200px;

                .progressBar{
                margin-top: 5px;
                width: 100%;
                }
            }

        }
    
    }

    .containerRight {
    margin-top: auto;
    }

`