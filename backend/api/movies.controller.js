/*This will handle data requests specific to movies. */

import MoviesDAO from '../dao/moviesDAO.js';
import { query } from 'express';

export default class MoviesController {

    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ?
            parseInt(req.query.moviesPerPage) : 20;
        const page = req.query.page ? parseInt(req,query.page) : 0;

        let filters = {}
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }

        const { moviesList, totalNumMovies } = await //moviesList, totalNumMovies are parameters that allows
        //users to customize the info they want to receive. 
            MoviesDAO.getMovies({ filters, page, moviesPerPage }); //here he go into our backend and get the data.

        let response = { //the response from the request by the user, which is the moviesList and totalNumMovies
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };
        res.json(response);
    }

    static async apiGetMoiveById(req, res, next) {
        try {
            let id = req.params.id || {}
            let movie = await MoviesDAO.getMovieById(id);
            if (!movie) {
                res.status(404).json({ error: "not found"});
                return;
            }
            res.json(movie);
        }   catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetRatings(req, res, next) {
        try {
            let ratings = await MoviesDAO.getRatings();
            res.json(ratings);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e});
        }
    }
}