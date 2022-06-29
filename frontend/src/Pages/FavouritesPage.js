import { useState } from "react"
import axios from "axios"

export default function Favourites() {
    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [age, setAge] = useState("");

    async function submitHandler(e) {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:5000/favourite", { name, state, age })
    }

    return <div> <center>

        <form onSubmit={submitHandler} className="form">
            <h3>Add Favourites</h3>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name" />
            <br />
            <input value={state} onChange={e => setState(e.target.value)} type="text" placeholder="state" />
            <br />
            <input value={age} onChange={e => setAge(e.target.value)} type="number" placeholder="age" />
            <br />
            <button type="submit" className="btn btn-danger">Add</button>
        </form>

    </center>

    </div>

}