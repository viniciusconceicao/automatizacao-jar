import React from "react";
import styled from "styled-components";
import { Colors } from "../../../shared/Colors";
import { Link } from "react-router-dom";

const AcademicNews = () => {
  return (
    <>
      <ConteinerAcademico>
        <ConteinerFormacao></ConteinerFormacao>
      </ConteinerAcademico>
    </>
  );
};
export default AcademicNews;

const ConteinerAcademico = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 81%;
  height: 45%;
`;

const ConteinerFormacao = styled.div`
 width: 81%;
  height: 45%;
  background-color:lightblue;

`;
