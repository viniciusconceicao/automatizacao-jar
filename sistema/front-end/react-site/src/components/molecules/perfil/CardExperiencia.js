import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../shared/Colors";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import Company from '../../../assets/company.jpeg'
import { message, Modal } from 'antd';
import EditarInfoPerfil from "../modal/EditarInfoPerfil";
import api from "../../../services/api";

function CardExperiencia(props) {

  const {
    id,
    cargo,
    empresa,
    funcoes,
    desc,
    local,
  } = props

  const [experiences, setExperiences] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getExperiences = async () => {

    try {
      const response = await api.get(`/api/experiences/${id}`);
      setExperiences(response.data)
      console.log("minha experiencia selecionada:", response.data)
    } catch (err) {
      console.log("não foi possível selecionar esta experiencia", err)
    }
  }

  const updateExperiences = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/experiences/${id}`, experiences);
      setSucesso(true);
      message.success("sucesso ao atualizar experiencia!")

      setTimeout(() => window.location.reload(), 1000)
      
    } catch (err) {
      console.log("erro ao atualizar experiencia")
    }

  }

  const deleteExperiences = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/api/experiences/${id}`);
      message.success("deletado com sucesso")
      
      setTimeout(() => window.location.reload(), 1000)
      
    } catch(err) {
      console.log("erro ao deletar")
    }
  }

  function handle(e) {
    const newExp = { ...experiences };
    newExp[e.target.id] = e.target.value;
    console.log(newExp)
    setExperiences(newExp)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => getExperiences(), []);

  return (
    <>
      <ContainerCard>
        <div className="infoCard">
          <ContainerImage>
            <div className="imageEx"></div>
          </ContainerImage>
          <ContainerText>
            <div className="titulo">{cargo}</div>
            <div className="empresa">{empresa}</div>
            <div className="sobre">{funcoes}</div>
            <div className="sobre">{desc}</div>
            <div className="localidade">{local}</div>
          </ContainerText>
        </div>
        <div className="IconCard">
          <DeleteOutlined className="deleteEx" style={{ margin: "20px" }} onClick={deleteExperiences} />
          <FormOutlined className="editEx" onClick={showModal} />
        </div>
      </ContainerCard>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>

{
          !sucesso ?

            <EditarInfoPerfil
              type="editar"
              name="experiência profissional"
              inputOne={{
                label: "Empresa",
                default: experiences.nameCompany,
                id: "nameCompany",
                onchange: e => handle(e)
              }}
              inputTwo={{
                label: "Cargo",
                default: experiences.position,
                id: "position",
                onchange: e => handle(e)
              }}
              inputThree={{
                label: "Funções",
                default: experiences.functions,
                id: "functions",
                onchange: e => handle(e)
              }}
              inputFour={{
                label: "Localidade",
                default: experiences.locality,
                id: "locality",
                onchange: e => handle(e)
              }}
              inputFive={{
                label: "Descrição",
                default: experiences.descriptionExperience,
                id: "descriptionExperience",
                onchange: e => handle(e)
              }}
              dataInicio={{
                default: experiences.startDateExperience,
                id: "startDateExperience",
                onchange: e => handle(e)
              }}
              dataFinal={{
                default: experiences.endDateExperience,
                id: "endDateExperience",
                onchange: e => handle(e)
              }}
              submit={(e) => updateExperiences(e)} />
            :
            <span>Experiência atualizada com sucesso!</span>
        }

        </Modal>
    </>
  );
}

export default CardExperiencia;

const ContainerCard = styled.div`
  padding: 20px;
  margin: 20px auto;
  width: 95%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  background-color: ${Colors.gray.grayWhite};
  border: 1px solid ${Colors.gray.grayTab};
  border-radius: 5px;

  .infoCard {
    display: flex;
  }

  .IconCard {
    font-size: 23px;
    height: 100%;
    width: 51.3%;
    align-items: center;
    justify-content: flex-end;
    color: ${Colors.blue.bluePrimary};
    display: flex;

    svg {
      cursor: pointer;
    }
  }
`;

const ContainerText = styled.div`
  color: ${Colors.gray.grayText};
  display: flex;
  flex-direction: column;

  justify-content: center;

  .titulo {
    color: ${Colors.gray.grayTitle};
    font-weight: bolder;
  }
`;
const ContainerImage = styled.div`

  .imageEx {
    margin-right: 20px;
    width: 90px;
    height: 90px;
    border: 2px solid ${Colors.green.greenPrimary};
    background-image: url(${Company});
    background-repeat: round;
  }
`;