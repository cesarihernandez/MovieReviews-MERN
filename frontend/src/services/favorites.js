import axios from 'axios';

class FavoriteService { 

    getFavorites(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${userId}`);
    }

    updateFavorites(data) { 
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
    }


    getFavoritesWithMovieInfo(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favoritesWithMovieInfo/${userId}`);
    }

}
export default new FavoriteService();