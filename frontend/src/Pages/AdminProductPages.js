import { useState, useEffect } from 'react';
import axios from 'axios'; 

export default function AdminProduct(props) {

    const [products, setProducts] = useState("");

    async function deleteHandler(id) {
        window.location.reload();
        const{data} = await axios.delete(`http://localhost:5000/products/${id}`);
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo && props.history.push("/");
    });


    useEffect(() => {
        async function getProducts() {
            const { data } = await axios.get("http://localhost:5000/products");
            setProducts(data);
            console.log(products)

           
        }
        
     getProducts();

    }, [setProducts])

    return <div>
        <a className="btn btn-danger mt-2 ms-3" href="/add-product">Add Product</a>

        <div className="container">
            <div className="row">

                {products && products.map(product => {
                    return <div key={product._id} className="col">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src={product.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                <p className="card-text">{product.name}</p>

                                <a href="/" className="btn btn-outline-primary w-100">NGN{product.price}</a>

                                <div className="d-flex justify-content-between mt-2">
                                 <a href={`/edit-product/${product._id}`}> <button className="btn btn-primary">Edit</button></a>  
                                    <button onClick={()=> deleteHandler (product._id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}


            </div>
        </div>


    </div>
}