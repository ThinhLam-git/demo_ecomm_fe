import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
    const [data, setData] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const {id}= useParams(); // Get the id from URL parameters

    const navigate = useNavigate();
    console.warn("UpdateProduct component loaded with id:", id);

    useEffect(() => {
        async function fetchData() {
            let result = await fetch(`http://localhost:8000/api/get-product/${id}`, {method: "GET"});
            result = await result.json();
            setData(result);
            // Pre-populate form fields with existing data
            setName(result.name || '');
            setPrice(result.price || '');
            setDescription(result.description || '');
        }
        fetchData();
    }, [id]);

    async function updateProduct() {
        // Validation
        if (!name || !price || !description) {
            alert("Please fill all required fields");
            return;
        }

        console.warn("Updating product with data:", { name, price, description, hasNewFile: !!file });

        try {
            // Step 1: Update product data (text fields only)
            const productData = { 
                name, 
                price, 
                description 
            };

            let result = await fetch(`http://localhost:8000/api/update-product/${id}`, {
                method: "PUT",
                body: JSON.stringify(productData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!result.ok) {
                const errorText = await result.text();
                console.error("Product update error:", errorText);
                alert(`Failed to update product: ${result.status} - ${result.statusText}`);
                return;
            }

            console.log("Product data updated successfully");

            // Step 2: Upload new image if selected
            if (file) {
                console.log("Uploading new image:", file.name);
                
                const imageFormData = new FormData();
                imageFormData.append("file", file);

                let imageResult = await fetch(`http://localhost:8000/api/update-product-image/${id}`, {
                    method: "POST",
                    body: imageFormData
                });

                if (!imageResult.ok) {
                    const imageError = await imageResult.text();
                    console.error("Image upload error:", imageError);
                    alert("Product updated but failed to upload new image");
                    return;
                }

                console.log("Image uploaded successfully");
            }

            alert("Product updated successfully");
            navigate('/');

        } catch (error) {
            console.error("Network error:", error);
            alert("Network error occurred. Please try again.");
        }
    }

    // Alternative method: Use FormData when image is selected, JSON when not
    async function updateProductAlternative() {
        // Validation
        if (!name || !price || !description) {
            alert("Please fill all required fields");
            return;
        }

        console.warn("Updating product with data:", { name, price, description, hasNewFile: !!file });

        try {
            let result;

            if (file) {
                // Use FormData when uploading a new image
                console.log("Using FormData (with new image)");
                const formData = new FormData();
                formData.append("name", name);
                formData.append("price", price);
                formData.append("description", description);
                formData.append("file", file);
                formData.append("_method", "PUT"); // Laravel method spoofing

                result = await fetch(`http://localhost:8000/api/update-product/${id}`, {
                    method: "POST", // Use POST with _method=PUT for FormData
                    body: formData
                });
            } else {
                // Use JSON when no new image
                console.log("Using JSON (no new image)");
                const productData = { name, price, description };

                result = await fetch(`http://localhost:8000/api/update-product/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(productData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
            }

            if (result.ok) {
                alert("Product updated successfully");
                navigate('/');
            } else {
                const errorText = await result.text();
                console.error("Error response:", errorText);
                alert(`Failed to update product: ${result.status} - ${result.statusText}`);
            }

        } catch (error) {
            console.error("Network error:", error);
            alert("Network error occurred. Please try again.");
        }
    }

    return (
        <div>
            <Header />
            <h1>Update Product Page</h1>

            <div className="col-sm-6 offset-sm-3">
                <input 
                    type="text" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)} 
                    className="form-control" 
                    placeholder="Product Name"
                />
                <br/>
                <input 
                    type="number" 
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)} 
                    className="form-control" 
                    placeholder="Product Price"
                />
                <br/>
                <textarea 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)} 
                    className="form-control" 
                    placeholder="Product Description"
                    rows="3"
                />
                <br/>
                <input 
                    type="file" 
                    onChange={(e)=>setFile(e.target.files[0])} 
                    className="form-control"
                    accept="image/*"
                />
                <br/>
                {data.file_path && (
                    <div>
                        <p>Current Image:</p>
                        <img 
                            style={{width:100, height: 100, objectFit: 'cover', borderRadius: '5px'}} 
                            src={"http://localhost:8000/"+ data.file_path}
                            alt="Current product"
                        />
                        <br/>
                    </div>
                )}
                <br/>
                <button onClick={updateProductAlternative} className="btn btn-primary">Update Product</button>
            </div>
        </div>
    )
}

export default UpdateProduct;