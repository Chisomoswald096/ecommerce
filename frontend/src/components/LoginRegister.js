
export default function LoginRegister(props) {
    return <div className="login-register">
       <a className={props.page === "login" ? "block" : "outline"} href="/login"><div>Login</div></a>
       <a className={props.page === "register" ? "block" : "outline"} href="/register"><div>Register</div></a> 
    </div>
}