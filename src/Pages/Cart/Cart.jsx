import React, { useEffect, useRef, useState } from "react";
import "./Cart.css";
import papelera from "../../Images/iconos/papelera.png";
import api from "../../Shared/API/api";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import myHeader from "../../Images/headboard.png";



const Cart = ({ userData, setUserData }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [arrCartItems, setArrCartItems] = useState([]);

  const navigate = useNavigate();

  const generatePDF = () => {
    return new Promise((resolve) => {
      const content = document.getElementById("myCart");
      const pdf = new jsPDF("p", "pt", "letter");
  
      const contentWidth = content.offsetWidth;
      const contentHeight = content.offsetHeight;
  
      html2canvas(content, {
        useCORS: true,
        width: contentWidth,
        height: contentHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const scaledWidth = contentWidth * 0.6;
        const scaledHeight = contentHeight * 0.6;
  
        const title = `<img src="${myHeader}" alt="header" style="width: 600px; object-fit: contain; object-position: center;"/>`;
  
        pdf.html(title, {
          x: 10,
          y: 10,
          callback: function (pdf) {
            pdf.addImage(imgData, "PNG", 0, 200, scaledWidth, scaledHeight);
            const pdfBlob = pdf.output("blob");
            
  
            const reader = new FileReader();
            reader.onload = () => {
              const pdfDataUri = reader.result;
              localStorage.setItem("es_cotton.macrame-pedido", pdfDataUri);
              resolve(pdfDataUri);
            };
  
            reader.readAsDataURL(pdfBlob);
          },
        });
      });
    });
  };
  
  const fnTramitarPedido = async () => {
    const pdfDataUri = await generatePDF();

    navigate(`/purchase/`);
  };
  


  useEffect(() => {
    if (userData) {
      setArrCartItems(userData.shoppingCart);
    }
  }, [userData]);

  useEffect(() => {
    if (arrCartItems && arrCartItems.length > 0) {
      const newTotalPrice = arrCartItems.reduce((accumulator, item) => {
        const units = parseFloat(item.product.units);
        const price = parseFloat(item.product.price);
        const subTotal = units * price;
        return accumulator + subTotal;
      }, 0);

      setTotalPrice(newTotalPrice.toFixed(2));
    }
  }, [arrCartItems]);

  const fnDeleteItem = (itemId) => {
    const actualCartItems = userData.shoppingCart;
    const actualCart = actualCartItems.filter((item) => item._id !== itemId);

    api
      .put(`/users/update/${userData._id}`, {
        userModify: { shoppingCart: actualCart },
        changePassword: false,
      })
      .then((response) => {
        if (!response.error) {
          api
            .get(`/users/id/${userData._id}`)
            .then((response) => {
              setUserData(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fnSelectProductCart = (id) => {
    const value = {
      family: false,
      id: id,
    };
    const encodedValue = encodeURIComponent(JSON.stringify(value));
    navigate(`/store/${encodedValue}`);
  };

  const fnBuy = () => {
    const value = {
      family: "allProducts",
      id: false,
    };
    const encodedValue = encodeURIComponent(JSON.stringify(value));
    navigate(`/store/${encodedValue}`);
  };


  return (
    <div className="cartContainer">
      <h1>CARRITO</h1>
      <div className="toPdf" id="myCart">
        {arrCartItems &&
          arrCartItems.length > 0 ?
          arrCartItems.map((item, index) => (
            <div key={index} className="cartItem">
              <div className="imageContainerCartItem">
                <img
                  src={`http://localhost:5000/images/products/${item.product.productId.images[0]}`}
                  alt="producto"
                  className="imageCartItem"
                  onClick={() => {
                    fnSelectProductCart(item.product.productId._id);
                  }}
                />
              </div>

              <div className="name_treadType">
                <h2 className="itemProduct">{item.product.productId.name}</h2>
                <p className="itemColor">
                  {item.product.treadId.treadType.name}
                </p>
                <div className="colorNameAndImage">
                  <p className="itemColor">
                    Color: {item.product.treadId.color.name}
                  </p>
                </div>
              </div>
              <div className="miniColorImages">
                <img
                  src={`http://localhost:5000/images/colors/${item.product.treadId.color.image}`}
                  alt="color"
                  className="miniColorImageImage"
                />
              </div>

              <h2 className="itemPrice">{item.product.price} €</h2>
              <h2 className="itemPrice">{item.product.units} uds.</h2>
              <h2 className="itemSubTotal">
                {(item.product.units * item.product.price).toFixed(2)} €
              </h2>
              <div
                className="papeleraContainer"
                onClick={() => fnDeleteItem(item._id)}
              >
                <img src={papelera} alt="borrar" className="papeleraIcon" />
              </div>
            </div>
          )) : <h1>Aún no tienes nada en el carrito</h1>}

        <h2 className="allPrices">total carrito: {totalPrice} €</h2>
      </div>
      <button
        className="btnBuy"
        onClick={() => {
          fnTramitarPedido();
        }}
      >
        Tramitar compra
      </button>
      <button
        className="btnBuy"
        onClick={() => {
          fnBuy();
        }}
      >
        Seguir comprando
      </button>
    </div>
  );
};

export default Cart;
