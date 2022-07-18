import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export default function AdminOrderPage(props) {
    const [orders, setOrders] = useState([]);
    const [success, setSuccess] = useState("")

async function getOrders(){
    const {data} = await axios.get("http://localhost:5000/api/orders")
  
  setOrders(data);
  console.log(data)
}


const history = useHistory();
useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
     !userInfo.isAdmin && props.history.push("/");
    if (success) {
        history.push("/admin-order");
    }
}, [history, success]);


useEffect(()=>{
    getOrders()
}, [])



    return <>
    <table className="table admin-order">

    <tr>
                <th>Address</th> 
                <th>City</th> 
                <th>State</th> 
                <th>Number</th>
                <th>Qty</th>
                
            </tr>

        {orders.length > 0 && orders.map(order =>{
           return <tr>
             
            <th>address{order.address}</th>
            <th> city {order.city}</th>
            <th>state{order.state}</th>
            <th>Quantity{order.number}</th>
        <th><a href={`/order-details/${order._id}`} className="btn btn-secondary"><div className="fa fa-eye"></div></a></th>
        

        </tr>
         

        })}
        

       
    </table>
    </>
}