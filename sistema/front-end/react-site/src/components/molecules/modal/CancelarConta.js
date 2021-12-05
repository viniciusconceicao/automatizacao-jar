import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { Button } from '../Button';
import { Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

export function CancelarConta(props) {

    const {
        fecharModal,
        idStorage = localStorage.getItem('idUser'),
    } = props

    const history = useHistory();

    const [user, setUser] = useState();

    useEffect(() => {
        api.get(`/api/users/${idStorage}`)
        .then(response => {
            console.log(response.data)
            setUser(response.data)
        })
    }, [])


    async function cancelProfile(id) {
        try {
            
            await api.delete(`/api/users/${idStorage}`);
            console.log("deletado")
            history.push('/')


        } catch (err) {
            console.log("erro ao deletar")

        }
    }

    return (
        <>
            <Warning>
                <h1>Você tem certeza que deseja cancelar a conta?</h1>
                <Alert
                    message="Esta ação será irreversível!"
                    description="Todos os seus dados referentes a esta conta serão apagados
                                em nosso sistema, sendo necessário um novo cadastro para voltar a usufruir os benefícios
                                da SearchDevelopers."
                    type="error"
                    style={{ margin: "20px 0" }}
                />
                <div className="botoes-alert">
                    <Button
                        contentText="Voltar"
                        primary={false}
                        style={{ flexGrow: "1", borderColor: Colors.red.redAlert, color: Colors.red.redAlert }}
                        onClick={fecharModal} />
                    <Button
                        contentText="Cancelar minha conta"
                        style={{ backgroundColor: Colors.red.redAlert, borderColor: Colors.red.redAlert, marginLeft: "10px" }}
                        onClick={() => cancelProfile(user)} />
                </div>
            </Warning>

        </>
    )
}

const Warning = styled.div`
padding: 30px;

h1 {
    font-size: 16px;
    color: ${Colors.gray.grayTitle};
}

.botoes-alert {
    display: flex;
}
`