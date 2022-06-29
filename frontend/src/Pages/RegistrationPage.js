import { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import LoginRegister from "../components/LoginRegister";


//  to create something use APP.POST/axios.post
//  to read something in frontend use APP.GET/axios.get
// to edit something use APP.PUT/axios.put
//  to delete something use APP.DELETE/axios.delete



export default function RegisterPage(props) {
    const [email, setEmail] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const history = useHistory();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo && props.history.push("/");
    });


    async function submitHandler(e) {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:5000/users/register", { email, userName, password });
        if (data.success) {
            history.push("/login");
            return;
        }
        setError(data.error);
        // setSuccess(data.success);
    }
    return <>
    <br />
    <br />
    <br />
        <LoginRegister page="register" />
        <form action="" className="form" onSubmit={submitHandler}>
            <center><h2>Register</h2></center>
            <br />
            {error && <div className="alert alert-danger">{error}</div>}
            {/* {success && <div className= "alert alert-danger">{success}</div>} */}

            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
            <br />
            <input required type="text" value={userName} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
            <br />
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
            <br />
            <button type="submit" className="btn-lg btn-danger" >Register</button>
        </form>
    </>
}