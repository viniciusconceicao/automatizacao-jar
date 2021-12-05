import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { CancelarConta } from '../../molecules/modal/CancelarConta';
import { SubMenu, Content } from './Configuracao';
import { Switch, Modal, Col } from 'antd';
import { SettingOutlined, SecurityScanOutlined, LockOutlined, RightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import { Button } from '../../molecules/Button';

const Privacidade = () => {

    const idStorage = localStorage.getItem('idUser');
    const statusStorage = localStorage.getItem('status');
    const [status, setStatus] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState([]);

    const history = useHistory();

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

    useEffect(() => {
        function updateStatus() {
            putInfo({ ...user, status });
            localStorage.setItem('status', status);
            console.log(status)
        }

        updateStatus()
    }, [status])


    function onChange(checked) {
        setStatus(checked);
        console.log(checked)
    }

    const getInfo = () => {
        api.get(`/api/users/${idStorage}`)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
                setStatus(response.data.status)
            })
    }

    const putInfo = async (dados) => {
        try {
            await api.put(`/api/users/${idStorage}`, dados);

        } catch (err) {
            console.log("erro")
        }
    }

    useEffect(() => getInfo(), [])


    return (
        <>
            <Col span={8}>
                <SubMenu>
                    <ul>
                        <li onClick={() => history.push('/configuracoes')}> <SettingOutlined />  Meus dados</li>
                        <li onClick={() => history.push('/configuracoes/seguranca')}><SecurityScanOutlined />  Segurança</li>
                        <li onClick={() => history.push('/configuracoes/privacidade')} className="active"><LockOutlined />  Privacidade</li>
                    </ul>
                </SubMenu>
            </Col>
            <Col span={16}>
                <Content>
                    <Privacy>
                        <h2>Privacidade</h2>

                        <CardPrivacy>
                            <div>
                                <h3>Visibilidade de conta {status ? <strong>ATIVO</strong> : <strong>INATIVO</strong>} </h3>
                                {status ?
                                    <p>Sua conta está visível para outros usuários. Caso desative esta opção,
                                    seu perfil estará oculto e não estará mais disponível em nossos campos de busca.</p>
                                    :
                                    <p>Sua conta não está visível para outros usuários. Caso ative esta opção,
                                    seu perfil será exibido em nossos campos de busca.</p>
                                }
                            </div>
                            <Switch
                                checked={status}
                                onChange={onChange}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </CardPrivacy>
                        <CardPrivacy onClick={showModal}>
                            <div>
                                <h3>Cancelar conta</h3>
                                <p>Se realizar o cancelamento de sua conta, todas as suas informações serão apagadas.</p>
                            </div>
                            <RightOutlined style={{ cursor: "pointer" }} />
                        </CardPrivacy>
                    </Privacy>
                </Content>
            </Col>



            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} className="modal" >

                <CancelarConta fecharModal={handleCancel} />

            </Modal>

        </>
    )
}

export default Privacidade;

const Privacy = styled.main`
h2 {
    color: ${Colors.gray.grayTitle};
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid ${Colors.gray.grayTab};
}
`

const CardPrivacy = styled.div`
margin: 40px 0px;
padding: 20px;
border-radius: 6px;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
border: 1px solid ${Colors.gray.grayTab};

h3 {
    font-size: 16px;
    color: ${Colors.gray.grayTitle};
}

p {
    color: ${Colors.gray.grayText};
    width: 90%;
}

svg {
    color: ${Colors.green.greenAqua};
    font-size: 18px;
}
`