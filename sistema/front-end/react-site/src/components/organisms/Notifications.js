import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../shared/Colors';
import { Notifications } from '@material-ui/icons';
import { Popover, Empty } from 'antd';
import { NotificationCard } from './card/NotificationCard'
import api from '../../services/api';
import EmptyState from './EmptyState';

export function Notification() {
    const idStorage = localStorage.getItem('idUser');
    const [notifications, setNotifications] = useState();

    const getNotifications = async () => {
        try {
            const response = await api.get(`/notification/order/${idStorage}`)
            setNotifications(response.data);
            console.log("sucesso ao listar notificações", response.data)
        } catch (err) {
            console.log("erro ao listar solicitacoes")
        }
    }

    useEffect(() => getNotifications(), []);

    const content = (
        <ContentBox>
            <Mask>
                <h1>Notificações</h1>
                {
                    notifications ?

                        notifications.map((nota) => {
                            return (
                                <NotificationCard key={nota.idNotification}
                                    pic={nota.userSender.photo}
                                    name={nota.userSender.nameUser}
                                    description={nota.title} />
                            )
                        })
                        :
                        <Center>
                            <EmptyState type="correio" text="Você não possui notificações no momento" />
                        </Center>
                        
                }
            </Mask>
        </ContentBox>
    );

    return (
        <Styled>
            <Popover placement="bottom" content={content} trigger="click" getPopupContainer={(triggerNode) => triggerNode}>
                <IconNotification>
                    <Notifications style={{ fill: Colors.gray.grayWhite, fontSize: "33px" }} />
                </IconNotification>
            </Popover>
        </Styled>

    )
}

const Styled = styled.div`
  .ant-popover {
  }

  .ant-popover-inner-content {
    padding: 12px 10px 12px 20px;
  }
`;

const IconNotification = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 43px;
height: 43px;
background-color: ${Colors.green.greenAqua};
border-radius: 50%;
cursor: pointer;
`

const ContentBox = styled.div`
overflow-y: scroll;
height: 70vh;
width: 330px;

h1{
    color: ${Colors.blue.bluePrimary};
    font-size: 22px;
}

`

const Mask = styled.div`
margin-right: 10px;

`

const Center = styled.div `
display: flex;
align-items: center;
justify-content: center;
height: 60vh;
`