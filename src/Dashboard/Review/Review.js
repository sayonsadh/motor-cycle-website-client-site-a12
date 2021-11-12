import React, { useRef } from 'react';
import useAuth from '../../hooks/useAuth';


const Review = () => {
    const { user } = useAuth();
    const nameRef = useRef();
    const emailRef = useRef();
    const descriptionRef = useRef();
    const ratingRef = useRef();

    const handleAddProducts = e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const description = descriptionRef.current.value;
        const rating = ratingRef.current.value;

        
        if (description === '' || rating === '') {
            alert('You may mistake an information. Please,  give your information. without information we can not accept your Opinion. ')
            return;
        }

        const review = { name, email, description, rating };

        fetch('https://thawing-bastion-87862.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert('Thank you. Successfully add your opinion.')
                    e.target.reset();
                }
            })

        e.preventDefault();
    }
    return (
        <div className="">
            <h5 className='mt-3 p-3 fst-italic'>Please Give your opinion.</h5>
            <hr className="w-50 mx-auto" />
            <p>Your opinion is very important for us. So kindly give your opinion for our improvement.</p>
            <div className=" addproduct-container">
                <div className="me-5 ms-5 ">
                    <img className="img-fluid w-25 " src="https://cdn.dribbble.com/users/1813781/screenshots/5616851/customers-ratings.gif" alt="" />
                </div>
                <div className="ms-5 mb-5 mt-2 me-5">

                    <form onSubmit={handleAddProducts} >

                        <input type="text" readOnly defaultValue={user?.displayName} ref={nameRef} className="mb-2" /><br />

                        <input type="text" readOnly defaultValue={user?.email} ref={emailRef} className="mb-2" /><br />



                        <textarea name="" id="" cols="23" rows="3" placeholder="Your opinion" className="mb-2" ref={descriptionRef}></textarea><br />
                        <p>Please, give us your rating out of five(5).</p>

                        <input type="text" placeholder="Your rating" type="number" max="5" min="0" ref={ratingRef} className="mb-2" /><br />

                        <input className="btn btn-success" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;