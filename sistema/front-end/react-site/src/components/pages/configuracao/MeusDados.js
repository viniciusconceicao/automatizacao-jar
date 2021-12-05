import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import axios from 'axios'
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { SubMenu, Content, Grade, Collapse } from './Configuracao';
import { Button } from '../../molecules/Button';
import { useHistory } from 'react-router';
import { Radio, message, Col, Skeleton } from 'antd';
import { SettingOutlined, SecurityScanOutlined, LockOutlined, RightOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import TextField from '@material-ui/core/TextField';


const MeusDados = () => {

    const history = useHistory();
    const idStorage = localStorage.getItem('idUser');
    const roleStorage = localStorage.getItem('role');

    const [collapseName, setCollapseName] = useState(false);
    const [collapseDate, setCollapseDate] = useState(false);
    const [collapseDoc, setCollapseDoc] = useState(false);
    const [collapseTel, setCollapseTel] = useState(false);
    const [collapseLocal, setCollapseLocal] = useState(false);

    const [user, setUser] = useState([]);
    const [value, setValue] = useState(1);
    const [nameUser, setNameUser] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [locality, setLocality] = useState("");
    const [cardFile, setCardFile] = useState();


    const onChange = e => {
        setValue(e.target.value);
        let role = "dev"

        if (e.target.value === 1) {
            role = "dev"
        } else {
            role = "clt"
        }

        putInfo({ ...user, role });
        localStorage.setItem('role', role);
    };

    const getInfo = () => {
        setLoading(true)
        api.get(`/api/users/${idStorage}`)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
                setValue(response.data.role === "dev" ? 1 : 2)
                setLoading(false);
            })
    }

    const getLayout = () => {
        axios({
            url: 'http://localhost:8080/public/layout.docx',
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Documento de layout.docx');
            document.body.appendChild(link);
            link.click();
            console.log("download concluído") 

        });
    }

    const handleUploadFile = (e) => setCardFile(e.target.files[0]);

    const uploadArquivo = async () => {

        setLoadingButton(true)

        const data = new FormData();
        data.append("arquivo", cardFile);

        axios.post('http://localhost/:8080/upload',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function (response) {
            message.success('Sucesso ao fazer upload do arquivo. Confira seu perfil e as novas informações adicionadas!');
            console.log('Sucesso ao fazer upload de arquivo!!', response);

            for(let i = 0; i < response.data.length -1; i++) {
                postNewExperience(response.data[i])
                postNewFormation(response.data[i])
            }

        })
            .catch(function (err) {
                message.error('Erro ao fazer upload do arquivo. Tente novamente');
                console.log('Erro em fazer upload de arquivo!!', err);
            });

        setLoadingButton(false)
    };

    const putInfo = async (dados) => {

        setLoadingButton(true)
        try {
            await api.put(`/api/users/${idStorage}`, dados);
            message.success('Informação atualizada com sucesso!');

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (err) {
            message.error('Erro ao atualizar informação. Tente novamente!');
        }

        setLoadingButton(false)
    }

    const postNewExperience = (experiencia) => {
        try {
          api.post(`/api/experiences/${idStorage}`, experiencia)
          console.log("sucesso ao add experiencia!")
        } catch (err) {
          console.log("erro ao add experiencia")
        }
      }

      const postNewFormation = (formation) => {
        try {
          api.post(`/api/formations/${idStorage}`, formation)
          console.log("sucesso ao add formacao!")
        } catch (err) {
          console.log("erro ao add formacao")
        }
      }


    useEffect(() => getInfo(), [])

    return (
        <>
            <Col span={8}>
                <SubMenu>
                    <ul>
                        <li onClick={() => history.push('/configuracoes')} className="active"> <SettingOutlined />  Meus dados</li>
                        <li onClick={() => history.push('/configuracoes/seguranca')}><SecurityScanOutlined />  Segurança</li>
                        <li onClick={() => history.push('/configuracoes/privacidade')}><LockOutlined />  Privacidade</li>
                    </ul>
                </SubMenu>
            </Col>
            <Col span={16}>
                <Content>
                    <Dados>
                        <h2>Dados pessoais</h2>
                        <Grade>
                            <table>
                                <tbody>
                                    <tr onClick={() => collapseName ?
                                        setCollapseName(false)
                                        :
                                        setCollapseName(true)}>
                                        <td>Nome Completo</td>
                                        <td className="value-config">{loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.nameUser}</td>
                                        <td className="arrow-config">
                                            <RightOutlined />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="td-collapse">
                                            {collapseName ?
                                                <Collapse>
                                                    <h4>Editar nome</h4>
                                                    <div className="box-collapse">
                                                        <TextField
                                                            size="small"
                                                            label="Nome completo"
                                                            defaultValue={user.nameUser}
                                                            variant="outlined"
                                                            type="text"
                                                            style={{ width: "70%", marginRight: "10px" }}
                                                            onChange={e => setNameUser(e.target.value)} />
                                                        <Button
                                                            loading={loadingButton}
                                                            size="small"
                                                            contentText="Atualizar nome"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                putInfo({ ...user, nameUser })
                                                            }} />
                                                    </div>
                                                </Collapse>
                                                :
                                                null}
                                        </td>
                                    </tr>
                                    <tr onClick={() => collapseDate ?
                                        setCollapseDate(false)
                                        :
                                        setCollapseDate(true)}>
                                        <td>Data de nascimento</td>
                                        <td className="value-config">{loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.birthDate}</td>
                                        <td className="arrow-config">
                                            <RightOutlined />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="td-collapse">
                                            {collapseDate ?
                                                <Collapse>
                                                    <h4>Editar data de nascimento</h4>
                                                    <div className="box-collapse">
                                                        <TextField
                                                            size="small"
                                                            label="Data de nascimento"
                                                            defaultValue={user.birthDate /*split('-').reverse().join('-') */}
                                                            variant="outlined"
                                                            type="text"
                                                            style={{ width: "70%", marginRight: "10px" }}
                                                            onChange={e => setBirthDate(e.target.value)} />
                                                        <Button
                                                            loading={loadingButton}
                                                            size="small"
                                                            contentText="Atualizar data"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                putInfo({ ...user, birthDate })
                                                            }} />

                                                    </div>
                                                </Collapse>
                                                :
                                                null}
                                        </td>
                                    </tr>

                                    <tr onClick={() => collapseDoc ?
                                        setCollapseDoc(false)
                                        :
                                        setCollapseDoc(true)}>
                                        <td>Documento</td>
                                        <td className="value-config">{loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.cpf || user.cnpj}</td>
                                        <td className="arrow-config">
                                            <RightOutlined />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="td-collapse">
                                            {collapseDoc ?
                                                <Collapse>
                                                    <h4>Editar documento</h4>
                                                    <div className="box-collapse">
                                                        <TextField
                                                            size="small"
                                                            label="Documento"
                                                            defaultValue={user.cpf}
                                                            variant="outlined"
                                                            type="text"
                                                            style={{ width: "70%", marginRight: "10px" }}
                                                            onChange={e => setCpf(e.target.value)} />
                                                        <Button
                                                            loading={loadingButton}
                                                            size="small"
                                                            contentText="Atualizar documento"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                putInfo({ ...user, cpf })
                                                            }} />
                                                    </div>
                                                </Collapse>
                                                :
                                                null}
                                        </td>
                                    </tr>

                                    <tr onClick={() => collapseTel ?
                                        setCollapseTel(false)
                                        :
                                        setCollapseTel(true)}>
                                        <td>Telefone</td>
                                        <td className="value-config">{loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.phone}</td>
                                        <td className="arrow-config">
                                            <RightOutlined />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="td-collapse">
                                            {collapseTel ?
                                                <Collapse>
                                                    <h4>Editar telefone</h4>
                                                    <div className="box-collapse">
                                                        <TextField
                                                            size="small"
                                                            label="Telefone"
                                                            defaultValue={user.phone}
                                                            variant="outlined"
                                                            type="text"
                                                            style={{ width: "70%", marginRight: "10px" }}
                                                            onChange={e => setPhone(e.target.value)} />
                                                        <Button
                                                            loading={loadingButton}
                                                            size="small"
                                                            contentText="Atualizar telefone"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                putInfo({ ...user, phone })
                                                            }} />
                                                    </div>
                                                </Collapse>
                                                :
                                                null}
                                        </td>
                                    </tr>
                                    <tr onClick={() => collapseLocal ?
                                        setCollapseLocal(false)
                                        :
                                        setCollapseLocal(true)}>
                                        <td>Localidade</td>
                                        <td className="value-config">{loading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : user.locality}</td>
                                        <td className="arrow-config">
                                            <RightOutlined />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="td-collapse">
                                            {collapseLocal ?
                                                <Collapse>
                                                    <h4>Editar localidade</h4>
                                                    <div className="box-collapse">
                                                        <TextField
                                                            size="small"
                                                            label="Cidade - Estado"
                                                            defaultValue={user.locality}
                                                            variant="outlined"
                                                            type="text"
                                                            style={{ width: "70%", marginRight: "10px" }}
                                                            onChange={e => setLocality(e.target.value)} />
                                                        <Button
                                                            loading={loadingButton}
                                                            size="small"
                                                            contentText="Atualizar localidade"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                putInfo({ ...user, locality })
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
                        <h2>Minha conta</h2>

                        <CardConta>
                            <div>
                                <h3>Perfil de conta</h3>
                                <p>Sua conta será customizada de acordo com seu perfil de usuário</p>
                            </div>
                            <p className="radio-card">
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={1}>Sou um profissional</Radio>
                                    <Radio value={2}>Sou um cliente</Radio>
                                </Radio.Group>
                            </p>
                        </CardConta>

                        {
                            roleStorage === "dev" ?

                                <>
                                    <CardConta>
                                        <div>
                                            <h3>Adicionar multiplas informações de perfil</h3>
                                            <p>Faça o upload de seu arquivo .txt no formato padrão exigido pelo documento de layout (você pode baixa-lo logo abaixo) para adicionar suas informações de perfil. </p>
                                            <div className="upload-box">
                                                <input type="file" accept="application/txt" onChange={handleUploadFile} />
                                                <Button onClick={uploadArquivo} contentText="Enviar arquivo" size="small" style={{ marginLeft: "20px" }} loading={loadingButton} />
                                            </div>
                                        </div>
                                        <div className="arrow-config">
                                            <UploadOutlined />
                                        </div>
                                    </CardConta>

                                    <CardConta onClick={getLayout} style={{ cursor: "pointer" }}>
                                        <div>
                                            <h3>Baixar documento word para padrão de upload</h3>
                                            <p>Este documento é referente ao padrão a ser seguido para adicionar multiplas informações em seu perfil.</p>
                                        </div>
                                        <div className="arrow-config">
                                            <DownloadOutlined />
                                        </div>
                                    </CardConta>
                                </>
                                :
                                null
                        }

                    </Dados>
                </Content>
            </Col>


        </>
    )
}

export default MeusDados;

message.config({
    top: 100,
});

const Dados = styled.main`
h2 {
    color: ${Colors.gray.grayTitle};
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid ${Colors.gray.grayTab};
}
`

const CardConta = styled.div`
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
    width: 100%;
}

p {
    color: ${Colors.gray.grayText};
    width: 90%;
}

.radio-card {
    span {
        color: ${Colors.blue.bluePrimary};
    }
}

svg {
    color: ${Colors.green.greenAqua};
    font-size: 18px;
}

.upload-box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 57px;
    padding: 15px;
    height: 80px;
    border-radius: 5px;
    width: 90%;
    background: ${Colors.gray.grayMilk};
}

`