import { TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { Button } from '../Button';

const RedesSociais = (props) => {

    const {
        facebook,
        facebookUrl,
        instagram,
        instagramUrl,
        linkedin,
        linkedinUrl,
        git,
        gitUrl,
        submit = "",
        loading,
    } = props

    return (
        <>
            <Container onSubmit={(e) => submit(e)}>
                <h3>Minhas redes sociais</h3>

                <Section>
                    <span>LinkedIn</span>
                    <BoxDiv>
                        <TextField
                            value={linkedin.value}
                            name={linkedin.id}
                            id={linkedin.id}
                            label="User"
                            variant="outlined"
                            defaultValue={linkedin.default}
                            onChange={linkedin.onchange}
                            style={{ marginRight: "10px" }} />

                        <TextField
                            value={linkedinUrl.value}
                            name={linkedinUrl.id}
                            id={linkedinUrl.id}
                            label="URL"
                            variant="outlined"
                            defaultValue={linkedinUrl.default}
                            onChange={linkedinUrl.onchange}
                            style={{ width: "100%" }} />
                    </BoxDiv>
                </Section>

                <Section>
                    <span>Facebook</span>
                    <BoxDiv>
                        <TextField
                            value={facebook.value}
                            name={facebook.id}
                            id={facebook.id}
                            label="User"
                            variant="outlined"
                            defaultValue={facebook.default}
                            onChange={facebook.onchange}
                            style={{ marginRight: "10px" }} />

                        <TextField
                            value={facebookUrl.value}
                            name={facebookUrl.id}
                            id={facebookUrl.id}
                            label="URL"
                            variant="outlined"
                            defaultValue={facebookUrl.default}
                            onChange={facebookUrl.onchange}
                            style={{ width: "100%" }} />
                    </BoxDiv>
                </Section>
                <Section>
                    <span>Instagram</span>
                    <BoxDiv>
                        <TextField
                            value={instagram.value}
                            name={instagram.id}
                            id={instagram.id}
                            label="User"
                            variant="outlined"
                            defaultValue={instagram.default}
                            onChange={instagram.onchange}
                            style={{ marginRight: "10px" }} />

                        <TextField
                            value={instagramUrl.value}
                            name={instagramUrl.id}
                            id={instagramUrl.id}
                            label="URL"
                            variant="outlined"
                            defaultValue={instagramUrl.default}
                            onChange={instagramUrl.onchange}
                            style={{ width: "100%" }} />
                    </BoxDiv>
                </Section>

                <Section>
                    <span>GitHub</span>
                    <BoxDiv>
                        <TextField
                            value={git.value}
                            name={git.id}
                            id={git.id}
                            label="User"
                            variant="outlined"
                            defaultValue={git.default}
                            onChange={git.onchange}
                            style={{ marginRight: "10px" }} />

                        <TextField
                            value={gitUrl.value}
                            name={gitUrl.id}
                            id={gitUrl.id}
                            label="URL"
                            variant="outlined"
                            defaultValue={gitUrl.default}
                            onChange={gitUrl.onchange}
                            style={{ width: "100%" }} />
                    </BoxDiv>
                </Section>

                <Button contentText="Atualizar" style={{width: "100%", marginTop: "20px"}} type="submit" loading={loading} />
            </Container>
        </>
    )
}

export default RedesSociais;

const Container = styled.form`
padding: 15px;

`

const BoxDiv = styled.div`
display: flex;
`

const Section = styled.div `
padding: 10px 0;

span {
    padding-bottom: 7px;
    display: inline-block;
    font-weight: 500;
    color: ${Colors.blue.bluePrimary};
}
`