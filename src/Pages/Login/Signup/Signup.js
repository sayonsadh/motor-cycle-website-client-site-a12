import React, { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Signup.css';

const Signup = () => {
    const [loginData, setLoginData] = useState({});
    const { registration, user, isLoading, authError } = useAuth();
    const history = useHistory();


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }; 
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }


    const handleSignUp = e => {
        if (loginData.Password !== loginData.Password2) {
            alert('Did not match your password, please enter same password.')
            return;
        }
        console.log(loginData);
        registration(loginData.email, loginData.Password, loginData.name, history)
        e.preventDefault();
    }

    return (
        <div className="d-flex">

            <div className="signup-form">
                <h5 className="mb-4 me-5">Please Signup</h5>
                {isLoading && <Spinner animation="border" />}

{user?.email && <p className="text-success">user login successful</p>}
{authError && <p>{authError}</p>}
                <Form onSubmit={handleSignUp}>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="name"
                                onBlur={handleOnBlur}
                                className="w-75"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="email"
                                placeholder="email"
                                name="email"
                                onBlur={handleOnBlur}
                                className="w-75"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="Password"
                                onBlur={handleOnBlur}
                                className="w-75"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                            Confirm Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="Password2"
                                onBlur={handleOnBlur}
                                className="w-75"
                            />
                        </Col>
                    </Form.Group>
                    <Button className="mt-1 me-5 mb-3" type="submit" >Sign Up</Button>
                </Form>
                <Link className="text-decoration-none me-4 mt-5" to="/login">Already Signup? Please Login.</Link>
            </div>
            <div className="signup-image">
                <img src="https://cdn.pixabay.com/photo/2019/01/17/19/11/login-3938432__340.jpg" alt="" className="w-100" />
            </div>
        </div>
    );
};

export default Signup;