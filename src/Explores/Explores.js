import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Explore from '../Explore/Explore';
import './Explores.css';

const Explores = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div>
            <h3 className=" rounded-3 text-dark w-50 mx-auto p-3 ">Total Products : {products.length}</h3>
            <hr className="w-50 mx-auto" />
            {!products.length ? <Spinner animation="grow" variant="primary" /> : <> <div className="products-container">
                {
                    products.map(product => <Explore
                        key={product._id}
                        productsInfo={product}
                    ></Explore>)
                }
            </div>
            </>}
        </div>
    );
};

export default Explores;