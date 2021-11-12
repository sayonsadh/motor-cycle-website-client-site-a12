import React from 'react';
import { Link } from 'react-router-dom';

const Explore = ({productsInfo}) => { 
    const {product, price, description, image} = productsInfo;
    return (
        <div>
            <div className="h-100 border border-info rounded-3 p-3 " >
                <img  width="330px" height="230px"  src={image} alt="" />
                <h3>{product}</h3>
                <p>{description}</p>
                <h4>Price:- ${price}</h4>
                <Link to={`/booking/${product}`}><button className="btn  btn-success">Select {product} </button></Link>
            </div>
        </div>
    );
};

export default Explore; 