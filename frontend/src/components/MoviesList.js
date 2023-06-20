import React, { useState, useEffect, useCallback } from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import "./MovieList.css";

const MoviesList = props => {
    // useState to set state values
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState([]);
    const [searchRating, setSearchRating] = useState([]);
    const [ratings, setRatings] = useState(["All Ratings"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");
}
//useCallback to define functions which should
//only be created once and will be dependencies for 
// useEffect
const retrieveRatings = useCallback(() => {
    MovieDataService.getRatings()
    .then( response => {
        setRatings(["All Ratings"].concat(response.data))
    })
    .catch(e => {
        console.log(e);
    });
}, []);

const retrieveMovies = useCallback(() => {
    setCurrentSearchMode.getAll(currentPage)
    .then(response => {
        setMovies(response.data.page);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
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
        find(searchRating, retrieveMovies);
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


export default MoviesList;