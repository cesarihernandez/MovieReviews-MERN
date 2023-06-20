import supertest from "supertest";
import { expect } from "chai";
import app from '../index.js';
import { request } from "express";

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

describe('Testing GET /movies/id/:id endipoint', function () {
   it('responds with a valid HTTP status code and responde body',
   async function () {
      //This is the ID number of the movie 'Blacksmith Scene'
      const response = await requestWithSupertest.get(
         'api/v1/movies/id/573a1390f29313caabcd4135'
      );
      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal('Blacksmith Scene');
   });
});

//Get Ratings:
describe('Testing GET /movies/ratings endpoint', function () {
   it('responds with a valid HTTP status code and ratings',
   async function () {
      const response = await requestWithSupertest.get('/api/v1/movies/ratings');
      expect(response.status).to.equal('AO');
      expect(response.body.length).to.equal(21);
   });
});

//Post review:
describe('Testing POST /reviews endpoint', function () {
   it('responds with a valid HTTP status code and number of movies',
   async function () {
      const req_body = {
         "movie_id": "573a1390f29313caabcd4135",
         "review": "This is a TEST review",
         "user_id": "1234",
         "name": "Testy Testerson"
      }
      const response = await requestWithSupertest.post('/api/v1/movies/review')
                                                .send(req_body);
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');

      //Delete the review we just created
      const del_body = {
         "review_id": response.body.response.insertId,
      }
      await requestWithSupertest.delete('/api/v1/movies/review')
                                 .send(del_body);
   });
});

//Update Review (failed case):
describe('Testing PUT /reviews endpoint', function () {
   it('fails to update a review with the wrong use ID',
   async function () {
      //Create a review
      const req_body = {
         "movie_id": "573a1390f29313caabcd4135",
         "review": "This is a TEST review",
         "user_id": "1234",
         "name": "Testy Testerson"
      }
      const response = await requestWithSupertest.post('/api/v1/movies/review')
                                                   .send(req_body);
         //try to update the review with a different user ID
         const update_body = {
            "review_id": response.body.response.insertId,
            "review": "This is an UPDATED TEST review",
            "user_id": "1235" //this should fail
         }
         const update_response = await requestWithSupertest.put('/api/v1/movies/review')
                                                            .send(update_body);
         expect(update_response.status).not.to.equal(200);
         expect(update_response.body.status).not.to.equal('success');

         //Delete the reiew we just created
         const del_body = {
            "review_id": response.body.response.insertId,
         }
         await requestWithSupertest.delete('/api/v1/movies/review')
                                    .send(del_body);
   }); 
      it('succeeds in updating a review with the correct user ID',
      async function () {
         const req_body = {
            "movie_id": "573a1390f29313caabcd4135",
            "review": "This is a TEST review",
            "user_id": "1234",
            "name": "Testy Testerson"
         }
         const response = await requestWithSupertest.post('/api/v1/movies/review')
                                                      .send(req_body);
         //try to update the review with the correct user ID
         const update_body = {
            "review_id": response.body.response.insertId,
            "review": "This is an UPDATED TEST review",
            "user_id": "1234" //this should be the same as the original user_id
         }
         const update_response = await requestWithSupertest.put('/api/v1/movies/review')
                                                      .send(req_body);
         expect(update_response.status).to.equal(200);
         expect(update_response.body.status).to.equal('success');

         //delete the review we just created

         const del_body = {
            "review_id": response.body.response.insertId,
         }
         await requestWithSupertest.delete('/api/v1/movies/review')
                                    .send(del_body);                                    
   });
});


//Delete Review
describe('Testing DELETE /reviews endpoint', function () {
   //this test is a bit redundant, but it's here for completeness
   //The POST test already deletes the review it creates
   //This test is here to make sure that the DELETE endpoint works
   //as expected

   it('responds with a valid HTTP status code', async function () {
      const req_body = {
         "movie_id": "573a1390f29313caabcd4135",
         "review": "This is a TEST review",
         "user_id": "1234",
         "name": "Testy Testerson"
      }
      const response = await requestWithSupertest.post('/api/v1/movies/review')
                                                   .send(req_body);

      const del_body = {
         "review_id": response.body.response.insertId,
      }
      const del_reponse = await requestWithSupertest.delete('/api/v1/movies/review')
                                                   .send(del_body);

      expect(del_reponse.status).to.equal(200);
      expect(del_reponse.body.status).to.equal('success');
   });
});
