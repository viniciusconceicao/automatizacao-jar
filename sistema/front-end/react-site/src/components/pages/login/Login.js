import React, { useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx';
import { makeStyles, TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Colors } from '../../../shared/Colors';
import { Button } from '../../molecules/Button';
import { Alert } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import api from '../../../services/api.js'

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
        margin: "12px 0",
    },
}));

const Login = () => {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState(false);

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const history = useHistory();

    async function login(e) {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        try {
            const response = await api.post('/api/users/authenticate', data);

            localStorage.setItem('email', email);
            localStorage.setItem('nameUser', response.data.nameUser);
            localStorage.setItem('idUser', response.data.idUser);
            localStorage.setItem('status', response.data.status);
            localStorage.setItem('role', response.data.role);
            console.log("resposta vindo do login:", response.data);
            history.push('/painel');
        } catch (err) {
            setErro(true);
            console.log('Erro ao logar. Email ou senha incorretos.');
        }
    }


    return (
        <>
            <DrawerContent>
                <form onSubmit={login}>
                    <DrawerHeader>
                        <h1>Olá!</h1>
                        <span>Faça login para acessar sua conta da <b>SearchDevelopers</b> </span>
                        {
                            erro ?
                                <Alert
                                    className="login-error"
                                    message="Erro ao logar"
                                    description="Email ou senha incorretos! Tente novamente."
                                    type="error"
                                    showIcon
                                />
                                :
                                null
                        }

                    </DrawerHeader>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ margin: "12px 0", width: "100%" }} />
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>

                    <Link>Esqueci minha senha</Link>
                    <p>Não possui uma conta? <Link to="/cadastro">Cadastre-se</Link></p>

                    <Button contentText="Entrar" type="submit" style={{ width: "100%", marginTop: "35px" }} />
                </form>
            </DrawerContent>
        </>
    )
}

export default Login;

const DrawerContent = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
padding: 35px;

.login-error {
    margin-top: 20px;
}
`

const DrawerHeader = styled.div`
margin-bottom: 20px;

h1 {
    font-size: 32px;
    color: ${Colors.gray.grayTitle};
}
span {
    font-size: 16px;
    color: ${Colors.gray.grayText};
}

span b {
    color: ${Colors.green.greenPrimary};
    font-weight: 500;
}
`
