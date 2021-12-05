import React, { useEffect, useState } from "react";
import { AddCircleOutline } from "@material-ui/icons";
import { Tab } from '../../molecules/Tab';
import { BoxPerfil, TabsPattern } from './Perfil';
import { useHistory } from "react-router";
import CardFormacaoAcademica from '../../molecules/perfil/CardFormacaoAcademica'
import { Modal, Skeleton, message } from 'antd';
import EditarInfoPerfil from "../../molecules/modal/EditarInfoPerfil";
import api from "../../../services/api";
import EmptyState from "../../organisms/EmptyState";
import Success from "../../organisms/Success";


const FormacaoAcademica = () => {
  const idStorage = localStorage.getItem('idUser');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [listFormations, setListFormations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [data, setData] = useState({
    nameInstitution: "",
    course: "",
    languageFormation: "",
    startDateFormation: "",
    endDateFormation: "",
  })

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    console.log(newData)
    setData(newData)
  }

  const postNewFormation = async (e) => {
    e.preventDefault();
    setLoadingButton(true);

    try {
      await api.post(`/api/formations/${idStorage}`, {
        nameInstitution: data.nameInstitution,
        course: data.course,
        languageFormation: data.languageFormation,
        startDateFormation: data.startDateFormation,
        endDateFormation: data.endDateFormation,
      })
      setSucesso(true);

      setData(
        {
          nameInstitution: "",
          course: "",
          languageFormation: "",
          startDateFormation: "",
          endDateFormation: "",
        }
      )
      console.log("sucesso ao add formação!")
    } catch (err) {
      message.error('Erro ao adicionar formação. Tente novamente!');
      console.log("erro ao add formação")
    }

    setLoadingButton(false);

  }

  const getFormations = async () => {

    try {
      setLoading(true);
      const response = await api.get(`/api/formations/user/${idStorage}`);
      setListFormations(response.data)
      console.log("minhas formações:", response.data)
      setLoading(false);

    } catch (err) {
      console.log("não foi possível listar as formações", err)
    }
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

  useEffect(() => getFormations(), [sucesso]);

  return (
    <>
      <TabsPattern>
        <Tab text="Competências"
          style={{ borderRadius: "10px 0 0 0" }}
          onClick={() => history.push('/perfil')} />
        <Tab text="Experiências"
          onClick={() => history.push('/perfil/experiencia')} />
        <Tab text="Formação Acadêmica"
          active={true}
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
          onClick={showModal} />Formação Acadêmica</h2>

        {
          loading ?
            <>
              <Skeleton paragraph={{ rows: 2 }} active />
              <Skeleton paragraph={{ rows: 2 }} active />
            </>
            :
            listFormations ?

              listFormations.map((formacao) => {
                return (
                  <CardFormacaoAcademica
                    id={formacao.idFormation}
                    escola={formacao.nameInstitution}
                    curso={formacao.course}
                    dataInicio={formacao.startDateFormation}
                    dataFinal={formacao.endDateFormation} />
                )
              })
              :
              <EmptyState type="arquivo" text="Você não possui formações acadêmicas cadastradas!" />
        }


      </BoxPerfil>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>

        {
          !sucesso ?

            <EditarInfoPerfil
              loading={loadingButton}
              type="adicionar"
              name="formação academica"
              inputOne={{
                label: "Instituição de ensino",
                value: data.nameInstitution,
                id: "nameInstitution",
                onchange: e => handle(e)
              }}
              inputTwo={{
                label: "Área de estudo",
                value: data.course,
                id: "course",
                onchange: e => handle(e)
              }}
              inputThree={{
                label: "Descrição",
                value: data.languageFormation,
                id: "languageFormation",
                onchange: e => handle(e)
              }}
              dataInicio={{
                value: data.startDateFormation,
                id: "startDateFormation",
                onchange: e => handle(e)
              }}
              dataFinal={{
                value: data.endDateFormation,
                id: "endDateFormation",
                onchange: e => handle(e)
              }}
              submit={(e) => postNewFormation(e)} />
            :
            <Success
              text="Formação cadastrada com sucesso!"
              textButton="Cadastrar mais formações"
              type="2"
              onclick={() => setSucesso(false)} />
        }

      </Modal>
    </>
  );
};
export default FormacaoAcademica;