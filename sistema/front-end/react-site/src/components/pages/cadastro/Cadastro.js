import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import './index.css';
import { Colors } from '../../../shared/Colors';
import { HeaderPainel } from '../../organisms/header/HeaderPainel';
import { Fab } from '../../molecules/Fab';
import { Steps } from 'antd';
import { validarCpf, validarSenha, validarNome, validarEmail, validarTelefone } from '../../../shared/Validacoes'
import CadastroConcluido from './CadastroConcluido';
import CadastroErro from './CadastroErro';
import CadastroContato from './CadastroContato';
import CadastroDados from './CadastroDados';
import CadastroInicio from './CadastroInicio';
import CadastroSenha from './CadastroSenha';
import api from '../../../services/api.js'
import { useHistory } from 'react-router-dom'

const Cadastro = () => {
    const [etapaAtual, setEtapaAtual] = useState(0);
    const [dadosColetados, setDadosColetados] = useState({});
    const [final, setFinal] = useState(true);

    const next = () => {
        setEtapaAtual(etapaAtual + 1);
    };

    const prev = () => {
        setEtapaAtual(etapaAtual - 1);
    };

    const history = useHistory();

    async function onSubmit(dados) {
        console.log(dados)
        try {
            await api.post('/api/users/', dados);
            console.log('Conta foi cadastrada com sucesso!');
            setFinal(true)
        } catch (err) {
            console.log('Erro ao cadastrar.');
            setFinal(false)
        }
    }

    useEffect(() => {
        if (etapaAtual === forms.length - 1) {
            onSubmit(dadosColetados);
        }
    })

    const forms = [
        <CadastroInicio
            aoEnviar={coletarDados} />,
        <CadastroDados
            aoEnviar={coletarDados}
            voltar={prev}
            validacoes={{ cpf: validarCpf, nameUser: validarNome }} />,
        <CadastroContato
            aoEnviar={coletarDados}
            voltar={prev}
            validacoes={{ email: validarEmail, phone: validarTelefone }} />,
        <CadastroSenha
            aoEnviar={coletarDados}
            voltar={prev}
            validacoes={{ password: validarSenha }} />,
            final ? <CadastroConcluido /> : <CadastroErro/>,
    ];

    function coletarDados(dados) {
        setDadosColetados({ ...dadosColetados, ...dados });
        next();
    }

    const { Step } = Steps;
    const steps = [
        { title: 'Perfil'},
        { title: 'Dados' },
        { title: 'Contatos' },
        { title: 'Senha' },
        { title: 'Final' },
    ];


    return (
        <>
            <HeaderPainel cadastro />
            <Template>
                <BoxForm>
                    <Steps current={etapaAtual} className="step__cadastro">
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content">{steps[etapaAtual].content}</div>
                    <FormTemplate>
                        {forms[etapaAtual]}
                    </FormTemplate>
                </BoxForm>
            </Template>
            <Fab></Fab>
        </>
    )
}

export default Cadastro;

const Template = styled.body`
padding-top: 10vh;
overflow-x: hidden;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: flex-start;
background: linear-gradient(180deg, rgba(61,219,196,1) 0%, rgba(64,230,158,1) 50%, rgba(68,207,108,1) 100%);
`

const BoxForm = styled.div`
margin: 28px 0;
padding: 40px;
width: 57%;
height: auto;
background-color: ${Colors.gray.grayWhite};
border-radius: 10px;
`

const FormTemplate = styled.div `
width: 95%;
margin: auto;
`