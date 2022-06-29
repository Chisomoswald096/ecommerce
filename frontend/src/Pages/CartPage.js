import axios from "axios"
import { useEffect } from "react"

const Cartpage = (props) => {
    const productId = props.match.params.id;
    let qty = 1;

    let cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

    const addToCart = async (productId, qty) => {
        const { data } = await axios.get(`http://localhost:5000/products/${productId}`)
        let item = {
            _id: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            qty
        }
        let existingItem = cartItems.find(x => x._id === item._id)
        if (existingItem) {
            cartItems = cartItems.map(x => x._id === existingItem._id ? item : x)
        } else {
            cartItems = [...cartItems, item];
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        props.history.push("/cart")
        window.location.reload();
    }

    const deleteItemHandler = id => {
        cartItems = cartItems.filter(x => x._id !== id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.location.reload();
    }

    function del() {
        localStorage.removeItem("cartItems");
        window.location.reload();
    }

    useEffect(() => {
        if (productId) {
            addToCart(productId, qty)
        }

    }, [productId])

    return <div className="cartpage" >

        {cartItems.length === 0 ? <div className="alert alert-primary cart-item" >No Item in cart</div>
            :
            <table className="table cart-item">
                <tr>
                    <th>SN</th>
                    <th>image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>

                {cartItems.map((Item, i)=> {
                    return <tr key={Item._id}>
                        <td>{i + 1 }</td>
                        <td> <img src={Item.image} alt="" /> </td>
                        <td>{Item.name}</td>
                        <td>{(Item.price).toLocaleString()}</td>

                        <select value={Item.qty} onChange={(e) => addToCart(Item._id, e.target.value)}>
                            {[...Array(100).keys()].map(x => {
                                return <option key={x} value={x + 1}>{x + 1}</option>
                            })};
                        </select>

                        <i onClick={() => deleteItemHandler(Item._id)} className="fa fa-trash-alt" ></i>
                    </tr>

                })}

            </table>
        }

        <div>
            <button className="btn btn-danger mt-2" onClick={del} >Delete</button>
        </div>

        <div className="cart-total mb-2">
            <a href="/checkout" className="montage mb-3">checkout</a>
            <h4>The Total Of {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items </h4>
            <h2>NGN{(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString()}</h2>

        </div>


    </div>
}
export default Cartpage