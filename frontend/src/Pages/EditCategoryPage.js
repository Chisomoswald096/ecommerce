import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export default function EditCategoryPage(props) {
    const [name, setName] = useState("")
const[success, setSuccess] = useState("");

    const categoryId = props.match.params.id;

    async function getCategory(categoryId) {
        const { data } = await axios.get(`http://localhost:5000/category/${categoryId}`);
        setName(data.name);
    }
    useEffect(() => {
        getCategory(categoryId);

    }, [categoryId])

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo ||!userInfo.isAdmin && props.history.push("/");
            if (success) {
                history.push("/admin-products");
            }
         }, [history, success]);
    

    const history = useHistory();
    async function submitHandler(e) {
        e.preventDefault();
        history.push("/admin-category")
        const { data } = await axios.put(`http://localhost:5000/category/${categoryId}`, { name })
        history.push("/admin-category");
    }


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo || !userInfo.isAdmin && props.history.push("/");
        if (success) {
            history.push("/admin-products");
        }
     }, [history, success]);


    return <>
        <div>
            <h3>Edit Category {name}</h3>

            <form onSubmit={submitHandler} className="form">
                <br />
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="category Name" />
                <br />
                <button type="submit" className="btn btn-danger">update</button>
            </form>

        </div>

    </>
}