import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { DeleteOutlined } from "@ant-design/icons";
import api from '../../../services/api';
import { message } from 'antd';

const Tool = (props) => {
    const {
        id,
        name = "",
    }= props

    const deleteTool = async (e) => {
        e.preventDefault();
    
        try {
          await api.delete(`/api/tools/${id}`);
          message.success("deletado com sucesso")
          setTimeout(() => window.location.reload(), 1000)
        } catch(err) {
          console.log("erro ao deletar")
        }
      }

    return (
        <>
        <Moldura>
            {name}
            <DeleteOutlined style={{fontSize: "18px", color: Colors.blue.bluePrimary}} onClick={deleteTool} />
        </Moldura>
        </>
    )

}

export default Tool;

const Moldura = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 40%;
border: 1px solid ${Colors.gray.grayTab};
border-radius: 10px;
padding: 15px;
margin-bottom: 15px;
`