import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Button } from '../../molecules/Button'

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
        margin: "12px 0",
    },
}));

const Cadastropassword = ({ aoEnviar, voltar, validacoes }) => {
    const [password, setPassword] = useState();
    const [confirmaPassword, setConfirmaPassword] = useState();

    const classes = useStyles();
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <>
            <div>
                <h1 className="formulario__titulo">Criação de password</h1>
                <p className="formulario__desc">Crie uma password de no mínimo 8 dígitos: </p>
            </div>

            <form onSubmit={e => {
                e.preventDefault();
                aoEnviar({ password })
            }}>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                    <OutlinedInput
                        value={password}
                        onChange={handleChange('password'), (e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type={values.showPassword ? 'text' : 'password'}
                        required
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

                <TextField
                    value={confirmaPassword}
                    onChange={(e) => setConfirmaPassword(e.target.value)}
                    id="confirmaPassword"
                    label="Confirme sua senha"
                    type="password"
                    required
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                />

                <div className="formulario__botoes">
                    <Button
                        onClick={voltar}
                        contentText="Voltar"
                        style={{ width: "100%", marginRight: "10px" }}
                        primary={false} />
                    <Button
                        type="submit"
                        contentText="Próximo"
                        style={{ width: "100%" }} />
                </div>
            </form>
        </>
    )
}

export default Cadastropassword;