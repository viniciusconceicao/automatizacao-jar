import React from "react";
import styled from "styled-components";
import { Colors } from "../../../shared/Colors";
import { ContainerCard } from "./CardProjRealizados";
import { Rate } from "antd";

function CardReputacao() {
  return (
    <>
      <ContainerCard
        style={{width: "45%"}}
      >
        <ContainerAvaliation>
          <Rate disabled defaultValue={5} />
          <div className="avaliation">”Otimo profissional , muito competente e eficiente. Recomendo”</div>
          <div className="person">Rafael Bittencourt</div>
        </ContainerAvaliation>
      </ContainerCard>
    </>
  );
}

export default CardReputacao;

const ContainerAvaliation = styled.div`
  color: ${Colors.gray.grayText};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;

  .avaliation{
    padding: 10px 0;
    font-weight: 600;
    font-style: italic;
  }
`;