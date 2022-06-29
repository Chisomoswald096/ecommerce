import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CategoryPage from "../Pages/Category";


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

    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">

        <div className="d-flex align-items-center">
          <i onClick={() => setOpen(!open)} className="fa fa-bars category-toggler me-2 "></i>
          <a class="navbar-brand" href="/">MONTAGE EATREE<i className="fa fa-hamburger"></i> </a>

        </div>


        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item d-flex">
              <a class="nav-link active" aria-current="page" href="/"> <i className="fa fa-home-alt" ></i> Home</a>
              <a class="nav-link active" aria-current="page" href="/cart"> <i className="fa fa-shopping-cart alt" ></i> cart</a>
              <a class="nav-link active" aria-current="page" href="/admin-category"><i className="fa fa-list alt" ></i>  Category</a>




            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userInfo && userInfo.userName}
              </a>
              <ul class="dropdown-menu" style={{ backgroundColor: "red", border: "none" }} aria-labelledby="navbarDropdown">
                {/* <li><a class="dropdown-item" href="/favourites">favourites</a></li> */}
                {!userInfo && <li><a class="dropdown-item" href="/login">login</a></li>}
                {!userInfo && <li><a class="dropdown-item" href="/register">register</a></li>}
                {userInfo && <li><a class="dropdown-item" href="/adminproduct">Admin Product</a></li>}
                {userInfo && <li><a class="dropdown-item" href="/admin-category">Admin Category</a></li>}
                {userInfo && <li><a class="dropdown-item" href="/account">Account</a></li>}
                {userInfo && <li><a class="dropdown-item" href="/" onClick={logoutHandler}>Logout</a></li>}
                {userInfo && <li><a class="dropdown-item" href="/admin-dashboard">admindashboard</a></li>}

              </ul>
            </li>
          </ul>

          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={name} onChange={e => setName(e.target.value)} />
            <button class="btn btn-outline-success " type="submit" onClick={clickHandler}>Search</button>
          </form>
        </div>
      </div>
    </nav>

    {open && <div className='category-sidebar'>
      {
        category.length > 0 && category.map(category => {
          return <a key={category._id} href={`/category/${category._id}`}>{category.name}</a>
        })
      }
    </div>}
  </div>
}