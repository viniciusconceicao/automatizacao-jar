import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../shared/Colors';
import { Modal } from 'antd';
import { Button } from './Button';
import { ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const Exit = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const history = useHistory();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // window.location.href = "http://localhost:3000/"
        setIsModalVisible(false);
        localStorage.clear();
        history.push('/');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <ExitButton onClick={showModal}>
                <ExitToApp className="icon" style={{ fill: Colors.blue.bluePrimary }} />
                <span>Sair</span>
            </ExitButton>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} className="modal" >
                <ExitModal>
                    <ModalText>Você tem certeza que deseja sair?</ModalText>
                    <div>
                        <Button contentText="Não" primary={false} onClick={handleCancel} />
                        <Button contentText="Sim" onClick={handleOk} style={{marginLeft: "10px"}} />
                    </div>
                </ExitModal>
            </Modal>
        </>
    )
}

export default Exit;

const ExitButton = styled.span`
cursor: pointer;
`

const ModalText = styled.h1`
font-size: 16px;
color: ${Colors.gray.grayTitle};
`

const ExitModal = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 30px;

div {
    display: flex;
}
`