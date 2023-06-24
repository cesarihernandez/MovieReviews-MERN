import axios from 'axios';

class MovieDataService {

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?page=${page}`);
    }

    find(query, by='title', page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?${by}=${query}&page=${page}`
        );
    }

    getRatings() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`);
    }

    findById(_id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/id/${_id}`);
    }
}

/*eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new MovieDataService();

