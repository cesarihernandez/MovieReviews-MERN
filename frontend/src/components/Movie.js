import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Movie = ({ user }) => {
    let params = useParams();
    const deleteReview = async id => {
        const body = {
            data: {
                review_id: id,
                user_id: user.googleId
            }
            // know what data we can access 
        }
        console.log('data', body)
        MovieDataService.deleteReview(body)
            .then(response => {
                console.log('response from deleting review', response);
                // Review got deleted in our backend database, now we have to delete it off the page
                // Filter out that review in the reviews array
                // Filter needs us to return true or false in a callback function, if it returns true, it will keep that value, if it returns false, it will filter it out
                const updatedReviews = movie.reviews.filter((review) => {
                    return review._id !== id
                })
                console.log('updated reviews', updatedReviews);
                setMovie({
                    ...movie,
                    reviews: updatedReviews
                })

            })
        console.log("delete review")
        console.log(id)

    }




    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    });

    useEffect(() => {
        const getMovie = async id => {
            //console.log('id', id);
            // TODO:
            // Implement getMovie
            //await is how we handle asynchronous things
            const res = await MovieDataService.findById(id)
            console.log(res.data)
            // Take this data coming from backend and update the movie state
            // Filter out that review in the reviews array
            setMovie(res.data)

        }
        getMovie(params.id)
    }, [params.id]);

    return ( // TODO: Add placeholder movie poster here as well
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="poster">
                            <Image
                                className="bigPicture"
                                src={movie.poster + "/100px250"}
                                fluid
                                onError={(e) => {
                                    e.currentTarget.onerror = null; // prevents looping
                                    e.currentTarget.src = "/images/NoPosterAvailable-crop.jpg";
                                }}
                            />
                        </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {user &&
                                    <Link to={"/movies/" + params.id + "/review"}>
                                        Add Review
                                    </Link>}
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br></br>

                        {movie.reviews.map((review, index) => {
                            console.log('review', review)
                            return (
                                <div className="d-flex" key={index}>
                                    <div className="flex-shrink-0 reviewsText">
                                        <h5>{review.name + " reviewed on"} {moment(review.date).format("Do MMMM YYYY")}</h5>
                                        <p className="review">{review.review}</p>
                                        {user && user.googleId === review.user_id &&
                                            <Row>
                                                <Col>
                                                    <Link to={{
                                                        pathname: "/movies/" + params.id + "/review"
                                                    }}
                                                        state={{
                                                            currentReview : review
                                                        }} >
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" onClick={() => {
                                                        deleteReview(review._id)

                                                    }}>
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movie;