import React, { useState } from 'react';
import MovieDataService from "../services/movies";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const AddReview = ({ user }) => {
    const navigate = useNavigate()
    let params = useParams();

    const location = useLocation();
    console.log('location', location)
    let editing = location.state.currentReview ? true : false;
    let initialReviewState = "";
    if (editing) {
        initialReviewState = location.state.currentReview.review
    }

    // initialReviewState will have a diiferent value
    // if we're editing an existing review.

    const [review, setReview] = useState(initialReviewState);

    const onChangeReview = e => {
        const review =e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id // get movie id from url
        }

        if (editing) {
            // TODO: Handle case where an exisiting 
            // review is being updated
            const editData = {
                review_id: location.state.currentReview._id,
                review: review,
                user_id: user.googleId
            }
            MovieDataService.editReview(editData)
            .then(response => {
                navigate("/movies/"+params.id);
            })

        } else {
            MovieDataService.createReview(data)
            .then(response => {
                navigate("/movies/"+params.id)
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>{ editing ? "Edit" : "Create" } Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        review={ review }
                        onChange={ onChangeReview }
                        defaultValue={ editing ? initialReviewState : ""}
                    />
                </Form.Group>
                    <Button variant="primary" onClick={ saveReview } >
                        Submit
                    </Button>
            </Form>
        </Container>
    )
}

export default AddReview;