import React from 'react';
import './Banner.css';
import useAuth from '../../../hooks/useAuth';

const Banner = () => {
    const  {user} = useAuth();
    console.log(user);
    return (
        <div className=" d-flex row ">
            <div className=" col-md-12  col-sm-12 col-lg-8">
            <img src="https://t4.ftcdn.net/jpg/02/47/96/29/360_F_247962987_14TmyPShXeIkVAe6ZbAbze3VZs6CdLAU.jpg" alt="" width="100%" height="500px"/>
            </div>
            <div className="banner-info col-md-12 col-sm-6 col-lg-4">
            <h3 style={{fontFamily: 'Permanent Marker,cursive'}}>SAYON MOTORS</h3>
            <h6>YOU ARE MOST WELCOME</h6>
            <p style={{fontFamily: 'Genos,sans-serif'}}>If you need any kind of exclusive bike.Please contact with us.We provide world class bike.  And we helping you to do bike liscence also driving liscence.</p>
            </div>
        </div>
    );
};

export default Banner;