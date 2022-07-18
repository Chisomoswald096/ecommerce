import './App.css';
import Header from './components/Header';
import {BrowserRouter, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import cartpage from './Pages/CartPage';
import RegistrationPage from './Pages/RegistrationPage';
import AdminProduct from './Pages/AdminProductPages';
import AddProduct from './Pages/AddProductPage';
// import favourites from './Pages/FavouritesPage';
import Productpage from './Pages/Product';
import EditProductPage from './Pages/EditProductPage';
import Footer from './components/Footer';
import Loading from './components/Loading';
import AccountPage from './Pages/AccountPage';
import CheckOutPage from './Pages/CheckOutPage';
import ResultPage from './Pages/ResultPage';
import CategoryPage from './Pages/Category';
import AddCategoryPage from './Pages/AddCategoryPage';
import AdminCategoryPage from './Pages/AdminCategoryPage';
import AdminDashBoardPage from './Pages/AdminDashBoardPage';
import EditCategoryPage from './Pages/EditCategoryPage';
import CategoryResultPage from './Pages/CategoryResultPage';
import AdminOrderPage from './Pages/AdminOrderPage';
import OrderDetailsPage from './Pages/OrderDetailsPage';







function App() {
  return (<BrowserRouter>
  <Header/>
  <br />
  <br />
  <br />
  <main>
    <Route path="/" exact component= {HomePage} />
  <Route path="/login" component= {LoginPage} />
  <Route path="/register" component= {RegistrationPage} />
  <Route path="/admin-product" component= {AdminProduct} />
  <Route path="/add-product" component= {AddProduct} />
  {/* <Route path="/favourites" component= {favourites} /> */}
  {/* <Route path="/calculator" component= {calculator} /> */}
  <Route path="/product/:id" component= {Productpage} />
  <Route path="/edit-product/:id" component= {EditProductPage} />
  <Route path="/account" component= {AccountPage} />
  <Route path="/cart/:id?" component= {cartpage} />
  <Route path="/checkout" component= {CheckOutPage} />
  <Route path="/search/:name" component= {ResultPage} />
  <Route path="/add-category" component= {AddCategoryPage} />
  <Route path="/admin-category" component= {AdminCategoryPage} />
  <Route path="/categories" component= {CategoryPage} />
  <Route path="/admin-dashboard" component= {AdminDashBoardPage} />
  <Route path="/edit-category/:id" component= {EditCategoryPage} />
  <Route path="/category/:id" component= {CategoryResultPage} />
  <Route path="/admin-order" component= {AdminOrderPage} />
  <Route path="/order-details/:id" component= {OrderDetailsPage} />






</main>
  




  <Footer/>


 



  


   
  </BrowserRouter>
  );
}

export default App;
