import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


const EditProductPage = (props) => {
    const productId = props.match.params.id;
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
const [success, setSuccess] = useState("");
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo || !userInfo.isAdmin && props.history.push("/");
            if (success) {
                history.push("/admin-products");
            }
         }, [history, success]);



    async function getProduct(productId) {
        const { data } = await axios.get(`http://localhost:5000/products/${productId}`);
        setName(data.name);
        setImage(data.image);
        setPrice(data.price);
    }
    useEffect(() => {
        getProduct(productId);

    }, [productId])



    const history = useHistory();
    async function submitHandler(e) {
        e.preventDefault();
        history.push("/adminproduct")
        const { data } = await axios.put(`http://localhost:5000/products/${productId}`, { name, image, price })
        history.push("/adminproduct");

    }

    return <> <div>
        <form onSubmit={submitHandler} className="form">
            <h3>Add Product</h3>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="product Name" />
            <br />
            <input value={image} onChange={e => setImage(e.target.value)} type="text" placeholder="product Image" />
            <br />

            <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="product Price" />
            <br />
            <button type="submit" className="btn btn-danger">update</button>
        </form>

    </div>

    </>
}

export default EditProductPage
