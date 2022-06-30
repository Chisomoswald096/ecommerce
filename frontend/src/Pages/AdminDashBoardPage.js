import axios from "axios";
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export default function AdminDashBoardPage(props){
   const[products, setProduct]= useState(0);
   const[category, setCategory]= useState(0);
   const[users, setUsers]= useState(0);
   const[orders, setOrders]= useState(0);
   const[success, setSuccess] = useState("");


async function getSummary(){
const {data} = await axios.get("http://localhost:5000/summary");
  setUsers(data.users)
  setProduct(data.products)
  setCategory(data.category)
  setOrders(data.orders)
}
const history = useHistory();
useEffect(() => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   !userInfo || !userInfo.isAdmin && props.history.push("/");
   if (success) {
       history.push("/admin-products");
   }
}, [history, success]);

useEffect(()=>{
   getSummary();
})


   return <div className="container dashboard">

     

      <div className="row">

         <div className="col">
            <div className="card" style={{width: "30rem",  height:"15rem"}}>
          <div className="card-body" style={{background:"red" }}>
                  <h2 className="card-title"><i className="fa fa-shopping-cart text-white "></i></h2>
                  <h1 className="card-text text-center text-center text-white">Products</h1>
                  <h1 className="card-text  text-center text-center text-white">{products}</h1>

               </div>
            </div>
         </div>

         <div className="col">
            <div className="card" style={{width: "30rem",   height:"15rem"}}>
               <div className="card-body" style={{background:"blue"}}>
                  <h2 className="card-title"><i className="fa fa-list text-white"></i></h2>
                  <h1 className="card-text  text-center text-center text-white">Categories</h1>
                  <h1 className="card-text  text-center text-center text-white">{category}</h1>

               </div>
            </div>
         </div>

         <div className="col">
            <div className="card" style={{width: "30rem", height:"15rem"}}>
               <div className="card-body"style={{background:"green"}}>
                  <h2 className="card-title"><i className="fa fa-users text-white"></i></h2>
                  <h1 className="card-text text-center text-center text-white">Users</h1>
                  <h1 className="card-text  text-center text-center text-white">{users}</h1>

               </div>
            </div>
         </div>

         <div className="col">
            <div className="card" style={{width: "30rem", height:"15rem"}}>
               <div className="card-body"style={{background:"pink"}}>
                  <h2 className="card-title"><i className="fa fa-money-bill "></i></h2>
                  <h1 className="card-text  text-center text-center text-white">Orders</h1>
                  <h1 className="card-text  text-center text-center text-white ">{orders}</h1>

               </div>
            </div>
         </div>

      </div>
   </div>

}