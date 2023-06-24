import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Movie = props => {
    let params = useParams();

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
                        src={movie.poster+"/100px250"}
                        fluid 
                        onError={(e) => {
                            e.currentTarget.onerror = null; // prevents looping
                            e.currentTarget.src="/images/NoPosterAvailable-crop.jpg";
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
                        </Card.Body>
                    </Card>
                    <h2>Reviews</h2>
                    <br></br>
                   
                    { movie.reviews.map((review, index) => {
                        return (
                            <div className="d-flex reviewContainer">
                                <div className="flex-shrink-0 reviewsText">
                                    <h5>{review.name + " reviewed on"}</h5>
                                    <p className="review">{review.review}</p>
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