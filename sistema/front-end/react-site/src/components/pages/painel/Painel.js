import React from 'react'
import './index.css'
import { HeaderPainel } from '../../organisms/header/HeaderPainel'
import { Sidebar } from '../../organisms/Sidebar';
import { Route } from 'react-router-dom';
import PainelFeed from './PainelFeed';
import PainelServicos from './PainelServicos';
import PainelFavoritos from './PainelFavoritos';

const Painel = () => {
    return (
        <>
            <HeaderPainel painel />
            <div className="flex">
                <Sidebar />
                <section className="container">
                    <Route exact path="/painel">
                        <PainelFeed />
                    </Route>
                    <Route path="/painel/servicos">
                        <PainelServicos />
                    </Route>
                    <Route path="/painel/favoritos">
                        <PainelFavoritos />
                    </Route>
                </section>
            </div>
        </>
    )
}

export default Painel;