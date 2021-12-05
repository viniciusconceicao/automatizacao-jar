import React from "react";
import styled from "styled-components";
import { Colors } from "../../../shared/Colors";
import { Button } from '../Button';
import Profile from '../../../assets/profile.png'
import photos from "../../../services/photos";

function CardProjRealizados(props) {

  const {
    pic,
    nome,
    categoria,
    desc,

  } = props

  return (
    <>
      <ContainerCard>
        <Box>

          <ContainerNewsLabelsCategory>
            <div className="title">Categoria:</div>
            <div style={{ marginBottom: "18px" }}>{categoria}</div>
          </ContainerNewsLabelsCategory>

          <ContainerNewsLabelsDesc>
            <div className="title">Descrição:</div>
            <div className="desc" >{desc}</div>
          </ContainerNewsLabelsDesc>

          <ContainerNewsLabelsClient>
            <Perfil>
              <ImagePerfil pic={pic} />
              <div style={{ marginLeft: "5px" }}>{nome}</div>
            </Perfil>
          </ContainerNewsLabelsClient>
          <Button contentText="Ver detalhes" primary={true} size="small" />
        </Box>



      </ContainerCard>
    </>
  );
}

export default CardProjRealizados;

export const ContainerCard = styled.div`
  margin: 20px;
  padding: 15px;
  height: 20%;
  display: flex;
  flex-wrap: wrap;
  background-color: ${Colors.gray.grayWhite};
  border: 1px solid ${Colors.gray.grayTab};
  color: ${Colors.gray.grayText};
  justify-content: flex-start;
  border-radius: 5px;
`


const Box = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
justify-content: space-around;

.title{
  color: darkgrey;
  font-weight: 400;
  padding-bottom: 2px;
}

`

const ContainerNewsLabelsClient = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  width: 23.3%;
  height: 67%;


`;
const ContainerNewsLabelsDesc = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  width: 33.3%;
  height: 67%;


`;

const Perfil = styled.div`
justify-content: center;
align-items: center;
display: flex;
justify-content: flex-start;
flex-direction: row;

`;

const ImagePerfil = styled.div `
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${Colors.green.greenPrimary};
  background-image: url(${props => props.pic ? photos.url + props.pic : Profile});
  background-repeat: round;
`

const ContainerNewsLabelsCategory = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 18.3%;
  height: 67%;



`;
