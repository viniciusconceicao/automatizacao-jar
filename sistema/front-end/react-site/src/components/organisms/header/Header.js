import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Colors } from '../../../shared/Colors';
import { Button } from '../../molecules/Button';
import Logo from '../../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import Login from '../../pages/login/Login';


export function Header(props) {
    const {
        services = false,

    } = props

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <HeaderPattern>
                <ListLinks>
                    <ul>
                        <li>
                            <a href="#principal"><img src={Logo} alt="SearchDevelopers" /></a>
                        </li>
                        <li>
                            <a href="#servico">Serviços</a>
                        </li>
                        <li>
                            <a href="#comoFunciona">Como funciona</a>
                        </li>
                        <li>
                            <a href="#paraDev">Trabalhe Conosco</a>
                        </li>
                    </ul>
                </ListLinks>
                <LoginButton>
                    <Button onClick={showDrawer} primary={false} contentText="Entrar" size="small" />
                    <Link to="/cadastro">
                        <Button contentText="Cadastre-se" size="small" />
                    </Link>
                </LoginButton>
            </HeaderPattern>

            { services ?
                <HeaderServices>
                    <ul>
                        <li>
                            <a href="#">Mobile apps</a>
                        </li>
                        <li>
                            <a href="#">Sistemas web</a>
                        </li>
                        <li>
                            <a href="#">Sistemas em wordpress</a>
                        </li>
                        <li>
                            <a href="#">Infraestrutura</a>
                        </li>
                        <li>
                            <a href="#">Machine Learning</a>
                        </li>
                        <li>
                            <a href="#">Cibersecurity</a>
                        </li>
                    </ul>
                </HeaderServices> : null}

            <Drawer
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width="540px">
                <Login />

            </Drawer>

        </>
    )
}

Header.propTypes = {
    services: PropTypes.bool,
}

const HeaderPattern = styled.div`
position: fixed;
z-index: 1000;
height: 10vh;
width: 100%;
display: flex;
justify-content: space-around;
align-items: center;
background-color: ${Colors.gray.grayWhite};
`

const ListLinks = styled.div`

ul {
    display: flex;
    align-items: center;
    padding: 0; 
    margin: 0;
}

ul li {
    list-style: none;
    padding-right: 30px;
}

ul li img {
    width: 250px;
}

ul li a {
    text-decoration: none;
    color: ${Colors.gray.grayText};

}
`

const LoginButton = styled.div`
display: flex;

button {
    margin: 10px 5px;
    min-width: 120px;
    padding: 10px;
}
`

const HeaderServices = styled.div`
position: fixed;
z-index: 1000;
top: 10vh;
width: 100%;
background-color: ${Colors.green.greenAqua};

    ul {
        height: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        width: 88%;
        margin: auto;
    }

    ul li {
        list-style: none;
    }
    
    ul li img {
        width: 250px;
    }
    
    ul li a {
        text-decoration: none;
        color: ${Colors.gray.grayWhite};
    
    }
`


