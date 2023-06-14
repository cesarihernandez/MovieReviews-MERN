import supertest from "supertest";
import { expect } from "chai";
import app from '../index.js';

const requestWithSupertest = supertest(app);

describe('Testing GET /movies endpoint', function (){
    it('responds with a valid HTTP status code and number of movies',
     async function (){
        const DEFAULT_MOVIES_PER_PAGE = 20;
        const response = await requestWithSupertest.get('/api/v1/movies');

        expect(response.status).to.equal(200);
        expect(response.body.movies.length).to.equal(DEFAULT_MOVIES_PER_PAGE);
     });
});