import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './MyOrders.css';
import { MdCancel } from "react-icons/md";


const MyOrders = () => {
    const { user } = useAuth();
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/selectedBikes')
            .then(res => res.json())
            .then(data => {
                const selectBike = data.filter(e =>
                    e.email === user.email,
                )
                setBikes(selectBike);
            })
    }, [user])

    //cancel order
    const handleCancelOrder = id => {
        const proceed = window.confirm('Are you sure you want to cancel this order?');
        if (proceed) {
            const uri = `https://thawing-bastion-87862.herokuapp.com/selectedBikes/${id}`;
            fetch(uri, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Order Cancel successfully')
                        const remainingBikes = bikes.filter(bike => bike._id !== id)
                        setBikes(remainingBikes);
                    }
                })
        }
    }

    return (
        <div style={{ marginTop: '-100px' }}>
            <h5 className="fst-italic mt-5 p-3" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>Here Is Your Order Information</h5>
            <hr className="w-50 mx-auto" />
            <div className="myOrders-container m-5 text-start">
                {
                    bikes.map(bike =>
                        <div style={{ marginLeft: '50px' }} className="w-100  " key={bike._id}>
                            <h2 className="text-success">Congratulation</h2>
                            <h5>Name: {bike?.name}</h5>
                            <h5>Email: {bike?.email}</h5>
                            <h5>Phone: {bike?.phone}</h5>
                            <h5>Address: {bike?.address}</h5>
                            <h5>Product: {bike?.product}</h5>
                            <h5>Your order: {bike?.status}</h5>
                          {bike?.status === "Shipped..."  ?

                           <p className=" bg-light text-success fs-5 mt-4  mb-4 ">Your Order Approved by an Admin.</p>

                        :  <button className="btn btn-danger bg-light text-danger mt-2 ms-3 mb-2 " onClick={() => handleCancelOrder(bike._id)}>Cancel Order <MdCancel style={{ marginBottom: '3px' }} /> 
                        </button>  
                        }
                            <hr />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyOrders;

