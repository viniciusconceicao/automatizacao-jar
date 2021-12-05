import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { ServiceCard } from '../../organisms/card/ServiceCard';
import App from '../../../assets/app.png';
import Design from '../../../assets/design.png';
import Web from '../../../assets/web.png';
import Shop from '../../../assets/shop.png';


const Services = () => {
    return (
        <>
            <ServicesPage id="servico">
                <h2>Conheça os nossos serviços!</h2>
                <div>
                    <ServiceCard
                        title="Mobile App"
                        description="Nossos programadores estão aptos para desenvolver seu aplicativo."
                        pic={App} />
                    <ServiceCard
                        title="Desenvolvimento Web"
                        description="Combine seu tempo e desejos com o programador, faça seu site do melhor jeito."
                        pic={Web} />
                    <ServiceCard
                        title="Designer UI e UX"
                        description="Os especialistas estão aqui, a experiência do usuário é o que  conta!"
                        pic={Design} />
                    <ServiceCard
                        title="O seu melhor e-commerce"
                        description="Encontre o melhor desenvolvedor para seu e-commerce ter sucesso."
                        pic={Shop} />
                </div>
            </ServicesPage>
        </>)
}

export default Services;



const ServicesPage = styled.section`
min-height: 100vh;
padding: 5%;
background-color: ${Colors.green.greenYellow};

h2 {
    color: ${Colors.gray.grayTitle};
    text-align: center;
    font-size: 2rem;
}

div {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
`