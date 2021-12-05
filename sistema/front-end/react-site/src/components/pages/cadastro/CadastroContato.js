import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '../../molecules/Button';

const CadastroContato = ({ aoEnviar, voltar, validacoes }) => {
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [erros, setErros] = useState({ email: { valido: true, texto: "" }, phone: { valido: true, texto: "" } });

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

    return (
        <>
            <div>
                <h1 className="formulario__titulo">Informações Pessoais</h1>
                <p className="formulario__desc"><b>2/2</b> Informe abaixo seus meios de contato:</p>
            </div>

            <form
                onSubmit={(e) => {
                    if (possoEnviar()) {
                        e.preventDefault();
                        aoEnviar({ email, phone });
                    }
                }}>
                <div className="formulario">
                    <TextField
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={validarCampos}
                        error={!erros.email.valido}
                        helperText={erros.email.texto}
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                        style={{ margin: "12px 0" }} />
                    <TextField
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        onBlur={validarCampos}
                        error={!erros.phone.valido}
                        helperText={erros.phone.texto}
                        id="phone"
                        name="phone"
                        label="Telefone"
                        variant="outlined"
                        type="number"
                        required
                        style={{ margin: "12px 0" }} />
                </div>
                <div className="formulario__botoes">
                    <Button
                        onClick={voltar}
                        contentText="Voltar" 
                        style={{ width: "100%", marginRight: "10px"  }}
                        primary={false} />
                    <Button
                        type="submit"
                        contentText="Próximo"
                        style={{ width: "100%" }} />
                </div>
            </form>

        </>
    )
}

export default CadastroContato;