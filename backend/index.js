/*This will contain the top-level code for the backend. 
It will connect up our database and data access objects and set up exception handling.*/

import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import MoviesDAO from './dao/moviesDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    );
    const port = process.env.PORT || 8000;

    try {
        // Connect to MongoDB server
        await client.connect();
        await MoviesDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }   catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);