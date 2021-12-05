import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../molecules/Button';
import { Colors } from '../../../shared/Colors';
import { Rate, message } from 'antd';
import perfil from '../../../assets/profile.png';
import api from '../../../services/api';
import { useHistory } from 'react-router';
import photos from '../../../services/photos';

export function SolicitationCard(props) {

    const {
        idStorage = localStorage.getItem('idUser'),
        id,
        idUser,
        name = '',
        description = '',
        pic,
        rate,
        reload,
    } = props

    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loadingButton, setLoadingButton] = useState(false);
    const history = useHistory();

    const getSolicitacao = async () => {
        try {
            const response = await api.get(`/api/services/${id}`)
            setSolicitacoes(response.data);
            console.log("sucesso ao listar solicitacoes", response.data)
        } catch (err) {
            console.log("erro ao listar solicitacoes")
        }
    }

    function acceptService() {

        setLoadingButton(true);

        console.log("aceito")

        try {
            api.put(`/api/services/${id}`, { ...solicitacoes, activeService: true });
            message.success('Solicitação aceita!');
            newNotification()

            setTimeout(() => window.location.href = "/painel/servicos/", 1000)


        } catch (err) {
            message.error('Erro ao aceitar solicitação!');
            console.log('Erro ao aceitar solicitacao!', err);
        }

        setLoadingButton(false);
    }

    function recusedService() {

        console.log("recusado")

        try {
            api.delete(`/api/services/${id}`);
            message.success('Solicitacao recusada com sucesso!');

            setTimeout(() => window.location.reload(), 1000)

        } catch (err) {
            console.log('Erro ao recusar solicitacao!');
        }
    }

    function newNotification() {
        try {
            api.post(`/notification/sender/${idStorage}/receiver/${idUser}`, {
                typeNotification: "service",
                title: "aceitou sua solicitação, o serviço está em andamento!",
                statusNotification: true,
            })
            console.log("notificação enviada com sucesso")
        } catch (err) {
            console.log("erro ao enviar notificação", err)
        }
    }



    useEffect(() => getSolicitacao(), [])


    return (
        <>
            <Card>
                <PicCard>
                    <img src={pic ? photos.url + pic : perfil} />
                </PicCard>
                <TextContentCard>
                    <h3>{name}</h3>
                    <Rate disabled allowHalf defaultValue={rate} style={{ fontSize: "14px" }} />
                    <p>{description}</p>
                </TextContentCard>
                <ButtonCard>
                    <div className="card__btn">
                        <Button contentText="Recusar" onClick={recusedService} primary={false} style={{ marginRight: "10px" }} />
                        <Button contentText="Aceitar" onClick={acceptService} loading={loadingButton} />
                    </div>
                </ButtonCard>
            </Card>
        </>
    )
}

const Card = styled.div`
border: 1px solid ${Colors.gray.grayTab};
border-radius: 6px;
margin-bottom: 20px;
padding: 15px;
display: flex;
align-items: center;
transition: all 0.5s;

&:hover {
    box-shadow: 0 4px 8px #EEE;
    background-color: ${Colors.gray.grayMilk};
}

@media (max-width: 1040px) {
    flex-direction: column;
}

`

const PicCard = styled.div`
margin: 0px 15px;

img {
   width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 2px solid ${Colors.green.greenLemon};
    object-fit: cover; 
}


`

const TextContentCard = styled.div`
flex-grow: 1;

h3 {
    font-size: 16px;
    margin: 0;
    color: ${Colors.gray.grayTitle};
}

p {
    color: ${Colors.gray.grayText};
    padding: 5px;
    margin: 0;
}

`

const ButtonCard = styled.div`
margin-right: 15px;

.card__btn {
    display: flex;
}
`

