import axios from "axios";
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export default function CategoryPage(props) {
    const CategoryId = props.match.params.id;
    const [Category, setCategory] = useState("");
    const [success, setSuccess] = useState("");


    async function getCategory(categoryId) {
        const { data } = await axios.get(`http://localhost:5000/category/${categoryId}`);
        setCategory(data);
        console.log(data)
    }

    const history = useHistory();
useEffect(() => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   !userInfo || !userInfo.isAdmin && props.history.push("/");
   if (success) {
       history.push("/category");
   }
}, [history, success]);
 

     useEffect(() => {
         getCategory(CategoryId);
     }, [CategoryId])



    return <div className="category-page">
        {Category &&  <>
            <img src={Category.image} alt="" />
            <div className="Category details">
                <h1>{Category.name}</h1>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam repellendus accusamus quisquam vel porro excepturi quas, corrupti quidem. Reprehenderit voluptates, corporis accusantium sequi quia atque ipsum quis placeat veritatis consequuntur.</p>
            </div>
        </>
        }
    </div>

}