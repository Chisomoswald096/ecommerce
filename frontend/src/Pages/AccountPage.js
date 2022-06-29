import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountPage(props) {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const userId = userInfo._id;

    const [email, setEmail] = useState(userInfo.email);
    const [userName, setUserName] = useState(userInfo.userName);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");



    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Password do not match");
            return;
        }
        const { data } = await axios.put(`http://localhost:5000/users/${userInfo._id}`, { userName, password });

        localStorage.setItem("userInfo", JSON.stringify(data));
        window.location.reload();
    }



    return <div>
        <form onSubmit={submitHandler} action="" className="form">
            <center>Update account</center>
            {error && <div className="alert alert-danger" >{error}</div>}
            <input type="email" value={email} className="form-control" placeholder="Enter Email" />
            <br />
            <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="form-control" placeholder="Enter Username" />
            <br />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
            <br />
            <input type="confirmpassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirm Password" />
            <br />
            <button type="submit" className="btn-lg btn-danger" >Register</button>


        </form>
    </div>
}