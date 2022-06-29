import { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function Productpage(props) {
    const productId = props.match.params.id;
    const [product, setProduct] = useState("");

 
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo || !userInfo.isAdmin && props.history.push("/");
    });
 

    async function getProduct(productId) {
        const { data } = await axios.get(`http://localhost:5000/products/${productId}`);
        setProduct(data);
        console.log(data)
    }



     useEffect(() => {
         getProduct(productId);
     }, [productId])

     return <div className="productpage">
        {product && <>
            <img src={product.image} alt="" />
            <div className="product details">
                <h1>{product.name}</h1>
                <h3>NGN {product.price}</h3>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam repellendus accusamus quisquam vel porro excepturi quas, corrupti quidem. Reprehenderit voluptates, corporis accusantium sequi quia atque ipsum quis placeat veritatis consequuntur.</p>
            </div>
        </>
        }
    </div>

}