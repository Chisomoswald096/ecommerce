import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


export default function Header(props) {


  let [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);


  async function getCategory() {
    const { data } = await axios.get("http://localhost:5000/category");
    setCategory(data);
    console.log(data)
  }

  useEffect(() => {
    getCategory();
  }, [])




  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  function logoutHandler() {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userInfo");
      props.history.push("/");
      window.location.reload();
    }

  }

  const history = useHistory();
  function clickHandler(e) {
    e.preventDefault();
    history.push(`/search/${name}`);
    window.location.reload();
  }


  return <div className="header">

    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">

        <div className="d-flex align-items-center">
          <i onClick={() => setOpen(!open)} className="fa fa-bars category-toggler me-2 "></i>
          <a className="navbar-brand" style={{color: "rgb(92, 79, 4)"}}  href="/">MONTAGE EATREE<i className="fa fa-hamburger" style={{color: "rgb(92, 79, 4)"}}></i> </a>

        </div>


        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex">
              {/* <a className="nav-link active" aria-current="page" href="/"> <i className="fa fa-home-alt" ></i> Home</a> */}
              <a className="nav-link active" aria-current="page" href="/cart"> <i className="fa fa-shopping-cart alt" ></i> cart</a>
              {/* <a className="nav-link active" aria-current="page" href="/admin-category"><i className="fa fa-list alt" ></i>  Category</a> */}




            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"  href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userInfo && userInfo.userName}
              </a>
              <ul className="dropdown-menu" style={{ backgroundColor: "rgb(57, 3, 3)", border: "none" }} aria-labelledby="navbarDropdown">
                {/* <li><a className="dropdown-item" href="/favourites">favourites</a></li> */}
                {!userInfo && <li><a className="dropdown-item" href="/login">login</a></li>}
                {!userInfo && <li><a className="dropdown-item" href="/register">register</a></li>}
                {userInfo && userInfo.isAdmin && <li><a className="dropdown-item" href="/admin-product">Admin Product</a></li>}
                {userInfo && <li><a className="dropdown-item" href="/admin-category">Admin Category</a></li>}
                {userInfo && <li><a className="dropdown-item" href="/account">Account</a></li>}
                {userInfo && <li><a className="dropdown-item" href="/" onClick={logoutHandler}>Logout</a></li>}
                {userInfo && <li><a className="dropdown-item" href="/admin-dashboard">admindashboard</a></li>}
                {userInfo && <li><a className="dropdown-item" href="/admin-order">Admin order</a></li>}

                

              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={name} onChange={e => setName(e.target.value)} />
            <button className="btn btn-outline-success " type="submit" onClick={clickHandler}>Search</button>
          </form>
        </div>
      </div>
    </nav>

    {open && <div className='category-sidebar' >
      {
        category.length > 0 && category.map(category => {
          return <a key={category._id} href={`/category/${category._id}`}>{category.name}</a>
        })
      }
    </div>}
  </div>
}