import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import TextField from '@material-ui/core/TextField';

const EditarInfoPerfil = (props) => {

    const {
        loading,
        type = "adicionar",
        name = "Experiência",
        id,
        submit,
        inputOne,
        inputTwo,
        inputThree,
        inputFour,
        inputFive,
        dataInicio,
        dataFinal,
    } = props

    return (
        <>
            <ContainerBackgroundModal onSubmit={submit}>

                <div className="title">
                    {
                        type === "adicionar" ?
                            <span>Adicionar {name}</span>
                            :
                            <span>Editar {name}</span>
                    }

                </div>

                <TextField
                    value={inputOne.value}
                    name={inputOne.id}
                    id={inputOne.id}
                    label={inputOne.label}
                    variant="outlined"
                    defaultValue={inputOne.default}
                    onChange={inputOne.onchange} />
                <TextField
                    value={inputTwo.value}
                    id={inputTwo.id}
                    label={inputTwo.label}
                    variant="outlined"
                    defaultValue={inputTwo.default}
                    onChange={inputTwo.onchange} />
                <TextField
                    value={inputThree.value}
                    id={inputThree.id}
                    label={inputThree.label}
                    variant="outlined"
                    defaultValue={inputThree.default}
                    onChange={inputThree.onchange} />

                {
                    inputFour ?
                        <TextField
                            value={inputFour.value}
                            id={inputFour.id}
                            label={inputFour.label}
                            variant="outlined"
                            defaultValue={inputFour.default}
                            onChange={inputFour.onchange} />
                        :
                        null
                }

                {
                    inputFive ?
                        <TextField
                            value={inputFive.value}
                            id={inputFive.id}
                            label={inputFive.label}
                            variant="outlined"
                            defaultValue={inputFive.default}
                            onChange={inputFive.onchange} />
                        :
                        null
                }


                <InputDate>
                    <TextField
                        value={dataInicio.value}
                        id={dataInicio.id}
                        type="date"
                        label="Data início"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={dataInicio.default}
                        onChange={dataInicio.onchange}
                        style={{ width: "calc(50% - 8px)", paddingRight: "8px" }}

                    />
                    <TextField
                        value={dataFinal.value}
                        id={dataFinal.id}
                        type="date"
                        label="Data fim"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={dataFinal.default}
                        onChange={dataFinal.onchange}
                        style={{ width: "calc(50% - 8px)" }}
                    />
                </InputDate>

                <Button contentText={`Adicionar ${name}`} type="submit" loading={loading} />

            </ContainerBackgroundModal>
        </>
    );
};

export default EditarInfoPerfil;

const ContainerBackgroundModal = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: flex-start;
    flex-direction: column;
    padding: 15px;

    .title {
        font-size: 16px;
    }
`;

const InputDate = styled.div`
display: flex;
justify-content: space-between;
`;






