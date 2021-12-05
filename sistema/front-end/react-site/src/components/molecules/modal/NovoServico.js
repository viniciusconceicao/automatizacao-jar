import React, {useState} from 'react';
import styled from 'styled-components';
import { Colors } from '../../../shared/Colors';
import { Button } from '../Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import api from '../../../services/api';
import { useHistory } from 'react-router'
import Success from '../../organisms/Success';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const NovoServico = (props) => {
    const {
        idStorage = localStorage.getItem('idUser'),
        roleStorage = localStorage.getItem('role'),
        name,
        id,

    } = props

    const history = useHistory();
    const [tag, setTag] = useState("");
    const [descriptionService, setDescriptionService] = useState("");
    const classes = useStyles();
    const [loadingButton , setLoadingButton] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [state, setState] = useState({
        age: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
        setTag(event.target.value)
    };

    async function newService(e) {
        e.preventDefault();

        setLoadingButton(true);

        const data = {
            descriptionService,
            tag,
        };

        try {

            if(roleStorage === "clt") {
                await api.post(`/api/services/client/${idStorage}/dev/${id}`, data);
                
            } else {
                await api.post(`/api/services/client/${id}/dev/${idStorage}`, data);

            }
            newNotification();            
            console.log("Solicitação de serviço concluida")
            setSucesso(true);

        } catch (err) {
            console.log('Erro ao solitar serviço.');
        }

        setLoadingButton(false);
    }

    function newNotification() {
        try {
            api.post(`/notification/sender/${idStorage}/receiver/${id}`, {
                typeNotification: "service",
                title: "solicitou serviço com você",
                statusNotification: true,
            })
            console.log("notificação enviada com sucesso")
        } catch(err) {
            console.log("erro ao enviar notificação", err)
        }
    }

    return (
        <>
        {
            sucesso ?
            <>
            <Success 
            text={`Sua solicitação de serviço foi realizada com sucesso! Aguarde a resposta de ${name}`}
            textButton="Ir para meus serviços"
            onclick={() => history.push('/painel/servicos')} />
            </>
            :

             <ContainerNewService>
                <h2>Criar solicitação de serviço com <span>{name}</span></h2>
                <div className="form__input">
                    <label className="form__label"> 1 - Categoria</label>
                    <FormControl size="small" variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Selecione</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={handleChange}
                            label="Categoria"
                        >
                            <MenuItem value={"Web sites"}>Web sites</MenuItem>
                            <MenuItem value={"Mobile app"}>Mobile app</MenuItem>
                            <MenuItem value={"Infraestrutura"}>Infraestrutura</MenuItem>
                            <MenuItem value={"Segurança da informação"}>Segurança da Informação</MenuItem>
                            <MenuItem value={"Inteligencia artificial"}>Inteligência artificial</MenuItem>
                            <MenuItem value={"Outro"}>Outro</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="form__input">
                    <label className="form__label">2 - Descrição do serviço</label>
                    <textarea onChange={e => setDescriptionService(e.target.value)} />
                    <p className="contador">{descriptionService ? descriptionService.length : 0}/200 caracteres permitidos</p>
                </div>
                <Button contentText="Cancelar" style={{ width: "100%" }} primary={false} />
                <Button contentText="Fazer solicitação" style={{ width: "100%", marginTop: "10px" }} onClick={newService} loading={loadingButton} />
            </ContainerNewService>
        }
           
        </>
    )

}

export default NovoServico;

const ContainerNewService = styled.div`
padding: 20px;

h2 {
    font-weight: 500;
    font-size: 18px;

    span {
        color: ${Colors.green.greenPrimary};
    }
}

.form__input {
    padding: 15px 0;
}

.form__label {
    display: block;
    padding-bottom: 8px;
}

textarea {
    padding: 15px;
    border-radius: 5px;
    border: 1px solid ${Colors.gray.grayTabLine};
    width: 100%;
    height: 100px;
}

.contador {
    color: ${Colors.blue.bluePrimary};
    text-align: right;
    padding: 5px 0;
}

`