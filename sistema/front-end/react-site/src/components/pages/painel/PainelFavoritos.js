import React, { useEffect, useState } from 'react';
import { Breadcrumb, Skeleton } from 'antd';
import { ProfileCard } from '../../organisms/card/ProfileCard';
import api from '../../../services/api';
import EmptyState from '../../organisms/EmptyState';

const PainelFavoritos = () => {

    const idStorage = localStorage.getItem('idUser');
    const [users, setUsers] = useState([]);
    const [favorite, setFavorite] = useState(true);
    const [loading, setLoading] = useState(false);


    async function getFavoritesUser() {
        try {
            setLoading(true);
            const response = await api.get(`/api/favorites/type/${idStorage}`)
            console.log("favoritos", response.data)
            setUsers(response.data)
            setLoading(false);

        } catch (err) {
            console.log("erro ao listar favoritos!", err)

        }
    }

    function desfavoritarUser(id) {
        try {

            let alvo;

            users.filter(favorite => {
                if (favorite.userDev.idUser === id) {
                    console.log(favorite.idFavorite)

                    alvo = favorite.idFavorite
                }
            })

            api.put(`/api/favorites/dislike/client/${idStorage}/dev/${id}`);
            window.location.reload()
            console.log("usuário desfavoritado")
        } catch (err) {
            console.log("Erro ao desfavoritar usuário", err)
        }

    }

    useEffect(() => {
        getFavoritesUser()

    }, [])
    return (
        <>
            <div className="template body">
                <Breadcrumb style={{ marginBottom: "20px" }}>
                    <Breadcrumb.Item>Painel</Breadcrumb.Item>
                    <Breadcrumb.Item>Favoritos</Breadcrumb.Item>
                </Breadcrumb>

                {loading ?
                    <>
                        <Skeleton avatar paragraph={{ rows: 2 }} active />
                        <Skeleton avatar paragraph={{ rows: 2 }} active />
                        <Skeleton avatar paragraph={{ rows: 2 }} active />
                    </>
                    :
                    users ?
                        users.map((user) => {
                            return (
                                <ProfileCard
                                    pic={user.userDev.photo}
                                    name={user.userDev.nameUser}
                                    description={user.userDev.descriptionUser}
                                    rate={user.userDev.stars}
                                    unfavoriteFunction={() => desfavoritarUser(user.userDev.idUser)}
                                    isFavorite={true} />
                            )
                        })
                        :
                        <EmptyState text="Você não possui usuários favoritados" />
                }
            </div>
        </>
    )
}

export default PainelFavoritos;