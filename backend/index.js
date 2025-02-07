/*This will contain the top-level code for the backend. 
It will connect up our database and data access objects and set up exception handling.*/

import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import MoviesDAO from './dao/moviesDAO.js';
import ReviewsDAO from './dao/reviews.DAO.js'; //mod for pt.2 challenge
import FavoritesDAO from './dao/favoritesDAO.js';
async function main() {
    
    dotenv.config();
    console.log(process.env.MOVIEREVIEWS_DB_URI)

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    );
    const port = process.env.PORT || 8000;

    try {
        // Connect to MongoDB server
        await client.connect();
        await FavoritesDAO.injectDB(client);
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client); //mod pt2 challenge

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }   catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);

// We export here for the benefit of testing
export default app;