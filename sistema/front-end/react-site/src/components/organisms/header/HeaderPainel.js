import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import Logo from '../../../assets/logo.svg'
import { QuestionCircleFilled, HomeFilled, ProfileFilled, HeartFilled } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { Notification } from '../Notifications';
import Exit from '../../molecules/Exit';

export function HeaderPainel(props) {
    const {
        cadastro = false,
        painel = false,
        active = '',
        style
    } = props

    let newStyle = null;
    const history = useHistory();

    return (
        <>
            <Header>
                <HeaderBody>
                    <HeaderLogo onClick={ () => painel ? history.push('/painel') : history.push('/') }>
                        <Link to="/painel">
                            <img src={Logo} />
                        </Link>
                    </HeaderLogo>

                    {painel ?
                        <HeaderPages
                        active={active}>

                            <HomeFilled onClick={() => history.push("/painel")} className="icon__page" id="feed" />
                            <ProfileFilled onClick={() => history.push("/painel/servicos")} className="icon__page" id="services" />
                            <HeartFilled onClick={() => history.push("/painel/favoritos")} className="icon__page" id="favorites" />

                        </HeaderPages>
                        : null}

                    <HeaderElement
                        painel={painel}>
                        {cadastro ?
                            <>
                                <QuestionCircleFilled className="icon" />
                                <span>Preciso de ajuda</span>
                            </>
                            :
                            <>
                                <Notification />
                                <Exit />
                            </>}

                    </HeaderElement>
                </HeaderBody>
            </Header>
        </>
    )
}

const Header = styled.div`
position: fixed;
z-index: 10;
width: 100vw;
height: 10vh;
box-shadow: 0 0 10px #ccc;
background-color: ${Colors.gray.grayWhite};
`

const HeaderBody = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: auto;
width: 90%;
background-color: ${Colors.gray.grayWhite};
height: 10vh;
`

const HeaderLogo = styled.div`
img {
   height: 23px; 
}
`

const HeaderElement = styled.div`
align-items: center;
display: flex;
width: ${props => props.painel ? "12%" : null};
justify-content: ${props => props.painel ? "space-between" : null};
font-size: 16px;
color: ${Colors.blue.bluePrimary};

.icon svg {
    fill: ${Colors.blue.bluePrimary};
    font-size: 19px;
    margin-right: 7px;
}

span {
    display: flex;
    align-items: center;
}
`

const HeaderPages = styled.div`
width: 50%;
height: 100%;
display: flex;
align-items: flex-end;
justify-content: space-around;


.icon__page svg {
    fill: ${Colors.blue.bluePrimary};
    padding-bottom: 10px;
    cursor: pointer;
    display: inline-block;
    font-size: 37px;
}

#feed {
    border-bottom: ${props => props.active === "feed" ? "4px solid #2686CB" : null};
}

#services {
    border-bottom: ${props => props.active === "services" ? "4px solid #2686CB" : null};
}

#favorites {
    border-bottom: ${props => props.active === "favorites" ? "4px solid #2686CB" : null};
}
`

const PainelElements = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-around;
`