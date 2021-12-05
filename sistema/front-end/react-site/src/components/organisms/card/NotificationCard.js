import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Colors } from '../../../shared/Colors';
import perfil from '../../../assets/profile.png';
import photos from '../../../services/photos';

export function NotificationCard (props) {

    const {
        pic,
        name = '',
        description = ''
    } = props


    return (
        <>
            <Container>
                <div><img className="image" src={pic ? photos.url + pic : perfil}/></div>
                <div className="text"> 
                    <div className="client">
                        {name} 
                    </div> 
                    {description}
                </div>
            </Container>
        </>
    )

}

NotificationCard.propTypes = {
    pic: PropTypes.any,
    name: PropTypes.string,
    description: PropTypes.string,
}


const Container = styled.div`
    margin: 10px 0;
    padding: 0 10px;
    display : flex; 
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 92px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    display : flex; 
    flex-direction: row;

    .image{
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 150px;
        border: 3px solid #44CF6C;
    }

    .text{
        margin: 18px;

        .client{
        font-weight: 500;
    }
    }

    
`