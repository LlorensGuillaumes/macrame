import React, { useEffect, useState } from "react";
import "./Ecomerce.css";
import api from "../../Shared/API/api";
import { useNavigate, useParams } from "react-router-dom";
import favourite from "../../Images/iconos/favorite.png";
import noFavourtie from "../../Images/iconos/noFavorite.png";
import addCart from "../../Images/iconos/addCart.png";
import interrogante from "../../Images/iconos/interrogante.png";

const Ecomerce = ({ setCart, userData, cart, setUserData, productsData }) => {
  const navigate = useNavigate();
  const { value } = useParams();

  const [productsToShow, setProductsToShow] = useState([]);
  const [arrProductsToShow, setArrProductsToShow] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [errorUnitsVisible, setErrorUnitsVisible] = useState(false);
  const [unitsToShow, setUnitsToShow] = useState([]);
  const [actualCartItems, setActualCartItems] = useState([]);
  const [buyVisible, setBuyVisible] = useState(false);
  useEffect(() => {
    const decodedValue = JSON.parse(decodeURIComponent(value));
    fnChargeData(decodedValue);
  }, [value]);

  const fnChargeData = (decodedValue) => {
    if (decodedValue.family === "allProducts") {
      setProductsToShow(productsData);
    } else {
      if (decodedValue.family || decodedValue.id) {
        setProductsToShow(
          productsData.filter((product) => {
            if (decodedValue.family) {
              return product.group === decodedValue.family;
            }
            if (decodedValue.id) {
              return product._id === decodedValue.id;
            }
            return true;
          })
        );
      }
    }
  };

  useEffect(() => {
    if (productsToShow && productsToShow.length > 0) {
      const falsesArray = Array(productsToShow.length).fill(false);
      setArrProductsToShow(falsesArray);
    }
  }, [productsToShow]);

  useEffect(() => {
    if (userData) {
      const shoppingCart = userData.shoppingCart;
      const newUnitsToShow = [];
      if (shoppingCart.length > 0) {
        for (const cartItem of shoppingCart) {
          const productId = cartItem.product.productId._id;
          const treadId = cartItem.product.treadId._id;
          const units = cartItem.product.units;
          const price = cartItem.product.price;
          const objShoppingCart = {
            product: productId,
            tread: treadId,
            units: units.toString(),
            price: price,
          };
          newUnitsToShow.push(objShoppingCart);
        }
      }

      setUnitsToShow(newUnitsToShow);
      setActualCartItems(unitsToShow);
    }
  }, [productsToShow, userData]);

  const fnCartAdd = (product) => {
    if (!userData) {
      navigate("/login");
    } else {
      setErrorUnitsVisible(false);
      const newCart = [];

      setActualCartItems(unitsToShow);

      for (const item of unitsToShow) {
        const newCartItem = {
          product: {
            productId: item.product,
            treadId: item.tread,
            units: item.units,
            price: item.price,
          },
        };
        newCart.push(newCartItem);
      }

      api
        .put(`/users/update/${userData._id}`, {
          userModify: { shoppingCart: newCart },
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
  };

  const fnAddFauvorites = (productId) => {
    if (!userData) {
      navigate("/login");
    } else {
      if (!userData.favourites.includes(productId)) {
        const actualFavourites = userData.favourites;
        actualFavourites.push(productId);
        api
          .put(`/users/update/${userData._id}`, {
            userModify: { favourites: actualFavourites },
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
      } else {
        const actualFavourites = userData.favourites;
        const newFavorites = actualFavourites.filter(
          (item) => item !== productId
        );

        api
          .put(`/users/update/${userData._id}`, {
            userModify: { favourites: newFavorites },
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
    }
  };

  const fnActualizeCart = (product, tread, price, event) => {
    const newValue = event.target.value.toString();
    const productIndex = unitsToShow.findIndex(
      (unit) => unit.product === product && unit.tread === tread
    );

    if (productIndex === -1) {
      const objShoppingCart = {
        product: product,
        tread: tread,
        units: newValue,
        price: price,
      };

      unitsToShow.push(objShoppingCart);
    } else {
      unitsToShow.splice(productIndex, 1);

      const objShoppingCart = {
        product: product,
        tread: tread,
        units: newValue,
        price: price,
      };
      unitsToShow.push(objShoppingCart);
    }
    setUnitsToShow([...unitsToShow]);
  };

  const fnShowBuyOptions = (productIndex) => {
    setArrProductsToShow((prevArr) => {
      const newArr = [...prevArr];
      newArr[productIndex] = !newArr[productIndex];

      return newArr;
    });
  };

  return (
    <div className="productsContainer">
      {productsToShow &&
        productsToShow.length > 0 &&
        productsToShow.map((product, productIndex) => (
          <div className="productItem" key={productIndex}>
            <div className="imagesProductEcomerce">
              <div className="productImageContainerEcomerce">
                <img
                  src={`http://localhost:5000/images/products/${
                    currentImage && currentImage.productIndex === productIndex
                      ? product.images[currentImage.thumbnailIndex]
                      : product.images[0]
                  }`}
                  alt="objectPhoto"
                  className="productImageImage"
                />
              </div>
              <div className="litteImageContainerEcomerce">
                {product.images &&
                  product.images.length > 0 &&
                  product.images.map((thumbnail, thumbnailIndex) => (
                    <div
                      key={thumbnailIndex}
                      className="litteImagesItemsEcomerce"
                      onClick={() =>
                        setCurrentImage({
                          productIndex,
                          thumbnailIndex,
                        })
                      }
                    >
                      <img
                        src={`http://localhost:5000/images/products/${thumbnail}`}
                        alt="litteImages"
                        className="litteImages"
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="middleContainer">
              <div className="productName nameFavourites">
                <div className="name_favourites">
                  <div className="name_price-ecomerce">
                    <div>
                      <h2>{product.name}</h2>
                    </div>
                    <div className="priceContainerEcomerce">
                      {product.price} €/u
                    </div>
                  </div>

                  <div
                    className="addToFavourites"
                    onClick={() => fnAddFauvorites(product._id)}
                  >
                    <img
                      src={
                        userData && userData.favourites.includes(product._id)
                          ? favourite
                          : noFavourtie
                      }
                      alt="favoritos"
                      className="favouritesIcon"
                    />
                  </div>
                </div>
              </div>
              <div className="productDescription">
                <p className="productDescriptionText">{product.description}</p>
              </div>

              <button
                onClick={() => {
                  setBuyVisible(!buyVisible);
                  fnShowBuyOptions(productIndex);
                }}
                className="showBuyOptions"
              >
                COMPRAR
              </button>
              {arrProductsToShow[productIndex] && (
                <div className="ecomerce-buy">
                  <div className="EcomerceTread_add">
                    <div className="middleContainer">
                      {product.stock.map((item, index) => (
                        <div key={index} className="treadEcomerceContent">
                          <p className="hidden">{item.tread._id}</p>
                          <div className="color_Type">
                            <h2>{`${item.tread.color.name}`}</h2>
                            <div className="type_ask">
                              <p>{`${item.tread.treadType.name}`}</p>
                              <div
                                className="ask"
                                onClick={() => {
                                  navigate("/treadExplain");
                                }}
                              >
                                <img
                                  src={interrogante}
                                  alt="info"
                                  className="ask_item"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="colorImageContainerEcomerce">
                            <img
                              src={`http://localhost:5000/images/colors/${item.tread.color.image}`}
                              alt="litteImages"
                              className="colorImageItem"
                            />
                          </div>
                          <div className="units_cart">
                            <input
                              type="text"
                              placeholder="0"
                              className="treadListItem unitsInput unitsStockInput
                unitsNumber"
                              onChange={(e) =>
                                fnActualizeCart(
                                  product._id,
                                  item.tread._id,
                                  product.price,
                                  e
                                )
                              }
                            />
                            {actualCartItems.find(
                              (unit) =>
                                unit.product === product._id &&
                                unit.tread === item.tread._id
                            ) && (
                              <p>{`${
                                actualCartItems.find(
                                  (unit) =>
                                    unit.product === product._id &&
                                    unit.tread === item.tread._id
                                ).units
                              } uds. en la cesta`}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btnAddCart"
                      onClick={() => {
                        fnCartAdd(product._id);
                      }}
                    >
                      <div className="addCartContainer">
                        <img
                          src={addCart}
                          alt="addCart"
                          className="addCartImage"
                        />
                      </div>
                    </button>
                  </div>
                  <p className="others">
                    Para otros colores y cantidades no dudes en contactar
                    conmigo
                  </p>
                </div>
              )}
              <div className="inputToStok"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Ecomerce;
