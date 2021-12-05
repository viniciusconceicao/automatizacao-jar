import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { FormOutlined } from '@ant-design/icons';
import perfil from '../../../assets/profile.png'
import { Modal, Skeleton } from 'antd';
import { useHistory } from 'react-router';
import api from '../../../services/api';
import EditarDesc from '../../molecules/modal/EditarDesc';
import Stars from '../../molecules/Stars'
import Network from '../../molecules/Network';
import PhotoProfile from '../PhotoProfile';
import photos from '../../../services/photos';


const Profile = () => {

    const idStorage = localStorage.getItem('idUser')
    const starsStorage = localStorage.getItem('stars');
    const [user, setUser] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    function getUserInfo() {
        setLoading(true);
        api.get(`/api/users/${idStorage}`)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
                setLoading(false);
            })
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


    useEffect(() => {
        getUserInfo()
    }, []);

    const history = useHistory();

    return (
        <>
            <PerfilConteiner>
                {
                    loading ?
                        <>
                            <Skeleton avatar paragraph={{ rows: 4 }} active className="loading" />
                        </>
                        :
                        <>
                            <div className="container__part--one">
                               <PhotoProfile
                                    pic={user.photo ? photos.url + user.photo : perfil} />
                                <LegendNews >
                                    <h2 className="user-name">{user.nameUser}</h2>
                                    <div className="user-info">
                                        <span className="sub-title">Localidade: </span>
                                        {!user.locality ?
                                            <span style={{ color: Colors.gray.grayMedium }}>
                                                Desconhecido
                                    </span> : user.locality}
                                    </div>
                                    <div className="user-info">
                                        <span className="sub-title">Status: </span>
                                        {user.status ? <span>Disponível</span> : <span>Indisponível</span>}
                                    </div>
                                    <div className="user-info">
                                        <span className="sub-title">Pontos: </span>
                                        {!user.xp ? "0" : user.xp} xp
                            </div>
                                </LegendNews>
                            </div>
                        </>
                }

                {
                    loading ?
                        <>
                            <Skeleton paragraph={{ rows: 4 }} active className="loading" />
                        </>
                        :
                        <>
                            <div className="container__part--two">
                                <Sobre>
                                    <Stars rate={starsStorage} />
                                    <div className="about-user">
                                        <div className="sub-title">Sobre:</div>
                                        <div className="desc">
                                            <span className="user-desc">
                                                {!user.descriptionUser ?
                                                    <span style={{ color: Colors.gray.grayMedium }}>
                                                        Não há descrição. Clique em editar para adicionar.</span> :
                                                    user.descriptionUser}
                                            </span>
                                            <div className="edit-desc" onClick={showModal}>
                                                <FormOutlined />
                                                <span>Editar</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sub-title">Redes sociais:</div>
                                    <Network />
                                </Sobre>
                            </div>

                        </>

                }

            </PerfilConteiner>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <EditarDesc onUpdate={handleOk} />
            </Modal>
        </>
    )

}
export default Profile;


const PerfilConteiner = styled.div`
display: flex;
background-color: ${Colors.gray.grayWhite};
color: ${Colors.gray.grayText}; 
border-radius: 10px;
padding: 30px;
width: 100%;

.loading {
    padding: 0 40px;
}

.container__part--one, .container__part--two {
    display: flex;
    width: 50%;
}

.container__part--one {
    align-items: center;
    justify-content: center;
}

.container__part--two {
    flex-direction: column;
}

.sub-title {
    color: darkgrey;
    font-weight: 400;
    }
}

@media (max-width: 1040px) {
    flex-direction: column;
    align-items: center;

    .container__part--one, .container__part--two {
        margin: auto;
        align-items: flex-start;
        justify-content: flex-start;
    }
}
`

const LegendNews = styled.div`
margin-left: 30px;
color: ${Colors.gray.grayText}; 
font-size: 16px;
    
.user-name {
    font-weight: 500;
    font-size: 20px;
    color: ${Colors.gray.grayTitle};
}

.user-info {
    padding: 2px;
}
`
const Sobre = styled.div`
color: ${Colors.gray.grayText}; 
font-size: 16px;

.user-stars {
    margin: 10px;
    cursor: pointer;
    color: #ecd01d;
    font-size: 14px;
    font-weight: 400;
}

.about-user {
    padding: 10px 0;
}

.desc {
    display: flex;
}

.user-desc {
    max-width: 300px;
}

.edit-desc {
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    color: ${Colors.blue.bluePrimary};
    transition: 0.5s;

    svg {
        margin-right: 5px;
        font-size: 20px;
    }
}

.edit-desc:hover {
    color: #1890ff;
}

`
