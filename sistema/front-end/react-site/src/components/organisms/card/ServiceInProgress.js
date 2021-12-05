import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router' 
import { Button } from '../../molecules/Button';
import perfil from '../../../assets/profile.png';
import { Progress } from 'antd';
import { message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Colors } from '../../../shared/Colors';
import api from '../../../services/api';
import photos from '../../../services/photos';


export function ServiceInProgress(props) {

    const history = useHistory();
    const roleStorage = localStorage.getItem('role');


    const {
        idStorage = localStorage.getItem('idUser'),
        id = '',
        idUser,
        pic,
        percentBar = 0, 
        categoryProject = '',
        infoProject = '',
        clientProject = '',
        numberClient = '',
    } = props

    const [service, setService] = useState([]);

    const getService = async () => {
        try {
            const response = await api.get(`/api/services/${id}`)
            setService(response.data);
            console.log("servico selecionado:", response.data)
        } catch (err) {
            console.log("erro ao selecionar servico")
        }
    }

    const concluirService = (id) => {
        try {
            api.put(`/api/services/${id}`, {...service, progress: "100"});
            console.log('servico concluido!')
            message.success("servico concluido!")
            newNotification();
            setTimeout(() => 
            window.location.href="/painel/servicos/concluidos", 1000)

        } catch (err) {
            console.log('Erro ao finalizar servico!');
        }
    }

    function newNotification() {
        try {
            api.post(`/notification/sender/${idStorage}/receiver/${idUser}`, {
                typeNotification: "service",
                title: "marcou sua solicitação como concluída",
                statusNotification: true,
            })
            console.log("notificação enviada com sucesso")
        } catch (err) {
            console.log("erro ao enviar notificação", err)
        }
    }

    useEffect(() => getService(), [])


    return (
        <>
            <Container>
                <div className="containerUp"> 
                    <div className="status">
                        <span className="desc">Status: </span>
                        <div>
                        {percentBar === 100 ? "Concluído" : "Em andamento" }
                        </div>
                    </div>
                    
                    <div className="progress">
                        <span className="desc">Andamento: </span>
                        <div className="progressBar">
                            <Progress percent={percentBar} showInfo={true} />
                        </div>
                    </div>
                    
                    <div className="divButton">
                        <Button 
                            onClick={() => history.push(`/painel/servicos/detalhes/${id}`)}
                            size={'small'}
                            primary={false}
                            enabled={true}
                            contentText="Ver detalhes"
                            style={{width: "80%"}}
                        />
                        {
                            percentBar === 100 || roleStorage === "clt" ? 
                            null
                            :                        
                            <Button contentText="Concluir" size="small" onClick={() => concluirService(id)} style={{padding: "0px 5px", marginLeft: "5px"}} />
                        }
                    </div>
                </div>

                <div className="line" />

                <div className="containerDown"> 
                    <div className="category">
                        <span className="desc">Categoria:</span>
                        <div className="textBold">
                            {categoryProject}
                        </div>
                    </div>
                    
                    <div className="description">
                        <span className="desc">Andamento: </span>
                        <div className="textBold">
                            {infoProject}
                        </div>
                    </div>
                    
                    <div className="clientContainer">
                        
                        <div className="client">
                            <img className="clientImage" src={pic ? photos.url + pic : perfil}/>
                            <div className="clientText">
                                <div className="textBold">
                                    {clientProject}
                                </div>
                                {numberClient}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )

}

const Container = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid ${Colors.gray.grayTab};
    color: ${Colors.gray.grayText};
    border-radius: 6px;
    background-color: #fff;
    margin-bottom: 30px;

    .desc {
        color: #AEAEAE;
    }

    .containerUp{
        justify-content: center;
        align-items: center;
        width: 90%; 
        display : flex;
        flex-direction: row;
        padding: 20px 5px;

        .status{
            flex-direction: column; 
            justify-content: left;
            width: 33%;
            height: 60px; 
        }

        .progress{
            flex-direction: column;
            justify-content: center ;
            width: 33%;
            height: 60px; 

            .progressBar{
                width: 90%;
            }

        }

        .divButton{
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
        }

    }

    .line{
        background-color: #e5e5e5;
        width: 100%;
        height: 1px;
        border-radius: 6px;
    }

    .containerDown{
        justify-content: center;
        align-items: center;
        width: 90%; 
        display : flex;
        flex-direction: row;
        padding: 20px 5px;

        .category{
            flex-direction: column;
            justify-content: left;
            width: 33%;

        }

        .description{
            flex-direction: column;
            justify-content: center;
            width: 33%;

        }

        .clientContainer{
            flex-direction: column;
            justify-content: right;
            align-items: center;
            display: block;
            width: 33%;

            .client{
                flex-grow: 1;
                justify-content: flex-end;
                align-items: center;
                display: flex;
                text-align: center;

                

                .clientImage{
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 2px solid #44CF6C;
                }

                .clientText{
                    display: block;
                    margin-left: 5%;
                }

                .textBold{
                    font-weight: 500;
                    margin: 0px;
                }
            }
        }
    }
`

