import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { SubMenu, Content, Grade, Collapse } from './Configuracao';
import { Button } from '../../molecules/Button';
import { useHistory } from 'react-router';
import { message, Col, Skeleton } from 'antd';
import { SettingOutlined, SecurityScanOutlined, LockOutlined, RightOutlined } from '@ant-design/icons';
import TextField from '@material-ui/core/TextField';

const Seguranca = () => {

    const history = useHistory();
    const idStorage = localStorage.getItem('idUser');

    const [collapseEmail, setCollapseEmail] = useState(false);
    const [collapseSenha, setCollapseSenha] = useState(false);

    const [user, setUser] = useState([]);
    const [email, setEmail] = useState("");
    const [passwordOld, setPasswordOld] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);

    const getInfo = () => {
        setLoading(true);
        api.get(`/api/users/${idStorage}`)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
                setLoading(false)
            })
    }

    const putInfo = async (dados) => {

        setLoadingButton(true);

        try {
            await api.put(`/api/users/${idStorage}`, dados);
            message.success('Informação atualizada com sucesso!');

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (err) {
            message.error('Erro ao atualizar informação. Tente novamente!');
        }

        setLoadingButton(false);

    }

    useEffect(() => getInfo(), [])

    return (
        <>
            <Col span={8}>
                <SubMenu>
                    <ul>
                        <li onClick={() => history.push('/configuracoes')}> <SettingOutlined />  Meus dados</li>
                        <li onClick={() => history.push('/configuracoes/seguranca')} className="active"><SecurityScanOutlined />  Segurança</li>
                        <li onClick={() => history.push('/configuracoes/privacidade')}><LockOutlined />  Privacidade</li>
                    </ul>
                </SubMenu>
            </Col>
            <Col span={16}>
                <Content>
                    <Security>
                        <h2>Acesso a conta</h2>
                        <Grade>
                            <table>
                                <tbody>
                                    <tr onClick={() => collapseEmail ?
                                        setCollapseEmail(false)
                                        :
                                        setCollapseEmail(true)}>
                                        <td>E-mail</td>
                                        <td className="value-config">{loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.email}</td>
                                        <td className="arrow-config"><RightOutlined /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="td-collapse">
                                            {collapseEmail ?
                                                <Collapse>
                                                    <h4>Editar E-mail</h4>
                                                    <div className="box-collapse">
                                                        <TextField
                                                            size="small"
                                                            label="Email"
                                                            defaultValue={user.email}
                                                            variant="outlined"
                                                            type="text"
                                                            style={{ width: "70%", marginRight: "10px" }}
                                                            onChange={e => setEmail(e.target.value)} />
                                                        <Button
                                                            loading={loadingButton}
                                                            size="small"
                                                            contentText="Atualizar Email"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                putInfo({ ...user, email })
                                                            }} />
                                                    </div>
                                                </Collapse>
                                                :
                                                null}
                                        </td>
                                    </tr>
                                    <tr onClick={() => collapseSenha ?
                                        setCollapseSenha(false)
                                        :
                                        setCollapseSenha(true)}>
                                        <td>Senha</td>
                                        <td className="value-config">{loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : <span>*********</span>}</td>
                                        <td className="arrow-config"><RightOutlined /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="td-collapse">
                                            {collapseSenha ?
                                                <Collapse>
                                                    <h4>Trocar Senha</h4>
                                                    <div className="box-collapse--senha">
                                                        <TextField
                                                            size="small"
                                                            label="Senha atual"
                                                            variant="outlined"
                                                            type="password"
                                                            style={{ width: "70%", marginBottom: "15px" }}
                                                            onChange={e => setPasswordOld(e.target.value)} />
                                                        <TextField
                                                            size="small"
                                                            label="Nova senha"
                                                            variant="outlined"
                                                            type="password"
                                                            style={{ width: "70%", marginBottom: "15px" }}
                                                            onChange={e => setPassword(e.target.value)} />
                                                        <TextField
                                                            size="small"
                                                            label="Confirmar nova senha"
                                                            variant="outlined"
                                                            type="password"
                                                            style={{ width: "70%", marginBottom: "15px" }}
                                                            onChange={e => setPasswordConfirm(e.target.value)} />
                                                        <Button
                                                            loading={loadingButton}
                                                            size="small"
                                                            contentText="Trocar minha senha"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (password === passwordConfirm && passwordOld === user.password) {
                                                                    putInfo({ ...user, password })
                                                                } else {
                                                                    message.error('Senhas não coincidem. Tente novamente');
                                                                }
                                                            }} />
                                                    </div>
                                                </Collapse>
                                                :
                                                null}
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </Grade>
                    </Security>
                </Content>
            </Col>
        </>
    )
}

export default Seguranca;

message.config({
    top: 100,
});


const Security = styled.main`
h2 {
    color: ${Colors.gray.grayTitle};
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid ${Colors.gray.grayTab};
}

.box-collapse--senha {
    padding-top: 20px;

}
`