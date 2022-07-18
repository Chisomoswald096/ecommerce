import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginRegister from "../components/LoginRegister";


export default function LoginPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo && props.history.push("/");
    });

    async function submitHandler(e) {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:5000/users/login", { email, password });
        data.error && setError(data.error);
        if (data.user) {
            localStorage.setItem("userInfo", JSON.stringify(data.user));
            history.push("/");
            window.location.reload()
        }
    }
    return <>
    <br />
    <br />
    <br />
        <LoginRegister page="login"/>
    
    <form className='form' onSubmit={submitHandler}>
        <h3>Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder="Enter Email" />
        <br />
        <input value={password} onChange={e => setPassword(e.target.value)} required type="password" placeholder="Enter Password" />
        <br />
        <button class="btn btn-danger" type="submit">Login</button>
        <br />
        <a href="#" className="btn btn-secondary">FORGOT PASSWORD?</a>
    </form>
    </>
}
