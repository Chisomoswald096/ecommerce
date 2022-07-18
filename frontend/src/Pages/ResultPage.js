import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function ResultPage(props) {
  const [products, setProducts] = useState("")
const[success, setSuccess] = useState("");


  const name = props.match.params.name;
  
  

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get(`http://localhost:5000/products?name=${name}`);
      setProducts(data);
    }
    getProducts();


  }, [setProducts])
const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    !userInfo || !userInfo.isAdmin && props.history.push("/");
        if (success) {
            history.push("/admin-products");
        }
     }, [history, success]);



  return <>
    
    <div>

      <div className="container">
        <div className="row">

          {products && products.map(product => {
            return <div key={product._id} className="col">
              <div className="card" style={{ width: "18rem" }}>
                <a href={`/product/${product._id}`}><img src={product.image} className="card-img-top" alt="..." /></a>
                <div className="card-body">
                  <h5 className="card-title"></h5>
                  <p className="card-text">{product.name}</p>

                  <a href="#" className="btn btn-outline-danger w-100">NGN{product.price}</a>

                  <div className="d-flex justify-content-between mt-2">
                    <a style={{ display: "block", margin: "auto" }} href={`/cart/${product._id}`}><button className="btn btn-danger ">Add To Cart</button></a>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>

    </div>
    
  </>
}