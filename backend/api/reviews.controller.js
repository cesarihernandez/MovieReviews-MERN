import ReviewsDAO from "../dao/reviews.DAO.js";
/* This will handle data requests for reviews.*/


export default class ReviewsController {

    static async apiPostReview(req, res, next) {
        try {
            // Grab the information from the user
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }
            const date = new Date();
            // Store that information in the database
            const reviewResponse = await ReviewsDAO.addReview(
                movieId, 
                userInfo, 
                review, 
                date
            )

            var { error } = reviewResponse;
            // Send a response back to the client's request
            // if there is an error what should we respond with?
            // reviewMovie can be { error: e}
            if (error) {
                res.status(500).json({error: "Unable to post review."});
            } else {
                res.json({
                    status: "success",
                    response: reviewResponse
                });
            }
        } catch (e) {
            res.status(500).json({error: e});
        }

          
    }

    static async apiUpdateReview(req, res, next) {
        // TODO: implementing PUT controller & DAO
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;

            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date 
            )

            var { error } = reviewResponse
            if (error) {
                res.status(500).json({ error });
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error ("Unable to update review.")
            }
            res.json({ status: "success "});
        } catch(e) {
            res.status(500).json({ errro: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        // TODO: implementing delete controller & DAO
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            );

            var { error } = reviewResponse;
            if (error) {
                res.status(500).json({ error });
            } else {
                res.json({ status: "success"});
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}