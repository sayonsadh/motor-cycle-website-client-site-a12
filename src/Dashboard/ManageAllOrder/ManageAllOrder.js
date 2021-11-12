import React, { useEffect, useState } from 'react';
import './ManageAllOrder.css';
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const ManageAllOrder = () => {
    const [bikes, setBikes] = useState([]);
    const [approve, setApprove] = useState(false);

    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/selectedBikes')
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [approve]);

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
    const update = {
        status: "Shipped..."
    };
    //update...
    const handleUpdateBtn = id => {
        const uri = `https://thawing-bastion-87862.herokuapp.com/selectedBikes/${id}`;
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
                    alert('Shipping successfully')
                    setApprove(!approve)
                }
            })
    }

    return (
        <div style={{ marginTop: '-40px' }}>

            <div>
                <h5 className="  font-monospace m-3 mb-2 ">Cancel or update any order.</h5>
                <hr className="w-25 mb-4 mx-auto" />
            </div>
            <div className="manageAllOrder-container mx-auto ">
                {
                    bikes.map(bike =>
                        <div className="border border-info    bg-info bg-opacity-10 rounded-3" key={bike._id}>
                            <h5>Name:- {bike.name}</h5>
                            <h5>Email:- {bike.email}</h5>
                            <h6>Phone:- {bike.phone}</h6>
                            <h6>Address:- {bike.address}</h6>
                            <h5>status:- {bike.status}</h5>
                            <button className="btn btn-danger mb-2" onClick={() => handleCancelOrder(bike._id)}>Cancel Order <MdCancel style={{ marginBottom: '3px' }} /></button><br />
                            <button className="btn btn-danger mb-2" onClick={() => handleUpdateBtn(bike._id)}>Approved  Order <GiConfirmed /></button>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default ManageAllOrder;