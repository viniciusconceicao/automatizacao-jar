import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { WhatsApp, Instagram, LinkedIn, Facebook } from '@material-ui/icons';
import { Button } from '../Button';
import Perfil from '../../../assets/profile.png';
import NovoServico from './NovoServico';
import { Modal } from 'antd';
import photos from '../../../services/photos';

const Contratar = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {
        id,
        pic,
        name,
        description,
        whatsapp,
        instagram,
        linkedin,
        facebook,
    } = props

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <>
            <ContainerModal>
                <div className="container__user">
                    <PicUser
                        pic={pic} />
                    <DescUser>
                        <strong>{name}</strong>
                        <p>{description}</p>
                    </DescUser>
                </div>
                <div className="container__midias">
                    <SocialMidias>
                        {
                            whatsapp ?
                                <p className="midias__item">
                                    <WhatsApp />
                                    {whatsapp}
                                </p>
                                : null
                        }
                        {
                            instagram ?
                                <p className="midias__item">
                                    <Instagram />
                                    {instagram}
                                </p>
                                : null
                        }



                    </SocialMidias>
                    <SocialMidias>
                        {
                            linkedin ?
                                <p className="midias__item">
                                    <LinkedIn />
                                    {linkedin}
                                </p>
                                : null
                        }
                        {
                            facebook ?
                                <p className="midias__item">
                                    <Facebook />
                                    {facebook}
                                </p>
                                : null
                        }


                    </SocialMidias>

                </div>
                <div>
                    <Button
                        contentText="Solicitar parceria"
                        style={{ width: "100%" }}
                        onClick={showModal} />
                </div>

            </ContainerModal>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <NovoServico
                    name={name}
                    id={id} />
            </Modal>
        </>
    )
}

export default Contratar;

const ContainerModal = styled.div`
padding: 30px;

.container__user, .container__midias {
    display: flex;
    align-items: center;
    justify-content: center;
}

.container__midias {
    align-items: flex-start;
    padding: 25px 0 ;
    justify-content: space-around;

}
`

const SocialMidias = styled.div`
color: ${Colors.gray.grayText};

.midias__item {
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
        font-size: 40px;
        color: ${Colors.green.greenPrimary};
        padding-right: 10px;
    }

}
`

const PicUser = styled.div`
background-image: url(${props => props.pic ? photos.url + props.pic : Perfil});
background-size: cover;
background-position: center;
border: 2px solid ${Colors.green.greenPrimary};
border-radius: 50%;
width: 100px;
height: 100px;
object-fit: cover;
`

const DescUser = styled.div`
margin-left: 30px;
width: 60%;

strong {
    color: ${Colors.gray.grayTitle};
    font-size: 16px;
}

p {
    color: ${Colors.gray.grayText};
    padding: 5px 0;
}

`