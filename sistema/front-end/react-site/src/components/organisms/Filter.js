import React, { useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import { Colors } from '../../shared/Colors';
import { ButtonOpen } from '../molecules/ButtonOpen';
import { OptionsFilter } from '../molecules/OptionsFilter';

const Filter = () => {


    const [visible, setVisible] = useState(false);

    const [categoryState, setCategoryState] = useState(false);
    const [specialtyState, setSpecialtyState] = useState(false);
    const [technologyState, setTechnologyState] = useState(false);



    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };


    const openCategory = () => {
        setCategoryState(true);
    };
    const closeCategory = () => {
        setCategoryState(false);
    };


    const openSpecialty = () => {
        setSpecialtyState(true);
    };
    const closeSpecialty = () => {
        setSpecialtyState(false);
    };


    const openTechnology = () => {
        setTechnologyState(true);
    };
    const closeTechnology = () => {
        setTechnologyState(false);
    };

    const teste = () => {
        console.log("só testando mesmo");
    };

    return(
        <>
        <FilterButton onClick={showDrawer}>Filtro</FilterButton>
        <Drawer
                width="450px"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
            <Container>
                <Title>Filtrar por categorias</Title>
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Desenvolvimento Web"
                />
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Mobile Apps"
                />
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Protótipação de interfaces"
                />
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Sistemas desktop"
                />
                {!categoryState ? (
                    <ButtonOpen 
                    onClick={() => openCategory()}
                    contentText="Ver todos"
                    />
                ) : (
                    <>
                    <OptionsFilter 
                        onClick={() => teste()}
                        contentText="Categoria 1"
                    />
                    <OptionsFilter 
                        onClick={() => teste()}
                        contentText="Categoria 2"
                    />
                    <ButtonOpen 
                        onClick={() => closeCategory()}
                        contentText="Ver menos"
                    />   
                    </>
                )}


                <Line />          


                <Title>Filtrar por especialidade</Title>
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Backend developer"
                />
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Frontend developer"
                />
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Designer UI / UX"
                />
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Fullstack developer"
                />
                {!specialtyState ? (
                    <ButtonOpen 
                    onClick={() => openSpecialty()}
                    contentText="Ver todos"
                    />
                ) : (
                    <>
                    <OptionsFilter 
                        onClick={() => teste()}
                        contentText="Especialidade 1"
                    />
                    <OptionsFilter 
                        onClick={() => teste()}
                        contentText="Especialidade 2"
                    />
                    <ButtonOpen 
                        onClick={() => closeSpecialty()}
                        contentText="Ver menos"
                    />   
                    </>
                )}


                <Line />    


                <Title>Filtrar por Tecnologia</Title>
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="EC++"
                />
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Java"
                />
                <OptionsFilter 
                    onClick={() => teste()}
                    contentText="Javascript"
                />
                {!technologyState ? (
                    <ButtonOpen 
                    onClick={() => openTechnology()}
                    contentText="Ver todos"
                    />
                ) : (
                    <>
                    <OptionsFilter 
                        onClick={() => teste()}
                        contentText="Tecnologia 1"
                    />
                    <OptionsFilter 
                        onClick={() => teste()}
                        contentText="Tecnologia 2"
                    />
                    <ButtonOpen 
                        onClick={() => closeTechnology()}
                        contentText="Ver menos"
                    />   
                    </>
                )}

            </Container>
            </Drawer>
        </>
    )
}

export default Filter;

const FilterButton = styled.button`
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
width: 20%;
background-color: ${Colors.gray.grayTabLine};
color: ${Colors.gray.grayWhite};
border: none;
border-radius: 5px;
outline: none;
height: 45px;
transition: 0.5s;

&:hover{
    background-color: ${Colors.green.greenPrimary};

}
`

const Container = styled.div`
flex-direction: column;
display: flex;
/* align-items: left; */
font-family: Roboto;
color: ${Colors.gray.grayName};
width: 390px;
height: 700px;
padding: 30px;
`

const Title = styled.text`
font-size: 18px;
font-weight: 500;
line-height: 28px;
margin-bottom: 25px; 
color: ${Colors.gray.grayText};
`


const Line = styled.div`
width: 337px;
border: 1px solid #E4E2E2;
margin: 15px 0 25px 0;
`

