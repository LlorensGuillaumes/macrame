import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import api from "../../Shared/API/api";
import { useNavigate } from "react-router-dom";

const MyProfile = ({ userData }) => {
  const navigate = useNavigate;
  const [email, setEmail] = useState("");
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (userData) {
      setEmail(userData.mail);
    }
  }, [userData]);

  useEffect(() => {
    if (email) {
      api
        .get(`/purchases/email/${email}`)
        .then((response) => {
          console.log(response);
          setPurchases(response); 
        })
        .catch((error) => {
          console.error("Error al cargar compras:", error);
        });
    }
  }, [email]);
  const fnSelectProductCart = (id) => {
    const value = {
      family: false,
      id: id,
    };
    const encodedValue = encodeURIComponent(JSON.stringify(value));
    navigate(`/store/${encodedValue}`);
  };

  return (
    <div className="myProfileContainer">
      <h1>MI PERFIL</h1>
      <div>
        <ul>
          <li>Canviar contraseña</li>
          <li>Mis Pedidos</li>
        </ul>
      </div>
      {purchases &&
        purchases.length > 0 &&
        purchases.map((item, index) => (
          <div key={index}>
            <p>
              Realizado el: {new Date(item.createdAt).toLocaleDateString()}{" "}
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="purchaseContainer">
              <p>Producto</p>
              <p>Imagen</p>
              <p>Color</p>
              <p>Unidades</p>
              <p>Precio</p>
              <p>SubTotal</p>
            </div>
            {item.shoppingCart &&
              item.shoppingCart.map((pedido, ProductIndex) => (
                <div key={ProductIndex} className="purchaseContainer">
                  <p>{pedido.product.productId.name}</p>
                  <div className="imageContainerCartItem">
                    <img
                      src={`http://localhost:5000/images/products/${pedido.product.productId.images[0]}`}
                      alt="producto"
                      className="imageCartItem"
                      onClick={() => {
                        fnSelectProductCart(pedido.product.productId._id);
                      }}
                    />
                  </div>
                  <div className="">
                    <p>{pedido.product.treadId.color.name}</p>
                  <p>{pedido.product.treadId.treadType.name}</p>
                  </div>
                
                  <p>{pedido.product.units}</p>
                  <p>{pedido.product.price} €</p>
                  <p>{parseFloat(pedido.product.units) * parseFloat(pedido.product.price)} €</p>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default MyProfile;
