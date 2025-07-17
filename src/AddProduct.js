import Header from './Header';
import React, { useState, useEffect, useNavigate } from 'react';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');

    async function addProduct() {
        // Validation - check if all fields are filled
        if (!name || !price || !description || !file) {
            alert("Please fill all fields");
            return;
        }

        // Additional file validation
        if (!file || typeof file === 'string') {
            alert("Please select a valid file");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("file", file); // This should be the actual File object

        let result = await fetch("http://localhost:8000/api/add-product", {
            method: "POST",
            body: formData,
        });
        if (result.ok) {
            alert("Product added successfully");
            // Clear form after successful submission
            setName('');
            setPrice('');
            setDescription('');
            setFile('');
            // Clear file input
            document.querySelector('input[type="file"]').value = '';
        } else {
            const errorData = await result.text();
            console.error("Server error response:", errorData);
            alert(`Error: ${result.status} - ${result.statusText}`);
        }

    }

    return (
        <div>
            <Header />
            <h1>AddProduct Page</h1>
            <div className="col-sm-6 offset-sm-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter product name"
                />
                <br />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    placeholder="Enter product price"
                />
                <br />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    placeholder="Enter product description"
                    rows="3"
                />
                <br />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control"
                    accept="image/*"
                />
                <br />
                <button onClick={addProduct} className="btn btn-primary mt-3">Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct;