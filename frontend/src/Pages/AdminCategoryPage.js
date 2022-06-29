import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";



export default function AdminCategoryPage() {
    const [category, setCategory] = useState([])

    async function getCategory() {
        const { data } = await axios.get("http://localhost:5000/category");
        setCategory(data);
    }
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