import axios from "axios"
import { process_params } from "express/lib/router"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export default function CheckOutPage(props) {

    let cartItems = JSON.parse(localStorage.getItem("cartItems"))


const[address, setAddress] = useState("")
const[city, setCity] = useState("")
const[state, setState] = useState("")
const[number, setNumber] = useState("")
const[success, setSuccess] = useState("")

async function submitHandler(e) {
    e.preventDefault();
    const {data} = await axios.post("http://localhost:5000/api/orders", {address, city, state, number, items: cartItems});
   if(data.success){
       alert("orders sent successfully")
       localStorage.setItem("cartItems", JSON.stringify([]));
       process_params.history.push("/")
       window.location.reload();
   }
}
const history = useHistory();
useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems.length === 0 && props.history.push("/cart");
    if (success) {
        history.push("/checkout");
    }
 }, [history, success]);



    return <>
    <form action="" className="form" onSubmit={submitHandler}>
        <input type="text" value={address} onChange={e=> setAddress(e.target.value)} placeholder="enter address" />
        <br />
        <input type="text" value={city} onChange={e=>setCity(e.target.value)} placeholder="enter city"/>
        <br />
        <input type="text" value={state} onChange={e=> setState(e.target.value)} placeholder="enter state" />
        <br />
        <input type="string" required value={number} onChange={e=>setNumber(e.target.value)} placeholder="enter number"/>
        <br />
        <button type="submit" className="btn btn-danger"> submit</button>
    </form>
    </>
}