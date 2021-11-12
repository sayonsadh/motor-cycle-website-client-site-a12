import React from 'react';

const Footer = () => {
    return (
        <div className="row d-flex  text-start  bg-secondary bg-opacity-50 w-100  p-5 text-dark  " style={{marginLeft:'0px'}}>
            <div className=" text-start  col-md-4 col-lg-4">
                <h3>Our Commitment</h3>
                <p>We provide original branded bike.  <br/>
                We import bike from our verified and trusted importer.
                 </p>
            </div>
            <div className=" text-start  col-md-4 col-lg-4">
                <h3>Contact Us</h3>
                <p>Dhandmondi, kolabagan</p>
                <p>Bonani, Dhaka</p>
                <p>Phone:- 01954167494</p>
                <p>email:- sayonmotors@gmail.com</p>
            </div>
            <div className="text-start  col-md-4 col-lg-4">
                <h3>Exclusive opportunity</h3>
                <p>If you need higher cc bike we can provide that.</p>
            </div>
        </div>
    );
};

export default Footer;
// row