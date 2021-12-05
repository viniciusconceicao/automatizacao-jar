import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { CameraFilled } from '@ant-design/icons';
import { Modal } from 'antd'
import { Button } from '../molecules/Button';

function PhotoProfile(props) {

    const {
        pic,
    } = props

    const idStorage = localStorage.getItem('idUser')
    const [photo, setPhoto] = useState(); // upload de foto
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const handleUploadFile = (e) => setPhoto(e.target.files[0]);


    const uploadArquivo = async () => {
        setLoadingButton(true);

        const data = new FormData();
        data.append("file", photo);

        axios.post(`http://localhost:8080/api/users/file/${idStorage}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function (response) {
            console.log('Sucesso ao fazer upload de foto!!', response);
            window.location.reload();

        })
            .catch(function (err) {
                console.log('Erro em fazer upload de foto!!', err);
            });

        setLoadingButton(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <>
            <ConteinerPerfilImage>
                <img className="image-profile" src={pic}></img>
                <CameraFilled className="icon-cam" onClick={showModal} />
            </ConteinerPerfilImage>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <ContentModal>
                    <h3>Trocar foto de perfil</h3>
                    <label>Selecione uma foto no formato PNG / JPG / JPEG </label>
                    <div className="photo-modal">
                        <ConteinerPerfilImage>
                            <img className="image-profile" src={pic}></img>
                        </ConteinerPerfilImage>
                    </div>
                    <input className="upload" type="file" onChange={handleUploadFile} />
                    <Button onClick={uploadArquivo} contentText="Carregar foto" style={{ width: "100%" }} loading={loadingButton} />
                </ContentModal>

            </Modal>
        </>
    )
}

export default PhotoProfile;

const ContentModal = styled.div`

h3 {
    font-size: 16px;
}
padding: 20px;

.upload {
    padding: 20px 0;
}

.photo-modal {
    padding-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.image-profile {
    border: 3px dotted #44CF6C !important;
    width: 180px !important;
    height: 180px !important;
}
`

const ConteinerPerfilImage = styled.div`
position: relative;
display: flex;

.icon-cam {
    font-size: 35px;
    color: #44CF6C;
    display: flex;
    margin-top: 94px;
    margin-left: -28px;
    justify-content: flex-start;
    cursor: pointer;
    transition: 0.5s
}

.icon-cam:hover {
    color: #52c41a;
    transform: scale(1.1);
}

.image-profile{
    object-fit: cover;
	border-radius: 50%;
    border: 3px solid #44CF6C;
    width: 160px;
    height: 160px;
}
`
