import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Loading from "../components/Loading"

export default function AddCategoryPage(props) {

const [name, setName] = useState("");
const [message, setMessage] = useState("")
const[success, setSuccess] = useState("");



const history = useHistory();
async function submitHandler(e){
    
    e.preventDefault();
    props.history.push("/admin-category")
    const {data} = await axios.post("http://localhost:5000/category", {name});
    if(data.message){
        setMessage(data.message);
    }
    if(data.success){
        props.history.push("/admin-category");
        window.location.reload();
    }
   
}

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo || !userInfo.isAdmin && props.history.push("/");
        if (success) {
            history.push("/admin-products");
        }
    }, [history, success]);

    return <> <div>  {message && <div className="alert alert-danger p-2">{message}</div> }
     <form action="" onSubmit={submitHandler} className="form">
    <input type="text" value={name} onChange={e=> setName(e.target.value)} placeholder ="Category name"/>
    <br />
    <button type="submit" className="btn btn-danger mt-2">Add Category</button>
</form>
    </div>
    </>
}