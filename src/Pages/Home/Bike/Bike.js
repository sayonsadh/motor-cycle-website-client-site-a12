import React from 'react';
import { Link } from 'react-router-dom';
import { BsBookmarkPlusFill } from "react-icons/bs";
const Bike = ({bikesInfo}) => {
    const {product, price, description, image} = bikesInfo;
    return (
        <div>
            <div className="h-100  p-3 " >
                <img className="" width="330px" height="230px" src={image} alt="" />
                <h3>{product}</h3>
                <p className="text-center">{description}</p>
                <h4>Price:- ${price}</h4>
                <Link to={`/booking/${product}`}><button className="btn  btn-success bg-success text-dark bg-opacity-25"><BsBookmarkPlusFill/> Select {product} </button></Link>
            </div>
        </div>
    );
};

export default Bike;