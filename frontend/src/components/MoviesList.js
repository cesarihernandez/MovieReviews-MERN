import React, { useState, useEffect, useCallback } from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { BsStar, BsStarFill } from "react-icons/bs";
import "./MoviesList.css";

const MoviesList =  ({
    user,
    favorites,
    addFavorite,
    deleteFavorite
}) => {
    // useState to set state values
    // State allows use to update UI
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState([]);
    const [searchRating, setSearchRating] = useState([]);
    const [ratings, setRatings] = useState(["All Ratings"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

console.log()

//useCallback to define functions which should
//only be created once and will be dependencies for 
// useEffect
const retrieveRatings = useCallback(() => {
    MovieDataService.getRatings()
    .then(response => {
        setRatings(["All Ratings"].concat(response.data))
    })
    .catch(e => {
        console.log(e);
    });
}, []);

const retrieveMovies = useCallback(() => {
    setCurrentSearchMode(""); //Reset our seach box and then go and grab our movies
    MovieDataService.getAll(currentPage) //talks to our backend utilizing MovieDataService file
    .then(response => {
        setMovies(response.data.movies);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page); //the response is everything the client
        //asked for which in the above case is a movie, currentpage, and the number of movies per page
    })
    .catch(e => {
        console.log(e);
    });
}, [currentPage]);

const find = useCallback((query, by) => {
    MovieDataService.find(query, by, currentPage)
    .then(response => {
        setMovies(response.data.movies);
    })
    .catch(e => {
        console.log(e);
    });
}, [currentPage]);

const findByTitle = useCallback(() => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
}, [find, searchTitle]);

const findByRating = useCallback(() => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
        retrieveMovies();
    } else {
        find(searchRating, "rated");
    }
}, [find, searchRating, retrieveMovies]);

const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === "findByTitle") {
        findByTitle();
    } else if (currentSearchMode === "findbyRating") {
        findByRating();
    } else {
        retrieveMovies();
    }
}, [currentSearchMode, findByTitle, findByRating, retrieveMovies]);

//Use effect to carry out side effect functionality
    useEffect(() => {
        retrieveRatings();
    }, [retrieveRatings]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    //Retrieve the next page if currentPage value changes
    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);

    // Other functions that are not depended on by useEffect
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    }

    return (
        <div className="App">
            <Container className="main-container">
                <Form>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Control
                            type="text"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={onChangeSearchTitle}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </Button>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="select"
                                    onChange={onChangeSearchRating}
                                >
                                    { ratings.map((rating, i) => {
                                        return (
                                            <option value={rating}
                                            key={i}>
                                                {rating}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                            variant="primary"
                            type="button"
                            onClick={findByRating}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className="movieRow">
                    { movies.map((movie) => {
                        return(
                            <Col key={movie._id}>
                                <Card className="moviesListCard">
                                    { user && (
                                        favorites.includes(movie._id) ?
                                        <BsStarFill className="star starFill" onClick={() => {
                                            deleteFavorite(movie._id);
                                        }}/>
                                        :
                                        <BsStar className="star starEmpty" onClick={() => {
                                            addFavorite(movie._id);
                                        }}/>
                                    )}
                                    <Card.Img
                                    className="smallPoster"
                                    src={movie.poster+"/100x180"}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null; // prevents looping
                                        e.currentTarget.src="/images/NoPosterAvailable-crop.jpg";
                                         }}
                                    />
                                    <Card.Body>
                                        <Card.Title> {movie.Title}</Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>
                                            {movie.plot}
                                        </Card.Text>
                                        <Link to={"/movies/"+movie._id}>
                                            View Reviews
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                <br />
                Showing page: {currentPage + 1 }.
                <Button
                variant="link"
                onClick={() => {setCurrentPage(currentPage + 1)} }
                >
                Get next {entriesPerPage} results
                </Button>
            </Container>
        </div>
    )

}
export default MoviesList;