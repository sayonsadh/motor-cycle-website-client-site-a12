import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './CreateAdmin.css';

const CreateAdmin = () => {
    const [email, setEmail] = useState('');
    const [admins, setAdmins] = useState([]);

    const handleOnBlur = e => {
        if (e.target.value === '') {
            alert('Enter a valid email.')
            return;
        }
        setEmail(e.target.value);
    }

    const handleAdmin = e => {
        const user = { email };
        fetch('https://thawing-bastion-87862.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    alert('Successfully add an Admin.')
                    e.target.reset();
                    console.log(data);
                }
            })
        e.preventDefault();
    }

    // admins collection
    useEffect(() => {
        fetch('https://thawing-bastion-87862.herokuapp.com/users')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const oruAdmin = data.filter(e =>
                    e?.role === 'admin')

                setAdmins(oruAdmin);
            })
    }, [admins])



    return (
        <div>
            <h2>Make an Admin.</h2>
            <form onSubmit={handleAdmin}>
                <input
                    placeholder="email"
                    type="email"
                    onBlur={handleOnBlur} /> <br /> <br />
                <Button type="submit" className="btn btn-success">Create Admin</Button>
            </form>
            <div>
                <h4>Our Honorable Admin</h4>
                <p>Total Admin: {admins.length}</p>
                <hr className="w-50 mx-auto" />


                <div className="admin-container">
                    {admins.map(admin =>
                        <div className="single-admin border border-dark rounded-3 w-75 ms-5">

                            <h5>Name:- {admin.displayName}</h5>
                            <h5>Email:- {admin.email}</h5>

                        </div>

                    )}
                </div>

            </div>
        </div>
    );
};

export default CreateAdmin;