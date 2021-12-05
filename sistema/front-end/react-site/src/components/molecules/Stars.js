import { Rate } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const Stars = (props) => {
    const {
        rate
    } = props

    const history = useHistory();

    return (
        <>
        <Rates>
            <div onClick={() => history.push('/perfil/reputacao')}>
                <Rate disabled allowHalf defaultValue={rate} />
                <span className="user-stars">Ver minha reputação</span>
            </div>
        </Rates>
            
        </>
    )
}

export default Stars;

const Rates = styled.div `
.user-stars {
    margin: 10px;
    cursor: pointer;
    color: #ecd01d;
    font-size: 14px;
    font-weight: 400;
}
`