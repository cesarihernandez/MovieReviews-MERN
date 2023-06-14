/*API Directory This is where routing and handling of data queries will occur. */
/*
This will handle routing of incoming http requests, based on their URLs.
*/

import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';


const router = express.Router(); //Get access to Express router

router.route('/').get(MoviesController.apiGetMovies);
router.route('/id/:id').get(MoviesController.apiGetMoiveById);
router.route('/ratings').get(MoviesController.apiGetRatings);

router.route('/review').post(ReviewsController.apiPostReview);

export default router;