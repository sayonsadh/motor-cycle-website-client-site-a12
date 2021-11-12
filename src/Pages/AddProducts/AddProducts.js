import React, { useRef } from 'react';
import { MdAddShoppingCart } from "react-icons/md";

const AddProducts = () => {
    const productRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();

    const handleAddProducts = e => {
        e.preventDefault();
        const product = productRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        const image = imageRef.current.value;

        if (product === '' || price === '' || description === '' || image === '') {
            alert('You may mistake an information. Please,  give your information. without information you can not add a product. ')
            return;
        }

        const newProduct = { product, price, description, image };

        fetch('https://thawing-bastion-87862.herokuapp.com/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert('Successfully added a Product.')
                    e.target.reset();
                }
            })

        e.preventDefault();
    }
    return (
        <div className="">
            <h5 className='mt-2 p-3 fst-italic'>Please add a new product. <MdAddShoppingCart /></h5>
            <hr className="w-25 mx-auto" />
            <div className=" addproduct-container">
                <div className="me-5 ms-5 ">
                    <img className="img-fluid w-25" src="https://img.pikbest.com/58pic/35/44/12/95c58PICegm78BIca1b43_PIC2018.gif!w340" alt="" />
                </div>
                <div className="ms-5 mb-5 me-5">
                    <h4 className="text-success">Give product Info</h4>
                    <form onSubmit={handleAddProducts} >
                        <input type="text" placeholder="product name" ref={productRef} className="mb-2" /><br />
                        <input type="text" placeholder="price" ref={priceRef} className="mb-2" /><br />
                        <textarea name="" id="" cols="23" rows="3" placeholder="description" className="mb-2" ref={descriptionRef}></textarea><br />
                        <input type="text" placeholder="photo url" ref={imageRef} className="mb-2" /><br />
                        <input className="btn btn-success" type="submit" value="Add product" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;