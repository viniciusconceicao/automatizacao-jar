import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../molecules/Button';
import Git from '../../../assets/github.png'

const CadastroGit = () => {
    return (
        <>
            <Github>
                <h1 className="formulario__titulo">Quase lá... <br /> Gostaria de conectar o seu GitHub com seu perfil?</h1>
                <p className="formulario__desc">Com esta integração, seus dados e projetos serão exibidos no seu perfil da SearchDevelopers!</p>
                <div>
                    <img src={Git} />
                </div>
            </Github>
            <Buttons>
                <Link to="/cadastro/concluido" style={{ width: "100%", marginBottom: "10px" }}>
                    <Button contentText="Conectar com o github" style={{ width: "100%" }} />
                </Link>
                <Link to="/cadastro/concluido" style={{ width: "100%" }}>
                    <Button contentText="Pular" style={{ width: "100%" }} primary={false} />
                </Link>
            </Buttons>
        </>
    )
}

export default CadastroGit;

const Github = styled.div `
div {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
}

img {
    width: 200px;
}
`

const Buttons = styled.div`
width: 100%;
display: flex;
align-items: center;
flex-direction: column;

.button {
    width: 100%;
    padding-bottom: 10px;
}
`