1. Implemented handlers for getting and setting favorites, and then implemented frontend interface to enable logged in
users to click a star on a movie card to add the movie to their favorties list.
2. Added on overlay for the star icon so that it does not push down the movie card.

[favorites list.pdf](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CesarHernandez-frontend/files/297/favorites.list.pdf)
>>
[star icon.pdf](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CesarHernandez-frontend/files/298/star.icon.pdf)




1. Created an "Edit" feature for reviews by utilizing the Link to attribute to send the user to the Add Reivew component. 
2. Added a "Delete"feature for reviews by writing a function that calls in the Delete button's "onClick" callback. This function also
removes the review from the page.

[newly written review.pdf](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CesarHernandez-frontend/files/295/newly.written.review.pdf)
>>
[review edited.pdf](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CesarHernandez-frontend/files/296/review.edited.pdf)








1. Made updates to MoviesList.js and Movie.js file by adding the onError attribute on the Card.Img element. This allowed for a placeholder photo to be present instead of a broken icon image.
2. In Movie.js I implemented the getMovie function by using MovieDataService to use the mething findById(id) and then update the data by using
setMovie. I also needed to create a new Route to access the backend data by createing a findById method in services/movies.js file.
3. I attempted to created a Movie test but it continued to fail as well as the MoviesList.test.js file that was given to us. I was unsure if we needed 
to make any adjustments to Movies.test.js but after inspecting the website and uitlizing console.log, it shows I was able to get the Movie and number of reviews.


[display localhost_3000 with placeholder.pdf](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CesarHernandez-frontend/files/291/display.localhost_3000.with.placeholder.pdf) >>
[single movie with movie poster.pdf](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CesarHernandez-frontend/files/292/single.movie.with.movie.poster.pdf) >>
[single movie with placeholder poster.pdf](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CesarHernandez-frontend/files/293/single.movie.with.placeholder.poster.pdf) >>
[tests.pdf](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CesarHernandez-frontend/files/294/tests.pdf)
