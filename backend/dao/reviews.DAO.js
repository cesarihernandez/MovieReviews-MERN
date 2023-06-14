/*
This will query the MongoDB database directly for reviews data.
*/

import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {

    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_COLLECTION)
                                    .collection('reviews');
        } catch (e) {
            console.error(`Unable to connect to reviewsDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user_id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId),
            }
            return await reviews.insertOne(reviewDoc);
        } catch(e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, user, review, date) {

    }

    static async deleteReview(reviewId) {

    }
}