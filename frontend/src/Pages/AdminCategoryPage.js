import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";



export default function AdminCategoryPage(props) {
   
    const [category, setCategory] = useState([])
    const [success, setSuccess] = useState("")


    async function getCategory() {
        const { data } = await axios.get("http://localhost:5000/category");
        setCategory(data);
    }
const history = useHistory();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo || !userInfo.isAdmin && props.history.push("/");
        if (success) {
            history.push("/admin-products");
        }
    }, [history, success]);


    async function deleteHandler(id) {
        window.location.reload();
        const { data } = await axios.delete(`http://localhost:5000/category/${id}`);
        alert("deleted successfully")
    }

    useEffect(() => {
        getCategory();
    }, [])



    return <div> <> <a className="btn btn-danger" href="/add-category">add category</a></>

        <table className="table mb-2 ">
            {category.length > 0 && category.map(category => {
                return <tr>
                    <td>{category.name}</td>
                    <td className="d-flex-between ps-2 pe-2">
                        <a href={`/edit-category/${category._id}`} className="btn btn-outline-secondary" style={{ background: "red" }}>update</a>
                        <a onClick={() => deleteHandler(category._id)} href={`/category/${category._id}`} className="btn btn-outline-danger" style={{ background: "black" }}>delete</a>

                    </td>
                </tr>
            })}

        </table>







    </div>
}