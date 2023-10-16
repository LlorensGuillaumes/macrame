import React, { useEffect, useState } from "react";
import "./Favourites.css";
import papelera from "../../Images/iconos/papelera.png";
import { useNavigate } from "react-router-dom";
import api from "../../Shared/API/api";

const Favourites = ({ userData, productsData, setUserData }) => {
  const navigate = useNavigate();

  const [arrFavourites, setArrFavourites] = useState([]);
  useEffect(() => {
    if (userData) {
      const filteredProducts = productsData.filter((product) => {
        return userData.favourites.includes(product._id);
      });
      setArrFavourites(filteredProducts);
    }
  }, [userData, productsData]);

  const fnGoToProduct = (id) => {
    const value = {
      family: false,
      id: id,
    };
    const encodedValue = encodeURIComponent(JSON.stringify(value));
    navigate(`/store/${encodedValue}`);
  };

  const fnDeleteFavourite = (id) => {
    const newFavourites = arrFavourites.filter((item)=>(
      item._id !== id
    ));

    api
    .put(`/users/update/${userData._id}`, {
      userModify: { favourites: newFavourites },
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

  }

  return (
    <div className="productsContainer">
      <h1>MIS FAVORITOS</h1>
      <div className="productsContainerFavourites">
        {arrFavourites &&
          arrFavourites.length > 0 &&
          arrFavourites.map((product, productIndex) => (
            <div
              className="productItemFavourites"
              key={productIndex}
            
            >
              <div className="imagesProduct">
                <div className="favouriteImageContainer">
                  <img
                    src={`http://localhost:5000/images/products/${product.images[0]}`}
                    alt="objectPhoto"
                    className="favouritesImage"
                    onClick={() => {
                      fnGoToProduct(product._id);
                    }}
                  />
                </div>
              </div>
              <div className="favouriteContainer">
                <div>
                  <div className="nameFavourites">
                    <h2>{product.name}</h2>
                  </div>
                  <div className="descriptionFavourites">
                    <p className="productDescriptionText">
                      {product.description}
                    </p>
                  </div>
                  <div className="priceFavourite">
                    {product.price}
                    €/u
                  </div>
                </div>

                <div className="deleteFavouritesContainer">
                  <img
                    src={papelera}
                    alt="elminar"
                    className="deleteFavourites"
                    onClick={()=>{fnDeleteFavourite(product._id)}}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favourites;
