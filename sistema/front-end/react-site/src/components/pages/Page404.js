import React from 'react';
import Error from '../../assets/404.png'
import { Colors } from '../../shared/Colors'
import styled from 'styled-components'

const Page404 = () => {
    return (
        <>
            <ErrorPage>
                <Mask>
                    <img src={Error} />
                    <ErrorText>
                        <strong>Ops!</strong>
                        <span>Esta página não existe :P</span>
                    </ErrorText>
                </Mask>
            </ErrorPage>
        </>
    )

}

export default Page404;

const ErrorPage = styled.div`
background: linear-gradient(180deg, rgba(61,219,196,1) 0%, rgba(64,230,158,1) 50%, rgba(68,207,108,1) 100%);
width: 100%;
height: 100vh;
`
const Mask = styled.div `
height: 100%;
width: 80%;
margin: auto;
align-items: center;
display: flex;

@media(max-width: 1040px) {
    flex-direction: column;
}
`

const ErrorText = styled.div`
font-size: 32px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: ${Colors.green.greenYellow};


strong {
    font-size: 120px;
    color: ${Colors.gray.grayWhite};
}
`