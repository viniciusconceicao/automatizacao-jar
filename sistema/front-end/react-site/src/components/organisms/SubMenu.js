import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../shared/Colors';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Alarm, AlarmOn, AlarmAdd } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
    },
});

export function SubMenu() {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const history = useHistory();


    return (
        <>
            <Style>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction label="Solicitações de serviço" icon={<AlarmAdd />} onClick={() => history.push('/painel/servicos/solicitados')} />
                    <BottomNavigationAction label="Serviços em andamento" icon={<Alarm />} onClick={() => history.push('/painel/servicos')} />
                    <BottomNavigationAction label="Serviços concluídos" icon={<AlarmOn />} onClick={() => history.push('/painel/servicos/concluidos')} />
                </BottomNavigation>
            </Style>

        </>
    )
}

const Style = styled.div`
width: 100%;

.MuiBottomNavigationAction-root{
    max-width: initial;
}

.MuiBottomNavigationAction-root.Mui-selected {
    color: ${Colors.blue.bluePrimary};
}

.MuiBottomNavigationAction-label {
    font-size: 14px;
}

.MuiSvgIcon-root {
    font-size: 1.7rem;
}

.MuiBottomNavigationAction-label.Mui-selected {
    font-size: 16px;
}
`