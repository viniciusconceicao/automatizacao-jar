import { TextField } from '@material-ui/core';
import React, { useState } from 'react'
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { Button } from '../Button';

function Tecnologias(props) {
    const {
        name = "",
        onclick,
    } = props

    return (
        <>
            <Tag onClick={onclick}><span>{name} + </span></Tag>
        </>
    )
}

const EditarTecPerfil = (props) => {

    const {
        valueInput,
        onchangeInput,
        submit,
        loading,
    } = props

    return (
        <>
            <Container>
                <h2 className="title">Adicionar tecnologias e ferramentas</h2>
                <TextField
                    value={valueInput}
                    name={valueInput}
                    id="tecnologias"
                    label="Ex: HTML"
                    variant="outlined"
                    onChange={(e) => onchangeInput(e.target.value)}
                    style={{ width: "100%", margin: "20px 0" }} />

                <TagsContainer>
                    <Tecnologias name="Java" onclick={() => onchangeInput("Java")} />
                    <Tecnologias name="React Native" onclick={() => onchangeInput("React Native")} />
                    <Tecnologias name="Javascript" onclick={() => onchangeInput("Javascript")} />
                    <Tecnologias name="PHP" onclick={() => onchangeInput("PHP")} />
                    <Tecnologias name="MySQL Server" onclick={() => onchangeInput("MySQL Server")} />
                    <Tecnologias name="Análise de software" onclick={() => onchangeInput("Análise de software")} />
                    <Tecnologias name="C#" onclick={() => onchangeInput("C#")} />
                    <Tecnologias name="Vue JS" onclick={() => onchangeInput("Vue JS")} />
                    <Tecnologias name="Figma" onclick={() => onchangeInput("Figma")} />
                    <Tecnologias name="Kotlin" onclick={() => onchangeInput("Kotlin")} />
                    <Tecnologias name="Spring Boot" onclick={() => onchangeInput("Spring Boot")} />
                </TagsContainer>

                <Button
                    contentText="Adicionar Tecnologia"
                    style={{ width: "100%" }}
                    onClick={(e) => submit(e)}
                    loading={loading} />
            </Container>

        </>
    )

}

export default EditarTecPerfil;

const Container = styled.div`
color: ${Colors.gray.grayText};
padding: 15px;

.title {
    font-size: 16px;
}
`

const Tag = styled.div`
margin: 3px;
cursor: pointer;
display: inline-block;
color: #8c8c8c;
border-radius: 50px;
border: 1px solid ${Colors.gray.grayMedium};
background-color: ${Colors.green.greenLight};
padding: 15px 20px;
width: max-content;
padding: 3px 18px;
transition: all 0.5s;

&:hover {
    color: ${Colors.gray.grayWhite};
    background-color: ${Colors.green.greenAqua};
}
`

const TagsContainer = styled.div `
margin-top: 10px;
margin-bottom: 30px;
`