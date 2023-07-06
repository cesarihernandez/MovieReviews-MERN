let favoritesCollection;
// Initializes the connection and will be called in index.js
export default class FavoritesDAO {
    static async injectDB(conn) {
        if(favoritesCollection) {
            return;
        }
        try {
            favoritesCollection = await conn.db(process.env.MOVIEWREVIEWS_COLLECTION)
                            .collection('favorites');
        }
        catch(e) {
            console.error(`Unable to connect in FavoritesDAO: ${e}`);
        }
    }

    static async updateFavorites(userId, favorites) {
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
            return favorites[0];
        }   catch(e) {
            console.error(`Something went wrong in getFavorites: ${e}`);
            throw e;
        }
    }
}