import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ManageAllProducts.css';
import { MdRemoveCircle } from "react-icons/md";

const ManageAllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    //cancel order
    const handleRemoveProducts = id => {
        const proceed = window.confirm('Are you sure you want to remove this product?');
        if (proceed) {
            const uri = `https://thawing-bastion-87862.herokuapp.com/products/${id}`;
            fetch(uri, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Product Remove successfully')
                        const remainingProducts = products.filter(product => product._id !== id)
                        setProducts(remainingProducts);
                    }
                })
        }
    }

    return (
        <div style={{ marginTop: '-40px' }}>
            <h3 className=" rounded-3 text-dark w-50 mx-auto p-3 ">Total Products:- {products.length}</h3>
            <hr className="w-50 mx-auto" />
            {!products.length ? <Spinner animation="grow" variant="primary" /> : <> <div className="ManageAllProducts-container">
                {
                    products.map(product =>
                        <div className="h-100 border border-info rounded-3 p-3 " >
                            <img className="" width="330px" height="230px" src={product.image} alt="" />
                            <h3>{product.product}</h3>
                            <p>{product.description}</p>
                            <h4>Price:- ${product.price}</h4>
                            <Link to={`/booking/${product.product}`}><button className="btn  btn-success mb-2">Select {product.product} </button></Link> <br />
                            <button className="btn btn-danger mb-2" onClick={() => handleRemoveProducts(product._id)}>Remove Product <MdRemoveCircle /></button>
                        </div>
                    )
                }
            </div></>}
        </div>
    );
};

export default ManageAllProducts;