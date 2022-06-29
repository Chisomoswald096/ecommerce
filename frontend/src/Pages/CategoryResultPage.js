import axios from "axios";
import { useEffect, useState } from "react";

   
export default function CategoryResultPage(props) {
  const [category, setCategory] = useState("")
  const [products, setProducts] = useState([])

  const id = props.match.params.id;
  

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get(`http://localhost:5000/category-products/${id}`);
      setProducts(data);
    }
    getProducts();


  }, [setProducts])
  return <>
    
    <div>
      <a className="btn btn-danger mt-2 ms-3" href="/add-product">Add Product</a>

      <div className="container">
        <div className="row">

          {products && products.map(product => {
            return <div key={product._id} className="col">
              <div className="card" style={{ width: "18rem" }}>
                <a href={`/product/${product._id}`}><img src={product.image} className="card-img-top" alt="..." /></a>
                <div className="card-body">
                  <h5 className="card-title"></h5>
                  <p className="card-text">{product.name}</p>

                  <a href="/" className="btn btn-outline-danger w-100">NGN{product.price}</a>

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
