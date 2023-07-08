/*API Directory This is where routing and handling of data queries will occur. */
/*
This will handle routing of incoming http requests, based on their URLs.
*/

import express from 'express';

import FavoritesController from './favorites.controller.js';

const router = express.Router(); //Get access to Express router\

router
    .route("/")
    .put(FavoritesController.apiUpdateFavorites);

router
    .route("/:userId")
    .get(FavoritesController.apiGetFavorites);

export default router;