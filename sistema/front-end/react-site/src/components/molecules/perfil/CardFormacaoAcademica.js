import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Colors } from "../../../shared/Colors";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { message, Modal } from 'antd';
import EditarInfoPerfil from "../modal/EditarInfoPerfil";
import api from "../../../services/api";


function CardFormacaoAcademica(props) {
    const {
    id,
    escola,
    curso,
    desc,
    dataInicio,
    dataFinal
  } = props

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formation, setFormation] = useState([]);
  const [sucesso, setSucesso] = useState(false);

  const getFormation = async () => {

    try {
      const response = await api.get(`/api/formations/${id}`);
      setFormation(response.data)
      console.log("minha formação selecionada:", response.data)
    } catch (err) {
      console.log("não foi possível selecionar esta formação", err)
    }
  }

  const updateFormation = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/formations/${id}`, formation);
      setSucesso(true);
      message.success("sucesso ao atualizar formação!")
      setTimeout(() => window.location.reload(), 1000)
    } catch (err) {
      console.log("erro ao atualizar formação")
    }

  }

  const deleteFormation = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/api/formations/${id}`);
      message.success("deletado com sucesso")
      setTimeout(() => window.location.reload(), 1000)
    } catch(err) {
      console.log("erro ao deletar")
    }
  }

  function handle(e) {
    const newFormation = { ...formation };
    newFormation[e.target.id] = e.target.value;
    console.log(newFormation)
    setFormation(newFormation)
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

  useEffect(() => getFormation(), []);

  return (
    <>
      <ContainerCard>
        <ContainerText>
          <div className="titulo">{escola}</div>
          <div className="curso">{curso}</div>
          <div className="sobre">{dataInicio} - {dataFinal}</div>
        </ContainerText>

        <div className="IconCard">
          <DeleteOutlined className="deleteEx" style={{ margin: "20px" }} onClick={deleteFormation} />
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
              name="formação academica"
              inputOne={{
                default: formation.nameInstitution,
                label: "Instituição de ensino",
                id: "nameInstitution",
                onchange: e => handle(e)
              }}
              inputTwo={{
                default: formation.course,
                label: "Área de estudo",
                id: "course",
                onchange: e => handle(e)
              }}
              inputThree={{
                default: formation.languageFormation,
                label: "Descrição",
                id: "languageFormation",
                onchange: e => handle(e)
              }}
              dataInicio={{
                default: formation.startDateFormation,
                id: "startDateFormation",
                onchange: e => handle(e)
              }}
              dataFinal={{
                default: formation.endDateFormation,
                id: "endDateFormation",
                onchange: e => handle(e)
              }}
              submit={(e) => updateFormation(e)} />
            :
            <span>Formação cadastrada com sucesso!</span>
        }

      </Modal>
    </>
  );
}

export default CardFormacaoAcademica;

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

