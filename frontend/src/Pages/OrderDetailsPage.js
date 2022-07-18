import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export default function OrderDetailsPage(props) {
    const Id = props.match.params.id
    const [order, setOrder] = useState({})
    const [orderItems, setOrderItems] = useState([])
    const [success, setSuccess] = useState("")

    async function getOrder(Id) {
        const { data } = await axios.get(`http://localhost:5000/api/order/${Id}`);
        console.log(data)
        setOrder(data);
        setOrderItems(data.items)

    }


    useEffect(() => {
        getOrder(Id)
    }, [])

    const history = useHistory();
    useEffect(() => {
       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
     !userInfo.isAdmin && props.history.push("/");
       if (success) {
           history.push("/order-details");
       }
    }, [history, success]);
     

    return <>
        <h1>Order Details</h1>
        <br />
        <h5>Delivery Information</h5>
        <h6>address : {order.address}</h6>
        <h6>city : {order.city}</h6>
        <h6>State : {order.state}</h6>
        <h6>number : {order.number}</h6>
        <br />
        <h5>Order Items</h5>

        <table className="table admin-details">
            <tr>
                <th>Image</th> 
                <th>Dishes</th> 
                <th>Amount</th> 
                <th>Quantity</th>
                
            </tr>

            {orderItems.map(orderItem => {
                return <tr>
                    <td><img style={{ height: "5rem" }} src={orderItem.image} alt="" /></td>
                    <td>{orderItem.name}</td>
                    <td>{orderItem.price}</td>
                    <td>{orderItem.qty}</td>
                </tr>
            })}
        </table>


        <br />
        <h1> Total Price = {orderItems.reduce((a, c) => a + c.price * c.qty, 0)}</h1>
    </>
}