import { useState, useEffect } from 'react';
import axios from 'axios';
export default function ResultPage(props) {
  const [products, setProducts] = useState("")

  const name = props.match.params.name;
  
  

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get(`http://localhost:5000/products?name=${name}`);
      setProducts(data);
    }
    getProducts();


  }, [setProducts])
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