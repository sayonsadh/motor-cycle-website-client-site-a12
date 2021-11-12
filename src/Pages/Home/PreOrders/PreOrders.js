import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { FcCancel } from "react-icons/fc";
import { BsEmojiHeartEyes, BsFillGiftFill } from "react-icons/bs";

const PreOrders = () => {

    const { user } = useAuth();
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const productRef = useRef();
    // const dateRef = useRef();
    // const destinationRef = useRef();

    const handleConfirmPreOrder = e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const address = addressRef.current.value;
        const product = productRef.current.value;
        // const date = dateRef.current.value;
        // const destination = destinationRef.current.value;
        const status = "Pending...";

        if (phone === '' || address === '' || product === '') {
            alert('You may mistake an information. Please,  give your information. without information we can not accept your Pre-order.')
            return;
        }

        const confirmProduct = { name, email, phone, address, status, product };

        fetch('https://thawing-bastion-87862.herokuapp.com/preOrders', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(confirmProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Congratulation, Your product Pre-booked successfully.')
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    // const { product } = useParams();

    // const [orders, setOrders] = useState([]); 

    // useEffect(() => {
    //     fetch('https://thawing-bastion-87862.herokuapp.com/products')
    //         .then(res => res.json())
    //         .then(data => setOrders(data))
    // }, [product]);
    // const order = orders.filter(orderDetails => product === orderDetails.product);

    return (
        <div className="mt-5  bg-secondary  rounded-3">
            <div className="">
                <h4 className=' w-100 ms-4   text-white p-3' /* style={{marginLeft:'380px'}} */> Pre-Order for upcoming Bike </h4>
                <marquee style={{ marginLeft: '50px', color: 'green' }} direction="left" height="30" width="350" bgcolor="white">IF YOU PRE-ORDER ANY BIKE, YOU GET A SURPRISE GIFT.             <  BsEmojiHeartEyes style={{ marginBottom: '3px', marginLeft: '4px' }} />

                    <BsFillGiftFill style={{ marginBottom: '5px', marginLeft: '6px' }} />

                    <  BsEmojiHeartEyes style={{ marginBottom: '3px', marginLeft: '6px' }} />  </marquee>
            </div>
            <div className="d-flex">

                {/* <div className=" border border-info rounded-3 p-3 bg-info bg-opacity-25 w-50 m-3" >
                    <img className="img-fluid" src={order[0]?.image} alt="" />
                    <h3>{order[0]?.pack}</h3>
                    <h4>{product}</h4>
                    <p>{order[0]?.description}</p>
                    <h4>Price:- $ {order[0]?.price}</h4>
                </div> */}

                <div className="w-50 mx-auto p-4 text-white">
                    <Form onSubmit={handleConfirmPreOrder}>
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
                                <Form.Control ref={productRef} placeholder="Bike model" type="text" />
                            </Col>
                        </Form.Group>
                        {user?.email ?
                            <input className="btn btn-success bg-light text-dark ms-5 mb-4" type="submit" value="Confirm Pre-Order" />
                            :
                            <div className="mx-auto">
                                <p className=" text-danger w-100 bg-light bg-opacity-50  rounded-3" > <FcCancel /> Without Login you can not confirm your pre-order <FcCancel /></p>
                                <input className="btn btn-success bg-light text-dark  mb-4" disabled="true" type="submit" value="Confirm Pre-Order" />
                            </div>
                        }

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default PreOrders;