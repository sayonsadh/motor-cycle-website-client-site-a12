import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './CustomerReview.css';
import Rating from 'react-rating';

const CustomerReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div>
            <h3 className="  rounded-3 text-dark w-50 mx-auto p-3 " style={{ fontFamily: 'Courgette, cursive' }}>Total Reviews : {reviews.length}</h3>
            {!reviews.length ? <Spinner animation="grow" variant="primary" /> : <> <div className="review-container">
                {
                    reviews.map(review =>
                        <div className="bg-primary bg-opacity-10 rounded-3 text-dark w-100  p-3 mt-3 ">
                            <h6> Name: {review.name}</h6>
                            <h6>Email: {review.email}</h6>
                            <p>opinion:-  {review.description}</p>
                            <Rating
                                style={{ color: 'gold' }}
                                initialRating={review.rating}
                                emptySymbol="far fa-star"
                                fullSymbol="fas fa-star"
                                readonly
                            ></Rating>

                        </div>
                    )
                }
            </div></>}
        </div>
    );
};

export default CustomerReview;