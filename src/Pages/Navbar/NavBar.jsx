import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

import carrito from "../../Images/iconos/carrito.png";
import favorites from "../../Images/iconos/favorite.png";
import mail from "../../Images/iconos/mail.png";
import api from "../../Shared/API/api";

const NavBar = ({ userData, cart, setUserData }) => {
  const navigate = useNavigate();
  const [onlineStoreVisible, setOnlineStoreVisible] = useState(false);
  const [familiesMenuVisible, setFamiliesMenuVisible] = useState(false);
  const [adminMenuVisible, setAdminMenuVisible] = useState(false);
  const [productsMenuVisible, setProductsMenuVisible] = useState(false);
  const [familiesData, setFamiliesData] = useState([]);
  const [rol, setRol] = useState("");
  const [numberItemsCart, setNumberItemsCart] = useState("");

  useEffect(() => {
    if (userData) {
      api
        .get(`/users/id/${userData._id}`)
        .then((response) => {
          setUserData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cart]);

  useEffect(() => {
    if (userData) {
      setNumberItemsCart(userData.shoppingCart.length);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      setRol(userData.rol);
    }
  }, [userData]);

  useEffect(() => {
    api.get("/families").then((response) => {
      setFamiliesData(response);
    });
  }, []);

  const fnListFamilyItemClick = (item) => {
    const value = {
      family: item,
      id: false,
    };
    const encodedValue = encodeURIComponent(JSON.stringify(value));
    navigate(`/store/${encodedValue}`);
  };
  return (
    <div className="navbarContainer">
      <div className="navbarContainerLeftButons">
        <div className="btnNavbar">
          <div
            className="btnRegister navbarText"
            onClick={() => {
              setAdminMenuVisible(false);
              setProductsMenuVisible(false);
              setOnlineStoreVisible(false);
              navigate("/");
            }}
          >
            HOME
          </div>
        </div>
        <div className="btnNavbar selectFamily">
          <div
            className="btnRegister navbarText"
            onClick={() => {
              setOnlineStoreVisible(!onlineStoreVisible);
              setAdminMenuVisible(false);
              setProductsMenuVisible(false);
            }}
          >
            TIENDA ONLINE
          </div>
          {onlineStoreVisible && (
            <ul className="listFamiliesContainer">
              {familiesData &&
                familiesData.map((item, index) => (
                  <li
                    className="listFamilyItem"
                    key={index}
                    onClick={() => {
                      setOnlineStoreVisible(false);
                      fnListFamilyItemClick(item.group);
                    }}
                  >
                    {item.group}
                  </li>
                ))}
              <li
                className="listFamilyItem"
                onClick={() => {
                  setOnlineStoreVisible(false);
                  fnListFamilyItemClick("allProducts");
                }}
              >
                Todos los productos
              </li>
            </ul>
          )}
        </div>

        <div className="btnNavbar">
          <div
            className="btnRegister navbarText"
            onClick={() => {
              setAdminMenuVisible(false);
              setOnlineStoreVisible(false);
              navigate("/history");
            }}
          >
            QUÉ ES EL MACRAMÉ
          </div>
        </div>
        <div className="btnNavbar navbarText" >
          <div className="btnRegister" onClick={() => {
            setAdminMenuVisible(false);
            setOnlineStoreVisible(false);
            navigate("/about_me");
          }}>
            QUIEN SOY
          </div>
        </div>
        <div className="btnNavbar">
          <div
            className="btnRegister navbarText"
            onClick={() => {
              setAdminMenuVisible(false);
              setOnlineStoreVisible(false);
              navigate("/treadExplain");
            }}
          >
            CUERDAS
          </div>
        </div>
        {rol === "admin" && (
          <div className="btnNavbar selectFamily">
            <div
              className="btnRegister navbarText"
              onClick={() => {
                setAdminMenuVisible(!adminMenuVisible);
                setProductsMenuVisible(false);
                setFamiliesMenuVisible(false);
                setOnlineStoreVisible(false);
              }}
            >
              ADMIN
            </div>
            {adminMenuVisible && (
              <div>
                <div>
                  <ul className="listFamiliesContainer">
                    <li
                      className="listAdminItem"
                      onClick={() => {
                        setProductsMenuVisible(!productsMenuVisible);
                        navigate("new_product");
                        setAdminMenuVisible(false);
                        setProductsMenuVisible(false);
                      }}
                    >
                      Productos
                    </li>
                    <li
                      className="listAdminItem"
                      onClick={() => {
                        setFamiliesMenuVisible(!familiesMenuVisible);
                        navigate("colors");
                        setAdminMenuVisible(false);
                        setProductsMenuVisible(false);
                      }}
                    >
                      Colores
                    </li>
                    <li
                      className="listAdminItem"
                      onClick={() => {
                        setFamiliesMenuVisible(!familiesMenuVisible);
                        navigate("families");
                        setAdminMenuVisible(false);
                        setProductsMenuVisible(false);
                      }}
                    >
                      Familias
                    </li>
                    <li
                      className="listAdminItem"
                      onClick={() => {
                        setFamiliesMenuVisible(!familiesMenuVisible);
                        navigate("providers");
                        setAdminMenuVisible(false);
                        setProductsMenuVisible(false);
                      }}
                    >
                      Proveedores
                    </li>
                    <li
                      className="listAdminItem"
                      onClick={() => {
                        setFamiliesMenuVisible(!familiesMenuVisible);
                        navigate("treadTypes");
                        setAdminMenuVisible(false);
                        setProductsMenuVisible(false);
                      }}
                    >
                      Tipos de cuerda
                    </li>
                    <li
                      className="listAdminItem"
                      onClick={() => {
                        setFamiliesMenuVisible(!familiesMenuVisible);
                        navigate("treads");
                        setAdminMenuVisible(false);
                        setProductsMenuVisible(false);
                      }}
                    >
                      Cuerdas
                    </li>
                    <li
                      className="listAdminItem"
                      onClick={() => {
                        setFamiliesMenuVisible(!familiesMenuVisible);
                        navigate("diameters");
                        setAdminMenuVisible(false);
                        setProductsMenuVisible(false);
                      }}
                    >
                      Diametros
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="navbarContainerRightButons">
        {userData && (
          <>
            <div className="favoritesNavBarContainer" title="Iniciar sesión">
              <img
                src={favorites}
                alt="favoritos"
                className="iconNavBar"
                onClick={() => {
                  navigate("favourites");
                }}
              />
            </div>
            <div className="iconNavBarContainer" title="Iniciar sesión">
              <img
                src={carrito}
                alt="iconoUser"
                className="iconNavBar"
                onClick={() => {
                  navigate("cart");
                }}
              />
            </div>
            <p className="itemsCarrito">{numberItemsCart}</p>
          </>
        )}
        <div className="favoritesNavBarContainer" title="Iniciar sesión">
          <img
            src={mail}
            alt="contactar"
            className="iconNavBar"
            onClick={() => {
              navigate("mail");
            }}
          />
        </div>
      </div>
    </div>
  )
};

export default NavBar;
