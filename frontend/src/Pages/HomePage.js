import axios from 'axios';
import { useState, useEffect } from 'react';


export default function HomePage() {
  const [products, setProducts] = useState("")


  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get("http://localhost:5000/products");
      setProducts(data);
    }
    getProducts();

  }, [setProducts])
  return <>
    {/* <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="mantou.jpeg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>Chinese Dishes</h5>
            <p className='ped' >Mantou, cakes, stews etc</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="spagh.jpeg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>Spagh</h5>
            <p className='ped' >Chicken Ganished with leaf</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="pizza.jpeg" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>Pizza Hot</h5>
            <p className='ped' >Dominos Pizza</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <ul>
      <li>African Dishes</li>
      <li>European Dishes</li>
      <li>Asian Dishes</li>
      <li>south American Dishes</li>
      <li>North American Dishes</li>
    </ul> */}

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