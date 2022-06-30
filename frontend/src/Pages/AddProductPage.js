import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";


export default function AddProduct(props) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const[success, setSuccess] = useState("");

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")

    const history = useHistory();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo || !userInfo.isAdmin && props.history.push("/");
            if (success) {
                history.push("/admin-products");
            }
        }, [history, success]);

    


    async function submitHandler(e) {
        e.preventDefault();
        props.history.push("/adminproduct")
        setLoading(true);
        const { data } = await axios.post("http://localhost:5000/products", { name, image, price, category })
        setLoading(false);
        history.push("/adminproduct");
    }

async function uploadHandler(e) {
    setUploading(true);
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files);
    data.append("cloud_name", "do47vawm4" );
    data.append("upload_preset", "pedromontage");
    fetch("https://api.cloudinary.com/v1_1/do47vawm4/image/upload", {method : "post", body:data})
    .then(res => res.json())
    .then(data => {
      setImage(data.url);
      setUploading(false)
    })
    .catch(err => console.log(err))
};


    async function getCategory(params) {
        const { data } = await axios.get("http://localhost:5000/category");
        setCategories(data);

    }

    useEffect(() => {
        getCategory();
    }, [])


    return < > <div>
        {loading ? <Loading /> : <form onSubmit={submitHandler} className="form">
            <h3>Add Product</h3>
            {uploading && <div>..Uploading...</div> }
            <input type="file" onChange={uploadHandler} className="form-control"   />
            <br />
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="product Name" />
            <br />
            <input value={image} onChange={e => setImage(e.target.value)} type="text" disabled placeholder="product Image" />
            <br />
            <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="product Price" />
            <br />
            <select value={category} onChange={e => setCategory(e.target.value)} name="" className="form-control">
                <option value="">...Select Category...</option>
                {categories.length > 0 && categories.map(category=> {
                    return <option key={category._id} value={category._id}>{category.name}</option>
                })

                }
            </select>
            <br />
           { uploading && <button onClick={submitHandler} type="button" disabled className="btn btn-danger">update</button>}
           { !uploading && <button onClick={submitHandler} type="button" className="btn btn-danger">update</button>}

        </form>}

    </div>

    </>
}