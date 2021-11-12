import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Booking = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const productRef = useRef();

    const handleConfirmProduct = e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const address = addressRef.current.value;
        const product = productRef.current.value;
        const status = "Pending...";

        if (address === '' || phone === '') {
            alert('You may mistake an information. Please,  give your information. without information we can not accept your Booking. ')
            return;
        }

        const confirmProduct = { name, email, phone, address, status, product };

        fetch('https://thawing-bastion-87862.herokuapp.com/selectedBikes', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(confirmProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Congratulation, Your product booked successfully.')
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    const { product } = useParams();
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [product]);
    const order = orders.filter(orderDetails => product === orderDetails.product);

    return (
        <div className="mt-5">
            <h4 className='border border-info rounded-3 w-25 mx-auto bg-success text-white p-3'>You select {product} </h4>
            <div className="d-flex">

                <div className=" border border-info rounded-3 p-3 w-50 m-3" >
                    <img className="img-fluid" src={order[0]?.image} alt="" />
                    <h4>{product}</h4>
                    <p>{order[0]?.description}</p>
                    <h4>Price:- $ {order[0]?.price}</h4>
                </div>

                <div className="w-50 mt-5 p-5">
                    <Form onSubmit={handleConfirmProduct}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control ref={nameRef} readOnly defaultValue={user?.displayName} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control ref={emailRef} type="email" readOnly defaultValue={user?.email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Phone
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control ref={phoneRef} placeholder="Your Phone Number" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control ref={addressRef} placeholder=" Your Address" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Product
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control ref={productRef} readOnly defaultValue={order[0]?.product} type="text" />
                            </Col>
                        </Form.Group>
                        <input className="btn btn-success ms-5" type="submit" value="Confirm Order" />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Booking;