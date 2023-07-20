import "./favoritesList.css";
import FavoriteService from "../services/favorites";
import React, { useState, useEffect, useCallback } from 'react';


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
                        <div className="favoritesCard">
                            <div className="borderCard">
                                <div className="favoritesNumber">
                                    <p className="favoritesNumberOneDigit">
                                        {i + 1}
                                    </p>
                                </div>
                                <img className="favoritesPoster" src={favorite.poster} onError={(e) => {
                                    e.currentTarget.onerror = null; // prevents looping 
                                    e.currentTarget.src = "/images/NoPosterAvailable-crop.jpg";
                                }} /> 
                                <h1 className="favoritesTitle"> 
                                    {favorite.title}
                                </h1>

                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default FavoritesList;