import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Table } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function ProductList() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
        
    async function fetchData() {
            let result = await fetch("http://localhost:8000/api/get-products");
            result = await result.json();
            setData(result);
        }

    useEffect(() => {
        fetchData();
    }, [])

    console.warn("Data fetched:", data);

    async function deleteProduct(index) {
        let productID = data[index].id;
        let result = await fetch(`http://localhost:8000/api/delete/${productID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (result.ok) {
            alert("Product deleted successfully");
            fetchData(); // Refresh the product list after deletion
        }
    }

    function UpdateProduct(index) {
        let productID = data[index].id;
        // Navigate to the update product page with the product ID
        navigate(`/update-product/${productID}`);
    }

    return (
        <div>
            <Header />
            <h1>Product List</h1>
            <div className='col-sm-8 offset-sm-2'>
                <Table striped bordered hover style={{textAlign: 'center'}}>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>Product Name</th>
                            <th style={{textAlign: 'center'}}>Price</th>
                            <th style={{textAlign: 'center'}}>Description</th>
                            <th style={{textAlign: 'center'}}>Image</th>
                            <th style={{textAlign: 'center'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={{verticalAlign: 'middle'}}>{item.name}</td>  
                                <td style={{verticalAlign: 'middle'}}>${item.price}</td>
                                <td style={{verticalAlign: 'middle'}}>{item.description}</td>
                                <td style={{verticalAlign: 'middle'}}>
                                    <img 
                                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '5px' }} 
                                        src={'http://localhost:8000/' + item.file_path}
                                        alt={item.name}
                                    />
                                </td>
                                <td style={{verticalAlign: 'middle'}}>
                                    <button className="btn btn-primary me-2 mb-1" onClick={()=>UpdateProduct(index)}>Update</button>
                                    <button className="btn btn-danger mb-1" onClick={()=>deleteProduct(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ProductList;