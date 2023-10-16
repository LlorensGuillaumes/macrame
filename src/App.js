import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Title from "./Pages/Title/Title";
import NavBar from "./Pages/Navbar/NavBar";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import LoginNavbar from "./Pages/LoginNavbar/LoginNavbar";
import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Admin";
import NewProduct from "./Pages/NewProduct/NewProduct";
import Families from "./Pages/Families/Families";
import Colors from "./Pages/Colors/Colors";
import Proveedores from "./Pages/Proveedores/Proveedores";
import TreadTypes from "./Pages/TreadTypes/TreadTypes";
import Treads from "./Pages/Treads/Treads";
import Diameters from "./Pages/Diameters/Diameters";
import MailForm from "./Pages/MailForm/MailForm";
import Ecomerce from "./Pages/Ecomerce/Ecomerce";
import api from "./Shared/API/api";
import Cart from "./Pages/Cart/Cart";
import Favourites from "./Pages/Favourites/Favourites";
import Footer from "./Pages/Footer/Footer";
import History from "./Pages/History/History";
import TreadsExplain from "./Pages/TreadsExplain/TreadsExplain";
import Purchase from "./Pages/Purchase/Purchase";
import MyProfile from "./Pages/MyProfile/MyProfile";
import AboutMe from "./Pages/AboutMe/AboutMe";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState([]);
  const [productsData, setProductsdata] = useState([]);

  useEffect(() => {


    api
      .get("/products")
      .then((response) => {
        setProductsdata(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    api
      .getSesion('/session')
      .then((response)=> {
        setUserData(response)
      })
      .catch((error)=>{
        console.log(error)
      })
  },[])

  return (
    <Router>
      <div className="appContainer">
        <LoginNavbar setIsRegister={setIsRegister} userData={userData} setUserData={setUserData}/>
        <Title />
        <NavBar userData={userData} cart={cart} setUserData={setUserData}/>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                isRegister={isRegister}
                setIsRegister={setIsRegister}
                setUserData={setUserData}
              />
            }
          />
          <Route path="/productos" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/new_product" element={<NewProduct />} />
          <Route path="/families" element={<Families />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/providers" element={<Proveedores />} />
          <Route path="/treadTypes" element={<TreadTypes />} />
          <Route path="/treads" element={<Treads />} />
          <Route path="/diameters" element={<Diameters />} />
          <Route path="/mail" element={<MailForm userData={userData}/>} />
          <Route path="/store/:value" element={<Ecomerce  setCart={setCart} userData={userData} cart={cart} setUserData={setUserData} productsData={productsData}/>} />
          <Route path="/cart" element={<Cart userData={userData} setUserData={setUserData}/>}/>
          <Route path="/favourites" element={<Favourites userData={userData} setUserData={setUserData} productsData={productsData}/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/treadExplain" element={<TreadsExplain/>}/>
          <Route path="/purchase/" element={<Purchase userData={userData} setUserData={setUserData}/>}/>
          <Route path="/my_profile" element={<MyProfile userData={userData}/>}/>
          <Route path="/about_me" element={<AboutMe/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
