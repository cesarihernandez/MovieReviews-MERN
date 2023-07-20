let favoritesCollection;
let movieCollection;
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;
// Initializes the connection and will be called in index.js
export default class FavoritesDAO {
    static async injectDB(conn) {
        if(favoritesCollection) {
            return;
        }
        try {
            favoritesCollection = await conn.db(process.env.MOVIEREVIEWS_COLLECTION)
                            .collection('favorites');
                            movieCollection = await conn.db(process.env.MOVIEREVIEWS_COLLECTION)
                            .collection('movies');
        }
        catch(e) {
            console.error(`Unable to connect in FavoritesDAO: ${e}`);
        }
    }

    static async updateFavorites(userId, favorites) {
        console.log('trying to update favorite', userId, favorites)
        try {
            const updateResponse = await favoritesCollection.updateOne(
                {_id: userId },
                { $set: { favorites: favorites }},
                { upsert: true } // ensures that if an entry does not exist for the user
                // it is created, otherwise it is updated.
            )
            return updateResponse
        }
        catch(e) {
            console.error(`Unable to update favorites: ${e}`);
            return { eroor: e };
        }
    }
    // carries out a find operation on the DB with the user's ID as the key.
    static async getFavorites(id) {
        let cursor;
        try {
            cursor = await favoritesCollection.find({
                _id: id
            });
            const favorites = await cursor.toArray();
            console.log('favorites grabed', favorites)
            return favorites[0];
        }   catch(e) {
            console.error(`Something went wrong in getFavorites: ${e}`);
            throw e;
        }
    }

    static async getFavoritesWithMovieInfo(id) {
        let cursor; //why do we use the word cursor?
        let favoritesWithMovieInfo = []; //empty array to store our favorite movieList
        try {
            cursor = await favoritesCollection.find({
                _id: id
            });
            const favorites = await cursor.toArray(); //need to review. I understand we have a for loop that goes through 
            // each movie id and grabs the movie details associated with that id.
            console.log('favorites grabed', favorites)
            const favoritesList = favorites[0]
            for (let movieId of favoritesList.favorites) {
                cursor = await movieCollection.find({
                    _id: new ObjectId(movieId)
                });
                const movie = await cursor.toArray();

                console.log('movie grabed', movie[0])
                favoritesWithMovieInfo.push(movie[0]); // place movie info into variable favortiesWithMovieInfo

    
            }
            return favoritesWithMovieInfo;
        }   catch(e) {
            console.error(`Something went wrong in getFavorites: ${e}`);
            throw e;
        }
    }
}