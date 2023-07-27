import "./favoritesList.css";
import FavoriteService from "../services/favorites";
import React, { useState, useEffect, useCallback } from 'react';
import FavoriteCard from "./FavoriteCard";
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

const FavoritesList = ({ user }) => {

    const [favorites, setFavorites] = useState([]);

    const retrieveFavorites = useCallback(() => {
        if (user) {
            FavoriteService.getFavoritesWithMovieInfo(user.googleId) //user has an ID through google
                .then(response => {
                    setFavorites(response.data)
                })
                .catch(e => {
                    console.log(e);
                });
            }
  }, [user])

    useEffect(() => {

        if (user) {
            console.log('what is user', user)
            retrieveFavorites();
        }
    }, [retrieveFavorites, user]);


    console.log('favorites in favorite list', favorites);

    return (
        <div className="Parent">
            <div className="columnOne">
                <h1>
                    Drag your favorites to rank them
                </h1>
            </div>
            <div className="columnTwo">
                {favorites.map((favorite, i) => { //map takes a function (favorites) and creates a new 
                // array with results. takes in two arguments the element and the index of the current element being processed 
                //in the array
                    return (
                       <FavoriteCard 
                        favorite={ favorite }
                       i={ i } 
                       favorites={ favorites } //passing favorties to FavoriteCard as a prop
                       setFavorites= { setFavorites }
                       user={ user }
                       /> 
                    )
                })}

            </div>
        </div>
    )
}

export default FavoritesList;