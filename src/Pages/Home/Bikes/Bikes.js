import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Bike from '../Bike/Bike';
import './Bikes.css';

const Bikes = () => {
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setBikes(data.splice(0, 6)))
    }, [])

    return (
        <div>
            <h3 className=" text-dark mt-4 mx-auto  ">SOME EXCLUSIVE COLLECTION</h3>
            <p >For more collection, please visit our Explore page.</p>
            {!bikes.length ? <Spinner animation="grow" variant="primary" /> : <> <div className="bikes-container">
                {
                    bikes.map(bike => <Bike
                        key={bike._id}
                        bikesInfo={bike}
                    ></Bike>)
                }
            </div></>}
        </div>
    );
};

export default Bikes;