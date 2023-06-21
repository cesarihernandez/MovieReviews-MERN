/*This will be where our server code will reside. 
This is where the Express framework will be put to use.*/

import express from 'express';
import cors from 'cors';
import moviesRoutes from './api/movies.route.js';

const app = express();

app.use(cors());
app.use(express.json());
// Looking fora  route that is /

app.use('/api/v1/movies', moviesRoutes);
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;