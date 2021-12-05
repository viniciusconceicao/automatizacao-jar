import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../services/api';
import { Colors } from '../../../shared/Colors';
import Success from '../../organisms/Success';
import { Button } from '../Button';

const EditarDesc = (props) => {

    const {
        onUpdate,
        dev = true,
        idStorage = localStorage.getItem('idUser'),
    } = props

    const [user, setUser] = useState([]);
    const [descriptionUser, setDescriptionUser] = useState();
    const [sucesso, setSucesso] = useState();
    const [loadingButton, setLoadingButton] = useState(false);

    const getDesc = () => {
        api.get(`/api/users/${idStorage}`)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
                setDescriptionUser(response.data.descriptionUser)
            })
    }

    async function updateDesc(dados) {

        setLoadingButton(true)

        try {
            await api.put(`/api/users/${idStorage}`, dados);
            setSucesso(true);
            console.log(descriptionUser);

        } catch (err) {
            message.error('Erro ao atualizar descrição. Tente novamente!');
        }

        setLoadingButton(false)
    }

    useEffect(() => getDesc(), [sucesso])

    return (
        <>
            <EditContainer>
                {
                    sucesso ?

                        <Success
                            text="Descrição atualizada com sucesso!"
                            type="2"
                            textButton="Atualizar página"
                            onclick={() => window.location.reload()} />

                        :
                        <>
                            <h3>Minha descrição</h3>
                            {dev ?
                                <p>Sua descrição estará visível em seu perfil e nos campos de busca. </p>
                                :
                                <p>Sua descrição estará visível em seu perfil e nos campos de busca para os profissionais identificarem sua necessidade</p>}

                            <textarea
                                maxLength="200"
                                defaultValue={user.descriptionUser}
                                placeholder={dev ? "descreva brevemente suas habilidades..." : "descreva brevemente sua necessidade..."}
                                onChange={e => setDescriptionUser(e.target.value)} />

                            <p className="contador">{descriptionUser ? descriptionUser.length : 0}/200 caracteres permitidos</p>

                            <Button
                                loading={loadingButton}
                                contentText="Atualizar"
                                style={{ width: "100%" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateDesc({ ...user, descriptionUser })
                                }} />

                        </>
                }


            </EditContainer>
        </>
    )
}

export default EditarDesc;

const EditContainer = styled.div` 
color: ${Colors.gray.grayText};
padding: 20px;

h3 {
    color: ${Colors.gray.grayTitle};
    font-size: 16px

}

p {
    font-size: 14px;

}

textarea {
    padding: 15px;
    border-radius: 5px;
    border: 1px solid ${Colors.gray.grayTabLine};
    width: 100%;
    height: 130px;
}

.contador {
    color: ${Colors.blue.bluePrimary};
    text-align: right;
    padding: 5px 0 10px;
}
`