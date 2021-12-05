import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Colors } from '../../shared/Colors';
import perfil from '../../assets/profile.png';
import configIcon from '../../assets/configIcon.png';
import clientsIcon from '../../assets/clientsIcon.png';
import profileIcon from '../../assets/profileIcon.png';
import { useHistory } from 'react-router';
import api from '../../services/api';
import { Skeleton } from 'antd';
import photos from '../../services/photos';

export function Sidebar(props) {
    const {
        idStorage = localStorage.getItem('idUser'),
        available = true,
        points = 0,
        developer = true,
    } = props

    const history = useHistory();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState();

    useEffect(() => {
        function getUserInfo() {
            setLoading(true)
            api.get(`/api/users/${idStorage}`)
                .then(response => {
                    console.log(response.data)
                    setUser(response.data)
                    setLoading(false)
                })
        }

        getUserInfo();
    }, [])


    return (
        <Sidebox
            available={user.status}
            developer={developer}
        >
            <img className="imageProfile" src={user.photo ? photos.url + user.photo : perfil} />

            <div className="nameUser">{loading ? <Skeleton.Button style={{ width: 200 }} active size="small" /> : user.nameUser}</div>

            <div className="line"></div>

            <div className="infoProfile">
                <div>Status:</div>
                {
                    loading ?
                        <Skeleton.Button style={{ width: 100 }} active size="small" />
                        :
                        <>
                            <div className="statusColor"></div>
                            <div className="response">{user.status ? ("Disponível") : ("Indisponível")}</div>
                        </>
                }

            </div>

            <div className="infoProfile">
                <div>Pontos:</div>
                {
                    loading ?
                        <Skeleton.Button style={{ width: 100 }} active size="small" />
                        :
                        <div className="responsePoints">{user.xp} xp</div>
                }

            </div>

            <div className="line"></div>
            <div className="links">
                <div>
                    <div className="optionsProfile">
                        <img className="optionIcon" src={clientsIcon} /> 
                        <div onClick={() => history.push('/painel/servicos')}>Meus Serviços</div>
                    </div>

                    <div className="optionsProfile">
                        <img className="optionIcon" src={profileIcon} />
                        <div onClick={() => history.push('/perfil')}>Ver meu perfil</div>
                    </div>

                    <div className="optionsProfile">
                        <img className="optionIcon" src={configIcon} />
                        <div onClick={() => history.push('/configuracoes')}>Configurações</div>
                    </div>
                </div>
            </div>

        </Sidebox>
    )

}

Sidebar.propTypes = {
    name: PropTypes.string,
    available: PropTypes.bool,
    // points: PropTypes.number,
    // developer: PropTypes.bool,
}


const Sidebox = styled.div`
    position: fixed;
    margin-top: 10vh;
    height: 90vh;
    width: 25%;
    display: block;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    background-color: ${Colors.gray.grayMedium};
    justify-content: center;
    text-align: center;
    align-items: center;

    .links {
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .imageProfile{
        width: 180px;
        height: 180px;
        object-fit: cover;
        margin-top: 15%;
        border-radius: 50%;
        border: 3px solid #fff;
    }

    .nameUser{
        font-weight: 500;
        font-size: 20px;
        color: ${Colors.gray.grayTitle};
        margin-top: 6%;
    }

    .line{
        width: 85%;
        border: 1px solid #FFFFFF;
        margin: 4% 7% 4% 7%;
    }

    .infoProfile{
        width: 100%;
        display : flex; 
        align-items: center;
        flex-direction: row;
        font-size: 16px;
        margin: 3% 27% 3% 27%;
        color: ${Colors.gray.grayText};


        .statusColor{
        width: 20px;
        height: 20px;
        background-color: ${props => props.available ? Colors.green.greenOn : Colors.red.redOff};
        
        border-radius: 100px;
        margin: 0 5px 0 10px;
        }

        .response{
            font-weight: 500;
        }

        .responsePoints{
            font-weight: 500;
            margin-left: 4%;
        }
    }

    .optionsProfile{
        cursor: pointer;
        color: ${Colors.gray.grayText};
        text-align: center;
        display : flex; 
        flex-direction: row;
        font-size:18px;
        margin: 10px 0;
        transition: all 0.5s;

        .optionIcon{
            width: 25px;
            height: 25px;
            margin: 3px 10px 0 0;
        }
    }

    .optionsProfile:hover {
        color: #33b7a5;
    }

`
