import React, { useEffect, useState } from 'react';
import './ManageAllPreOrder.css';
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const ManageAllPreOrder = () => {
    const [bikes, setBikes] = useState([]);
    const [approve, setApprove] = useState(false);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/preOrders')
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [approve]);

    //cancel order
    const handleCancelOrder = id => {
        const proceed = window.confirm('Are you sure you want to cancel this Pre-Order?');
        if (proceed) {
            const uri = `https://thawing-bastion-87862.herokuapp.com/preOrders/${id}`;
            fetch(uri, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Your Pre-Order Cancel successfully')
                        const remainingBikes = bikes.filter(bike => bike._id !== id)
                        setBikes(remainingBikes);
                    }
                })
        }
    }
    const update = {
        status: "Approved"
    };
    //update...
    const handleUpdateBtn = id => {
        const uri = `https://thawing-bastion-87862.herokuapp.com/preOrders/${id}`;
        fetch(uri, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Approved successfully')
                    setApprove(!approve)
                }
            })
    }

    return (
        <div style={{ marginTop: '-100px' }}>
            <h5 className="fst-italic mt-5 p-3">Cancel or update any Pre-Order.</h5>
            <hr className="w-25 mb-4 mx-auto" />
            <div className="ManageAllPreOrder-container m-5">
                {
                    bikes.map(bike =>
                        <div className="border border-info w-100  bg-info bg-opacity-25 rounded-3" key={bike._id}>
                            <h5>Name:- {bike.name}</h5>
                            <h5>Email:- {bike.email}</h5>
                            <h6>Phone:- {bike.phone}</h6>
                            <h6>Address:- {bike.address}</h6>
                            <h5>status:- {bike.status}</h5>
                            <button className="btn btn-danger mb-2" onClick={() => handleCancelOrder(bike._id)}>Cancel Pre-Order <MdCancel style={{ marginBottom: '3px' }} /></button><br />
                            <button className="btn btn-danger mb-2" onClick={() => handleUpdateBtn(bike._id)}>Approved  Pre-Order <GiConfirmed /></button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManageAllPreOrder;