/*This is where the lower-level data access will be handled. It will operate between the database and the API.*/
/*
This will query the MongoDB database directly for movies data.
*/

import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let movies;

export default class MoviesDAO {
    static async injectDB(conn) {
        if(movies) {
            return;
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_COLLECTION).collection('movies');
        } catch (e) {
            console.log(`Unable to connect to movieDAO: ${e}`);
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) { // empty object as default value
        let query;
    }
}