import React, { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { AiOutlineLogin } from "react-icons/ai";
import './Login.css';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, login, isLoading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLogin = e => {
        login(loginData?.email, loginData?.password, location, history);
        e.preventDefault();
    }
    return (
        <div className="d-flex">
            <div className="login-image">
                <img src="https://image.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg" alt="" className="w-75 ms-5" />
            </div>
            <div className="login-form">

                <h5 className="mb-4 me-5">Please Login</h5>
                {isLoading && <Spinner animation="border" />}
                {user?.email && <p className="text-success">user login successful</p>}
                {authError && <p>{authError}</p>}
                
                <Form onSubmit={handleLogin}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="email"
                                placeholder="email"
                                name="email"
                                onBlur={handleOnChange}
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
                                name="password"
                                onBlur={handleOnChange}
                                className="w-75"
                            />
                        </Col>
                    </Form.Group>
                    <Button className="mt-1 me-5 mb-3" type="submit" >Log in <AiOutlineLogin /></Button>
                </Form>
                <Link className="text-decoration-none  me-4 mt-5" to="/signup">New user? Please Sign up.</Link> <br />
            </div>
        </div>
    );
};

export default Login;
