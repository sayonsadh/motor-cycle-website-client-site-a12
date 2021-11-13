import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import './MyPreOrders.css';
import { MdCancel } from "react-icons/md";


const MyPreOrders = () => {
    const { user } = useAuth();
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/preOrders')
            .then(res => res.json())
            .then(data => {
                const selectBike = data.filter(e =>
                    e.email === user.email,
                )
                setBikes(selectBike);
            })
    }, [user])

    //cancel order
    const handleCancelPreOrder = id => {
        const proceed = window.confirm('Are you sure you want to cancel this Pre-Order?');
        if (proceed) {
            const uri = `https://thawing-bastion-87862.herokuapp.com/preOrders/${id}`;
            fetch(uri, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Pre-Order Cancel successfully')
                        const remainingPreOrder = bikes.filter(bike => bike._id !== id)
                        setBikes(remainingPreOrder);
                    }
                })
        }
    }

    return (
        <div style={{ marginTop: '-100px' }}>
            <h5 className="fst-italic mt-5 p-3" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>Here Is Your Pre-Order Information</h5>
            <hr className="w-50 mx-auto" />
            <div className="myPreOrders-container m-5">
                {
                    bikes.map(bike =>
                        <div className="border border-info w-100 bg-success bg-opacity-10 rounded-3 " key={bike._id}>
                            <h2>Congratulation</h2>
                            <h5>Name: {bike?.name}</h5>
                            <h5>Email: {bike?.email}</h5>
                            <h5>Phone: {bike?.phone}</h5>
                            <h5>Phone: {bike?.address}</h5>
                            <h5>Product: {bike?.product}</h5>
                            <h5>Your order: {bike?.status}</h5>
                            {bike?.status === "Approved" ?

                                <p className=" bg-light text-success fs-5 mt-4  mb-4 ">Your Pre-Order Approved by an Admin.</p>

                                : <button className="btn btn-danger bg-light text-danger mt-2 ms-3 mb-2 " onClick={() => handleCancelPreOrder(bike._id)}>Cancel Order <MdCancel style={{ marginBottom: '3px' }} />
                                </button>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyPreOrders;