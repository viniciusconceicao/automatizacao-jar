import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button} from '../../molecules/Button';
import {Colors} from '../../../shared/Colors';

export function ServiceCard(props) {
    const {
        title,
        description,
        pic
    }=props

    return(
        <>
        <Card>
            <CardPic>
                <img src={pic} />
            </CardPic>
            <CardTextContent>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="card__btn">
                    <Button contentText="Contatar" ></Button>
                </div>
            </CardTextContent>
        </Card>
        </>
    )
}

ServiceCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    pic: PropTypes.any
}

const Card = styled.div `
position: relative;
display: flex;
justify-content: center;
width: 35vw;
height: 260px;
margin: 15px;
`
const CardPic = styled.div `

img {
    filter: brightness(0.8);
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
}
`

const CardTextContent = styled. div `
position: absolute;
width: 60%;
border-radius: 5px;
padding: 22px 30px;
bottom: 0;
background-color: ${Colors.gray.grayWhite};
border-left: 7px solid ${Colors.green.greenAqua};
color: ${Colors.gray.grayText};

h3 {
    margin: 0;
}

.card__btn{
    display:flex;
    justify-content: flex-end;
}
`