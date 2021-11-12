import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { FaHome } from "react-icons/fa";
import { MdLogout, MdLogin } from "react-icons/md";
import { GoSignIn } from "react-icons/go";

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <>
            <Navbar
            bg="primary"
            variant="dark"
            expand="lg"
            
            className="bg-dark   text-white bg-opacity-50 sticky-top">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="text-end">
                        <Link className="text-decoration-none p-2 text-white" to="/home"> <FaHome className="mb-1" /> Home</Link>
                        <Link className="text-decoration-none p-2 text-white" to="/explores">Explore</Link>
                        <Link className="text-decoration-none p-2 text-white" to="/*">Big Discount</Link>
                        {user?.email && <Link className="text-decoration-none p-2 text-white" to="/dashboard" >Dashboard</Link>}
                        {user?.email && <p className="mt-2 ms-2">signed in as: {user?.displayName}</p>}
                        {user?.email ?
                            <Button onClick={logout} className="btn-danger  bg-danger bg-opacity-50 ms-2 mb-2">Logout <MdLogout className="mb-1" /></Button>
                            :
                            <div className="mt-2">
                                <Link className="text-decoration-none p-2  text-white" to="/login"><MdLogin className="mb-1" /> Login</Link>
                                <Link className="text-decoration-none p-1 text-white" to="/signup"> Sign up <GoSignIn /></Link>
                            </div>
                        }
                        
                    </Nav>
                    
                    </Navbar.Collapse>
                    
                </Container>
                <p className="fs-6  mt-2" style={{ marginTop: '-35px',fontFamily: 'Permanent Marker,cursive', marginLeft:"10px", marginRight:"20px" }}>SAYON MOTORS  </p>
            </Navbar>
        </>
    );
};

export default Header;
