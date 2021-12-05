import React, { useEffect, useState } from 'react';
import './index.css'
import { Alert, Breadcrumb, Skeleton } from 'antd';
import Filter from '../../organisms/Filter';
import SearchInput from '../../molecules/SearchInput';
import { ProfileCard } from '../../organisms/card/ProfileCard';
import api from '../../../services/api';

const PainelFeed = () => {
    const idStorage = localStorage.getItem('idUser');
    const [users, setUsers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favorite, setFavorite] = useState(false)
    const [loading, setLoading] = useState(false);


    async function getUsers() {
        try {
            setLoading(true);
            const response = await api.get(`/api/users/type/${idStorage}`);
            console.log(response.data)
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.log("erro ao trazer usuários", err)
        }


    }

    async function getFavoriteUsers() {
        const response = await api.get(`/api/favorites/type/${idStorage}`);

        if (response.status === 200) {
            console.log(response.data)
            setFavorites(response.data);
        }


    }

    function userFav(id) {

        favorites.map(fav => {
            if (fav.userDev.idUser === id) {
                return true
            } else {
                return false
            }
        })
    }

    function favoritarUser(id) {
        try {
            api.post(`/api/favorites/client/${idStorage}/dev/${id}`);
            setFavorite(true)
            newNotification(id)
            console.log("usuário favoritado")
        } catch (err) {
            console.log("Erro ao favoritar usuário", err)
        }
    }

    function newNotification(id) {
        try {
            api.post(`/notification/sender/${idStorage}/receiver/${id}`, {
                typeNotification: "favorite",
                title: "te marcou como favorito",
                statusNotification: true,
            })
            console.log("notificação enviada com sucesso")
        } catch (err) {
            console.log("erro ao enviar notificação", err)
        }
    }

    function desfavoritarUser(id) {
        try {

            let alvo;

            favorites.filter(favorite => {
                if (favorite.userDev.idUser === id) {
                    console.log(favorite.idFavorite)

                    alvo = favorite.idFavorite
                }
            })

            api.put(`/api/favorites/dislike/client/${idStorage}/dev/${id}`)
            console.log("usuário desfavoritado")
        } catch (err) {
            console.log("Erro ao desfavoritar usuário", err)
        }

    }

    useEffect(() => {

        getFavoriteUsers()
        getUsers()

    }, [])

    useEffect(() => getFavoriteUsers(), [favorite])

    return (
        <>
            <div className="template header">
                <Filter />
                <SearchInput />
            </div>
            <div className="template body">

                <Breadcrumb style={{ marginBottom: "20px" }}>
                    <Breadcrumb.Item>Painel</Breadcrumb.Item>
                    <Breadcrumb.Item>Usuários</Breadcrumb.Item>
                </Breadcrumb>

                {loading ?
                    <>
                        <Skeleton avatar paragraph={{ rows: 2 }} active />
                        <Skeleton avatar paragraph={{ rows: 2 }} active />
                        <Skeleton avatar paragraph={{ rows: 2 }} active />
                    </>

                    :
                    users.map((user) => {

                        return (
                            <ProfileCard key={user.idUser}
                                id={user.idUser}
                                pic={user.photo}
                                phone={user.phone}
                                name={user.nameUser}
                                description={user.descriptionUser}
                                rate={user.stars}
                                favoriteFunction={() => favoritarUser(user.idUser)}
                                unfavoriteFunction={() => desfavoritarUser(user.idUser)}
                                isFavorite={userFav(user.idUser)}
                            />
                        )
                    })}
            </div>
        </>
    )
}

export default PainelFeed;
