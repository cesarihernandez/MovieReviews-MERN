/* This will handle data requests for reviews.*/

import ReviewsDAO from "../dao/reviews.DAO";

export default class ReviewsController {

    static async apiPostReview(req, res, next) {
        // TODO:
        try {
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }

            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            );

            var { error } = reviewResponse;

            if (error) {
                res.status(500).json({ error: "Unable to post review." });
            } else {
                res.json({
                    status: "success",
                    response: reviewResponse
                });
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    static async apiUpdateReview(req, res, next) {
        // TODO:
    }

    static async apiDeleteReview(req, res, next) {
        // TODO:
    }
}