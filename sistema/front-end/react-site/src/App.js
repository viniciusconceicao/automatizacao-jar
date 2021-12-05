import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cadastro from './components/pages/cadastro/Cadastro';
import Configuracoes from './components/pages/configuracao/Configuracao';
import Institucional from './components/pages/institucional/Institucional';
import Page404 from './components/pages/Page404';
import Painel from './components/pages/painel/Painel';
import Perfil from './components/pages/perfil/Perfil';
import PrivateRoute from './services/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Institucional} />
        <Route path='/cadastro' component={Cadastro} />
        <PrivateRoute path='/painel' component={Painel} />
        <PrivateRoute path='/perfil' component={Perfil} />
        <Route path='/configuracoes' component={Configuracoes} />
        <Route path='*' exact component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
