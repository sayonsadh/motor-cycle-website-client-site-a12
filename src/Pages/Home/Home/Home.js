import React from 'react';
import Banner from '../Banner/Banner';
import Bikes from '../Bikes/Bikes';
import CustomerReview from '../CustomerReview/CustomerReview';
import PreOrders from '../PreOrders/PreOrders';

const Home = () => {
    return (
        <div style={{overflowX: "hidden"}}>
            <Banner></Banner>
            <Bikes></Bikes>
            <PreOrders></PreOrders>
            <CustomerReview></CustomerReview>
        </div>
    );
};

export default Home;