import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../shared/Colors';
import { Modal, message } from 'antd';
import { FacebookFilled, InstagramFilled, LinkedinFilled, GithubFilled } from '@ant-design/icons';
import { AddCircleOutline } from '@material-ui/icons';
import RedesSociais from './modal/RedesSociais';
import api from '../../services/api';
import Success from '../organisms/Success';

const Network = () => {

    const idStorage = localStorage.getItem('idUser')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [vazio, setVazio] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [data, setData] = useState({
        facebookName: "",
        facebookUrl: "",
        instagramName: "",
        instagramUrl: "",
        linkedinName: "",
        linkedinUrl: "",
        githubName: "",
        githubUrl: "",
    })

    function newNetworks(e) {
        e.preventDefault();

        if (!vazio) {
            putNetworks(e)
        } else {
            postNetworks(e)
        }

    }

    async function postNetworks(e) {
        e.preventDefault();

        setLoadingButton(true)
        try {
            await api.post(`/api/networks/${idStorage}`, data);
            setSucesso(true);
            console.log("sucesso ao cadastrar as redes sociais!")
        } catch (err) {
            console.log("erro ao cadastrar redes sociais", err)
        }

        setLoadingButton(false)

    }

    async function putNetworks(e) {
        e.preventDefault();

        setLoadingButton(true)
        try {
            await api.put(`/api/networks/${idStorage}`, data);
            setSucesso(true);


            console.log("sucesso ao atualizar as redes sociais!")
        } catch (err) {
            message.error('Erro ao atualizar redes sociais. Tente novamente!');
            console.log("erro ao atualizar redes sociais", err)
        }

        setLoadingButton(false)

    }

    async function getNetworks() {
        try {
            const response = await api.get(`/api/networks/${idStorage}`);

            if (response.status === 204) {
                setVazio(true)
            }

            setData(response.data)
            console.log("sucesso ao buscar as redes sociais!", response.data)
        } catch (err) {
            console.log("erro ao buscar redes sociais", err)
        }

    }

    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        console.log(newData)
        setData(newData)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => getNetworks(), []);


    return (
        <>
            <Icons>
                <a href={data.linkedinUrl}>
                    <LinkedinFilled />
                </a>
                <a href={data.facebookUrl}>
                    <FacebookFilled />
                </a>
                <a href={data.instagramUrl}>
                    <InstagramFilled />
                </a>
                <a href={data.githubUrl}>
                    <GithubFilled />
                </a>
                <AddCircleOutline className="add" onClick={showModal} />
            </Icons>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>

                {
                    sucesso ?

                        <Success
                            text="Redes sociais adicionadas com sucesso!"
                            type="2"
                            textButton="Revisar minhas redes sociais"
                            onclick={() => setSucesso(false)} />

                        :
                        <RedesSociais
                            facebook={{ value: data.facebookName, id: "facebookName", onchange: e => handle(e) }}
                            facebookUrl={{ value: data.facebookUrl, id: "facebookUrl", onchange: e => handle(e) }}
                            instagram={{ value: data.instagramName, id: "instagramName", onchange: e => handle(e) }}
                            instagramUrl={{ value: data.instagramUrl, id: "instagramUrl", onchange: e => handle(e) }}
                            linkedin={{ value: data.linkedinName, id: "linkedinName", onchange: e => handle(e) }}
                            linkedinUrl={{ value: data.linkedinUrl, id: "linkedinUrl", onchange: e => handle(e) }}
                            git={{ value: data.githubName, id: "githubName", onchange: e => handle(e) }}
                            gitUrl={{ value: data.githubUrl, id: "githubUrl", onchange: e => handle(e) }}
                            submit={newNetworks}
                            loading={loadingButton} />
                }
            </Modal>
        </>
    )
}

export default Network;

const Icons = styled.div`
font-size: 30px;
display: flex;
cursor: pointer;
color: ${Colors.green.greenPrimary};
        

    .add {
        font-size: 40px;
        color: #C4C4C4;
        cursor: pointer;
        transition: all 0.5s
    }

    .add:hover {
        transform: scale(1.1);
        color: ${Colors.blue.bluePrimary};
    }

    svg {
        padding-right: 10px;
        font-size: 40px;
    }
`
