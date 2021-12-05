import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../molecules/Button';
import { Colors } from '../../../shared/Colors';
import { FavoriteBorderOutlined, FavoriteOutlined } from '@material-ui/icons';
import { Rate, Modal } from 'antd';
import perfil from '../../../assets/profile.png';
import Contratar from '../../molecules/modal/Contratar';
import api from '../../../services/api';
import photos from '../../../services/photos';

export function ProfileCard(props) {
    const [favorite, setFavorite] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [network, setNetwork] = useState([]);

    const {
        id,
        name = '',
        description = '',
        pic,
        phone,
        favoriteFunction,
        unfavoriteFunction,
        isFavorite = favorite,
        rate,
        buttonText = 'Contratar'
    } = props

    async function getNetworks() {
        try {
            const response = await api.get(`/api/networks/${id}`);
            setNetwork(response.data)
        } catch (err) {
            console.log("erro ao buscar redes sociais", err)
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

    useEffect(() => getNetworks(), []);

    return (
        <>
            <Card>
                <PicCard>
                    <img src={pic ? photos.url + pic : perfil} />
                </PicCard>
                <TextContentCard>
                    <h3>{name}</h3>
                    <Rate disabled allowHalf defaultValue={rate} style={{ fontSize: "14px" }} />
                    <p>{description}</p>
                </TextContentCard>
                <FavoriteCard>
                    {isFavorite ?
                        <FavoriteOutlined
                            onClick={() => {
                                unfavoriteFunction()
                                setFavorite(false);
                            }}
                            style={{ cursor: "pointer", fontSize: "28px", color: Colors.green.greenPrimary }} />
                        :
                        <FavoriteBorderOutlined
                            onClick={() => {
                                favoriteFunction()
                                setFavorite(true);
                            }}
                            style={{ cursor: "pointer", fontSize: "28px", color: Colors.green.greenPrimary }} />}
                </FavoriteCard>
                <ButtonCard>
                    <div className="card__btn">
                        <Button contentText={buttonText} onClick={showModal} ></Button>
                    </div>
                </ButtonCard>
            </Card>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Contratar
                    id={id}
                    pic={pic}
                    name={name}
                    description={description}
                    whatsapp={phone}
                    instagram={network.instagramName}
                    linkedin={network.linkedinName}
                    facebook={network.facebookName} />
            </Modal>
        </>
    )
}

const Card = styled.div`
border: 1px solid ${Colors.gray.grayTab};
border-radius: 6px;
margin-bottom: 20px;
padding: 15px;
display: flex;
align-items: center;
transition: all 0.5s;

&:hover {
    box-shadow: 0 4px 8px #EEE;
    background-color: ${Colors.gray.grayMilk};
}

@media (max-width: 1040px) {
    flex-direction: column;
}

`

const PicCard = styled.div`
margin: 0px 15px;

img {
   width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 2px solid ${Colors.green.greenLemon};
    object-fit: cover; 
}


`

const TextContentCard = styled.div`
flex-grow: 1;

h3 {
    font-size: 16px;
    margin: 0;
    color: ${Colors.gray.grayTitle};
}

p {
    color: ${Colors.gray.grayText};
    padding: 5px;
    margin: 0;
}

`

const FavoriteCard = styled.div`
padding: 0 15px;



`

const ButtonCard = styled.div`
margin-right: 15px;
`

