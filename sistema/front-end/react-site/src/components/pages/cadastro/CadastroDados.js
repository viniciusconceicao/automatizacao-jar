import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import TextField from '@material-ui/core/TextField';
import { Radio } from 'antd';
import { Button } from '../../molecules/Button';


const CadastroDados = ({ aoEnviar, voltar, validacoes }) => {

    const [radio, setRadio] = useState(1);
    const [nameUser, setNameUser] = useState();
    const [birthDate, setBirthDate] = useState();
    const [cpf, setCpf] = useState();
    const [nameCompany, setNameCompany] = useState();
    const [cnpj, setCnpj] = useState();
    const [erros, setErros] = useState({ cpf: { valido: true, texto: "" }, nameUser: { valido: true, texto: "" } });

    function validarCampos(event) {
        const { name, value } = event.target;
        const novoEstado = { ...erros };
        novoEstado[name] = validacoes[name](value);
        setErros(novoEstado);
      }
      function possoEnviar() {
        for (let campo in erros) {
          if (!erros[campo].valido) {
            return false;
          }
        }
        return true;
      }

    const onChangeRadio = e => {
        console.log('radio checked', e.target.value);
        setRadio(e.target.value);

        const inputsPJ = document.querySelector('#formPessoaJuridica')
        const inputPF = document.querySelector('#formPessoaFisica')

        if (e.target.value === 1) {
            inputsPJ.style.display = "none";
            inputPF.style.display = "block";
            console.log("cliquei no 1")
        } else {
            inputsPJ.style.display = "block";
            inputPF.style.display = "none";
            console.log("cliquei no 2 ksks")
        }
    }

    return (
        <>
            <div>
                <h1 className="formulario__titulo">Informações Pessoais</h1>
                <p className="formulario__desc"><b>1/2</b> Informe abaixo seus dados pessoais:</p>
            </div>

            <form onSubmit={e => {
                e.preventDefault();
                if (possoEnviar()) {
                    aoEnviar({ nameUser, birthDate, cpf, nameCompany, cnpj })
                }
            }}>

                <Options>
                    <span className="desc"> Eu sou: </span>
                    <Radio.Group onChange={onChangeRadio} value={radio}>
                        <Radio value={1}>Pessoa física</Radio>
                        <Radio value={2}>Pessoa jurídica</Radio>
                    </Radio.Group>
                </Options>

                <div className="formulario">
                    <TextField
                        value={nameUser}
                        name= "nameUser"
                        error={!erros.nameUser.valido}
                        helperText={erros.nameUser.texto}
                        id="inputnameUser"
                        label="Nome Completo"
                        variant="outlined"
                        style={{ margin: "12px 0" }}
                        onChange={e => setNameUser(e.target.value)}
                        onBlur={validarCampos}
                        required />
                    <TextField
                        value={birthDate}
                        name="birthDate"
                        error={false}
                        id="inputbirthDate"
                        type="date"
                        label="Data de nascimento"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: "12px 0" }}
                        onChange={e => setBirthDate(e.target.value)}
                        required />

                    <InputsPJ id="formPessoaJuridica">
                        <TextField
                            value={nameCompany}
                            name="nameCompany"
                            error={false}
                            id="inputnameCompany"
                            label="Nome da empresa"
                            variant="outlined"
                            style={{ margin: "12px 0", width: "100%" }}
                            onChange={e => setNameCompany(e.target.value)} />
                        <TextField
                            value={cnpj}
                            name="cnpj"
                            error={false}
                            id="inputCnpj"
                            label="CNPJ"
                            variant="outlined"
                            style={{ margin: "12px 0", width: "100%" }}
                            onChange={e => setCnpj(e.target.value)} />
                    </InputsPJ>

                    <section id="formPessoaFisica">
                        <TextField
                            value={cpf}
                            name="cpf"
                            error={!erros.cpf.valido}
                            helperText={erros.cpf.texto}
                            id="inputCpf"
                            label="CPF"
                            variant="outlined"
                            style={{ margin: "12px 0", width: "100%" }}
                            onChange={e => setCpf(e.target.value)}
                            onBlur={validarCampos} />
                    </section>

                    <div className="formulario__botoes">
                        <Button
                            onClick={voltar}
                            contentText="Voltar" 
                            style={{ width: "100%", marginRight: "10px" }}
                            primary={false} />
                        <Button
                            contentText="Próximo" 
                            style={{ width: "100%" }}
                            type="submit" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default CadastroDados;

const Options = styled.div`
margin: 20px 0;

.desc {
    padding: 0 10px;
}

label {
    font-size: 14px;
    color: ${Colors.blue.bluePrimary};
}
`

const InputsPJ = styled.section`
display: none;
`
