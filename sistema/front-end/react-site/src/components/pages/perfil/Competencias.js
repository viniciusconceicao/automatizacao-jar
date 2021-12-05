import React, { useState, useEffect } from "react";
import { AddCircleOutline } from "@material-ui/icons";
import { Tab } from '../../molecules/Tab';
import { BoxPerfil, TabsPattern } from './Perfil';
import { useHistory } from "react-router";
import Tool from "../../molecules/perfil/Tool";
import { Modal, Skeleton, message } from 'antd';
import EditarTecPerfil from "../../molecules/modal/EditarTecPerfil";
import api from '../../../services/api';
import EmptyState from "../../organisms/EmptyState";
import Success from "../../organisms/Success";

const Competencias = () => {
  const idStorage = localStorage.getItem('idUser');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tools, setTools] = useState([]);
  const [nameTool, setNameTool] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const getTools = async () => {

    try {
      setLoading(true);
      const response = await api.get(`/api/tools/user/${idStorage}`);
      setTools(response.data)
      console.log("minhas ferramentas:", response.data)
      setLoading(false);
    } catch (err) {
      console.log("não foi possível listar as ferramentas", err)
    }
  }

  const postNewTool = async (e) => {
    e.preventDefault();
    setLoadingButton(true);

    try {
      await api.post(`/api/tools/${idStorage}`, { nameTool: nameTool });
      setSucesso(true);
      console.log("sucesso ao add ferramenta!")
    } catch (err) {
      message.error('Erro ao adicionar ferramenta. Tente novamente!');
      console.log("erro ao add ferramenta", err)
    }
    setLoadingButton(false);
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

  const history = useHistory();

  useEffect(() => getTools(), [sucesso]);

  return (
    <>
      <TabsPattern>
        <Tab text="Competências"
          active={true}
          style={{ borderRadius: "10px 0 0 0" }}
          onClick={() => history.push('/perfil')} />
        <Tab text="Experiências"
          onClick={() => history.push('/perfil/experiencia')} />
        <Tab text="Formação Acadêmica"
          onClick={() => history.push('/perfil/formacao')} />
        <Tab text="Projetos Realizados"
          style={{ borderRadius: "0 10px 0 0" }}
          onClick={() => history.push('/perfil/projetos')} />
        {/* <Tab text="Reputação"
          style={{ borderRadius: "0 10px 0 0" }}
          onClick={() => history.push('/perfil/reputacao')} /> */}
      </TabsPattern>

      <BoxPerfil>

        <h2><AddCircleOutline
          className="add"
          onClick={showModal} />Tecnologias e ferramentas</h2>

        {
          loading ?
            <>
              <Skeleton paragraph={{ rows: 1 }} active />
              <Skeleton paragraph={{ rows: 1 }} active />
              <Skeleton paragraph={{ rows: 1 }} active />
            </>
            :
            tools ?

              tools.map((tool) => {
                return (
                  <Tool
                    id={tool.idTool}
                    name={tool.nameTool} />
                )
              })
              :
              <EmptyState type="arquivo" text="Você não possui competencias cadastradas!" />
        }

      </BoxPerfil>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>

        {
          !sucesso ?
            <EditarTecPerfil
              valueInput={nameTool}
              onchangeInput={setNameTool}
              loading={loadingButton}
              submit={postNewTool} />
            :
            <Success
              text="Ferramenta cadastrada com sucesso!"
              type="2"
              textButton="Cadastrar mais ferramentas"
              onclick={() => setSucesso(false)} />
        }
      </Modal>

    </>
  );
};
export default Competencias;
