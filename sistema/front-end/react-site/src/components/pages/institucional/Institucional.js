import React from 'react';
import styled from 'styled-components';
import './index.css';
import { Colors } from '../../../shared/Colors';
import { Header } from '../../organisms/header/Header';
import { Fab } from '../../molecules/Fab';
import { Banner } from '../../organisms/Banner';
import { Footer } from '../../organisms/Footer';
import Home from './Home';
import Services from './Services';
import HowItWorks from './HowItWorks';
import ForDev from './ForDev';

const Institucional = () => {

    return (
        <>
                <Header services={true} />
                <Main>
                    <Home />
                    <Services />
                    <HowItWorks />
                    <ForDev />
                </Main>
                <Banner />
                <Footer />
                <Fab />
        </>
    )
}
export default Institucional;


const Main = styled.main`
color: ${Colors.gray.grayText};
`








