import React, { useEffect, useState } from "react";
import "./Products.css";
import api from "../../Shared/API/api";

const Products = ({ treadsData, selectedProduct, setSelectedProduct }) => {
  const [productsData, setProductsdata] = useState([]);
  const [treadsDataFiltered, setTreadsDataFiltered] = useState(treadsData);
  const [arrStock, setArrStock] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [arrProviders, setArrProviders] = useState([]);
  const [arrTreadType, setArrTreadType] = useState([]);
  const [arrColor, setArrColor] = useState([]);
  const [arrDiameter, setArrDiameter] = useState([]);

  const [findProduct, setFindProduct] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [productsToShow, setProductsToShow] = useState([]);

  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleteText, setDeleteText] = useState("Eliminar");
  const [confirmDelete, setConfirmDelete] = useState("");
  const [confirmDeleteBtn, setConfirDeleteBtn] = useState(true);

  let newTreadsDataToShowData = [];
  let newTreadsDataToShowNoData = [];

  const fnFilterUpdate = (filter, value) => {
    fnCreateNewTreadsDataToShow();

    let providerSelected = "";
    let treadTypeSelected = "";
    let colorSelected = "";
    let diameterSelected = "";

    if (filter === "provider") {
      providerSelected = value;
    }
    if (filter === "treadType") {
      treadTypeSelected = value;
    }
    if (filter === "color") {
      colorSelected = value;
    }
    if (filter === "diameter") {
      diameterSelected = value;
    }

    if (providerSelected !== "Proveedor" && providerSelected !== "") {
      newTreadsDataToShowNoData = newTreadsDataToShowNoData.filter(
        (item) => item.provider.providerName === providerSelected
      );
    }

    if (treadTypeSelected !== "Tipo de cuerda" && treadTypeSelected !== "") {
      newTreadsDataToShowNoData = newTreadsDataToShowNoData.filter(
        (item) => item.treadType.treadTypeName === treadTypeSelected
      );
    }

    if (colorSelected !== "Color" && colorSelected !== "") {
      newTreadsDataToShowNoData = newTreadsDataToShowNoData.filter(
        (item) => item.color.colorName === colorSelected
      );
    }

    if (diameterSelected !== "Diámetro" && diameterSelected != "") {
      newTreadsDataToShowNoData = newTreadsDataToShowNoData.filter(
        (item) => item.diameter.diameterDiameter == diameterSelected
      );
    }

    setTreadsDataFiltered(
      newTreadsDataToShowData.concat(newTreadsDataToShowNoData)
    );
  };

  useEffect(() => {
    setTreadsDataFiltered([...treadsData]);
  }, [treadsData]);

  useEffect(() => {
    if (selectedProduct && selectedProduct._id && selectedProduct._id !== "") {
      setProductsToShow(
        productsData.filter((product) => product._id === selectedProduct._id)
      );
    } else {
      setProductsToShow(productsData);
    }
  }, [selectedProduct, productsData]);

  useEffect(() => {
    if (treadsData && treadsData.length > 0) {
      const uniqueProviders = [
        ...new Set(treadsData.map((item) => item.provider.name)),
      ];
      setArrProviders(uniqueProviders);

      const uniqueTreadTypes = [
        ...new Set(treadsData.map((item) => item.treadType.name)),
      ];
      setArrTreadType(uniqueTreadTypes);

      const uniqueColors = [
        ...new Set(treadsData.map((item) => item.color.name)),
      ];
      setArrColor(uniqueColors);

      const uniqueDiameters = [
        ...new Set(treadsData.map((item) => item.diameter.diameter)),
      ];
      setArrDiameter(uniqueDiameters);
    }
  }, [treadsData]);

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

  const fnAddToStock = () => {
    const arrToStock = [];
    for (const tread of treadsDataFiltered) {
      if (tread.units > 0) {
        const newTread = {
          tread: tread.id,
          stock: tread.units,
        };
        arrToStock.push(newTread);
      }
    }

    const updateData = {
      stock: arrToStock,
      name: name && name !== "" ? name : selectedProduct.name,
      price: price && price !== "" ? price : selectedProduct.price,
      description:
        description && description !== ""
          ? description
          : selectedProduct.description,
    };

    api
      .put(`/products/edit/${selectedProduct._id}`, updateData)
      .then((response) => {
        api
          .get("/products")
          .then((response) => {
            setProductsdata(response);
            setSelectedProduct(null);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fnFindProduct = () => {
    setProductsToShow(productsData);
    setSelectedProduct(null);
    setDeleteProduct(null);
    setConfirDeleteBtn(true);
    if (findProduct && productsToShow.some((product) => product.group === findProduct)) {
      setProductsToShow(productsToShow.filter((product) => product.group === findProduct));
    } else if (findProduct && productsToShow.some((product) => product.name === findProduct)){
      setProductsToShow(productsToShow.filter((product) => product.name === findProduct));
     
    }else {
      setProductsToShow(productsData)
    }
    setFindProduct('');
  };
  const removeItem = (indexToRemove) => {
    setArrStock((prevArrStock) =>
      prevArrStock.filter((_, index) => index !== indexToRemove)
    );
  };

  const fnDeleteProduct = () => {
    if (deleteText === "Confirmar") {
      api.delete(`/products/delete/${deleteProduct._id}`).then((response) => {
        setSelectedProduct(null)
        setDeleteProduct(null)
        setConfirDeleteBtn(true)
        api
          .get("/products")
          .then((response) => {
            setProductsdata(response)
          .catch((error) => {
              console.log(error);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
    }
  };

  useEffect(() => {
    if (deleteProduct && deleteProduct._id) {
      fnDeleteProduct();
    }
  }, [deleteProduct]);

  useEffect(() => {
    if (selectedProduct) {
      fnCreateNewTreadsDataToShow();
      fnFilterUpdate();
    }
  }, [selectedProduct]);

  const fnCreateNewTreadsDataToShow = () => {
    const selectedProductStock = selectedProduct.stock;
    let selectedProductStockTread;

    if (selectedProductStock) {
      selectedProductStockTread = selectedProductStock.filter(
        (item) => item.tread
      );
    }

    if (treadsData && treadsData.length > 0) {
      let newTreadsDataToShow = [];

      treadsData.forEach((tread) => {
        const units =
          selectedProductStockTread &&
          selectedProductStockTread.findIndex(
            (item) => item.tread._id === tread._id
          ) !== -1
            ? selectedProductStockTread.find(
                (item) => item.tread._id === tread._id
              )?.stock || 0
            : 0;

        const newTreadsDataToShowItem = {
          color: {
            colorId: tread.color._id,
            colorName: tread.color.name,
          },
          diameter: {
            diameterId: tread.diameter._id,
            diameterDiameter: tread.diameter.diameter,
          },
          provider: {
            providerId: tread.provider._id,
            providerName: tread.provider.name,
          },
          treadType: {
            treadTypeId: tread.treadType._id,
            treadTypeName: tread.treadType.name,
          },
          units: units,
          id: tread._id,
        };

        newTreadsDataToShow.push(newTreadsDataToShowItem);
      });
      newTreadsDataToShowData = newTreadsDataToShow.filter(
        (item) => item.units !== 0
      );
      newTreadsDataToShowNoData = newTreadsDataToShow.filter(
        (item) => item.units === 0
      );
      setTreadsDataFiltered(
        newTreadsDataToShowData.concat(newTreadsDataToShowNoData)
      );
    }
  };

  const fnChangeUnits = (id, inputValue, index) => {
    let updatedDataToShowData = [];

    updatedDataToShowData = treadsDataFiltered.map((tread) => {
      if (tread.id === id) {
        return { ...tread, units: inputValue[index].value };
      }
      return { ...tread };
    });

    let updatedTreadsData = [];
    updatedTreadsData = updatedDataToShowData.filter(
      (item) => item.units !== 0
    );
    let updatedTreadsDataNoData = [];
    updatedTreadsDataNoData = updatedDataToShowData.filter(
      (item) => item.units === 0
    );
    updatedTreadsData.sort((a, b) => b.units - a.units);

    setTreadsDataFiltered(updatedTreadsData.concat(updatedTreadsDataNoData));
  };

  useEffect(() => {
    if (deleteProduct && deleteProduct.name === confirmDelete) {
      setConfirDeleteBtn(true);
      setDeleteText("Confirmar");
    }
  }, [confirmDelete, deleteProduct]);

  return (
    <div className="productsContainer">
      <div className="findProduct">
        <input
          type="text"
          value={findProduct}
          onChange={(e) => {
            setFindProduct(e.target.value);
          }}
          placeholder="Buscar familia o nombre de producto"
          className="findInput"
        />
        <button
          className="btnImageSave"
          onClick={() => {
            fnFindProduct();
          }}
        >
          Buscar
        </button>
        <button
          className="btnImageSave btnShowAll "
          onClick={() => {
            setSelectedProduct({});
            setDeleteProduct(null);
            setDeleteText('Eliminar');
          }}
        >
          Mostrar todos
        </button>
      </div>

      {productsToShow &&
        productsToShow.length > 0 &&
        productsToShow.map((product, productIndex) => (
          <div className="productItem" key={productIndex}>
            <div className="imagesProduct">
              <div className="productImageContainer">
                <img
                  src={`http://localhost:5000/images/products/${
                    currentImage
                      ? productsData[currentImage.productIndex].images[
                          currentImage.thumbnailIndex
                        ]
                      : product.images[0]
                  }`}
                  alt="objectPhoto"
                  className="productImageImage"
                />
              </div>
              <div className="litteImageContainer">
                {product.images &&
                  product.images.length > 0 &&
                  product.images.map((thumbnail, thumbnailIndex) => (
                    <div
                      key={thumbnailIndex}
                      className="litteImagesItems"
                      onClick={() =>
                        setCurrentImage({ productIndex, thumbnailIndex })
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
              <div className="productName">
                <h2>{product.name}</h2>
              </div>
              <div className="productDescription">
                <p className="productDescriptionText">{product.description}</p>
              </div>
              <div className="priceContainer">{product.price} €/u</div>
              <div className="treadslistActual">
                <h2 className="treadListItemActual ">Proveedor</h2>
                <h2 className="treadListItemActual">Tipo de cuerda</h2>
                <h2 className="treadListItemActual">Color</h2>
                <h2 className="treadListItemActual">Diámetro</h2>
                <h2 className="treadListItemActual">Stock</h2>
              </div>
              {product.stock &&
                product.stock.length > 0 &&
                product.stock
                  .filter(
                    (item) =>
                      item.stock !== 0 &&
                      item.stock !== null &&
                      item.stock !== undefined
                  )
                  .map((item, index) => (
                    <div key={index} className="treadslistActual">
                      <h2 className="treadListItemActual">
                        {item.tread.provider.name}
                      </h2>
                      <h2 className="treadListItemActual">
                        {item.tread.treadType.name}
                      </h2>
                      <h2 className="treadListItemActual">
                        {item.tread.color.name}
                      </h2>
                      <h2 className="treadListItemActual">
                        {item.tread.diameter.diameter}
                      </h2>
                      <h2 className="treadListItemActual">{item.stock}</h2>
                      <p className="hidden">{item._id}</p>
                    </div>
                  ))}
              <div className="inputToStok">
                <button
                  className="btnRegister btnAdd modifyProduct "
                  onClick={() => {
                    setSelectedProduct(product);
                    setDeleteProduct(null);
                    setDeleteText('Eliminar');
                  }}
                >
                  Modificar
                </button>
                {deleteProduct && (
                  <input
                    type="text"
                    className="loginInput nameInput confirmDeleteInput"
                    placeholder={`Confirma nombre ${deleteProduct.name}`}
                    onChange={(e) => {
                      setConfirmDelete(e.target.value);
                    }}
                  />
                )}

                {confirmDeleteBtn && (
                  <button
                    className="btnRegister btnAdd modifyProduct "
                    onClick={() => {
                      setSelectedProduct(product);
                      setDeleteProduct(product);
                      setDeleteText("Eliminar");
                      setConfirDeleteBtn(false);
                      fnDeleteProduct();
                    }}
                  >
                    {deleteText}
                  </button>
                )}
              </div>

              {!deleteProduct &&
                selectedProduct &&
                selectedProduct._id &&
                selectedProduct._id !== "" && (
                  <div className="addToStock">
                    <div className="addStockContainer">
                      <div className="inputToStok">
                        <div className="modifyProduct">
                          <h2>MODIFICAR PRODUCTO</h2>
                        </div>

                        <div
                          className="btnRegister btnAdd modifyProduct"
                          onClick={() => {
                            fnAddToStock();
                          }}
                        >
                          GUARDAR
                        </div>
                        <div
                          className="btnRegister btnAdd modifyProduct"
                          onClick={() => {
                            setSelectedProduct({});
                            fnAddToStock();
                          }}
                        >
                          CANCELAR
                        </div>
                      </div>
                    </div>

                    <div className="treadsListContainer">
                      <div className="modifyProductData">
                        <input
                          className="loginInput nameInput"
                          placeholder={selectedProduct.name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        <input
                          className="loginInput nameInput"
                          placeholder={selectedProduct.price}
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                        <textarea
                          className="inputDescription"
                          placeholder={selectedProduct.description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>
                      <h2>INTRODUCIR A STOCK</h2>
                      <div className="treadslist">
                        <select
                          className="loginInput selectFilter"
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            fnFilterUpdate("provider", selectedValue);
                          }}
                        >
                          <option>Proveedor</option>
                          {arrProviders &&
                            arrProviders.length &&
                            arrProviders.map((item, index) => (
                              <option key={index}>{item}</option>
                            ))}
                        </select>
                        <select
                          className="loginInput selectFilter"
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            fnFilterUpdate("treadType", selectedValue);
                          }}
                        >
                          <option>Tipo de cuerda</option>
                          {arrTreadType &&
                            arrTreadType.length &&
                            arrTreadType.map((item, index) => (
                              <option key={index}>{item}</option>
                            ))}
                        </select>

                        <select
                          className="loginInput selectFilter"
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            fnFilterUpdate("color", selectedValue);
                          }}
                        >
                          <option>Color</option>
                          {arrColor &&
                            arrColor.length &&
                            arrColor.map((item, index) => (
                              <option key={index}>{item}</option>
                            ))}
                        </select>
                        <select
                          className="loginInput selectFilter"
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            fnFilterUpdate("diameter", selectedValue);
                          }}
                        >
                          <option>Diámetro</option>
                          {arrDiameter &&
                            arrDiameter.length &&
                            arrDiameter.map((item, index) => (
                              <option key={index}>{item}</option>
                            ))}
                        </select>
                      </div>
                      {treadsDataFiltered &&
                        treadsDataFiltered.length > 0 &&
                        treadsDataFiltered.map((item, index) => (
                          <div
                            key={index}
                            className="treadslist"
                            id="posibleItemList"
                          >
                            <h2 className="treadListItem ">
                              {item.provider.providerName}
                            </h2>
                            <h2 className="treadListItem ">
                              {item.treadType.treadTypeName}
                            </h2>
                            <h2 className="treadListItem ">
                              {item.color.colorName}
                            </h2>
                            <h2 className="treadListItem ">
                              {item.diameter.diameterDiameter}
                            </h2>
                            <p className="hidden">{item.id}</p>

                            <input
                              type="number"
                              className="treadListItem unitsInput unitsStockInput"
                              placeholder={item.units}
                            />
                            <button
                            className="btnRegister btnAdd modifyProduct"
                              onClick={() => {
                                const inputValue =
                                  document.getElementsByClassName(
                                    "unitsStockInput"
                                  );
                                fnChangeUnits(item.id, inputValue, index);
                                inputValue[index].value = "";
                              }}
                            >
                              Guardar
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        ))}

      <div>
        {/* <div className="stokTitle">
              <h2>stock</h2>
            </div> */}

        {arrStock &&
          arrStock.length > 0 &&
          arrStock.map((item, index) => (
            <div key={index} className="stockList">
              <p className="stokItem">{item.color}</p>
              <p className="stokUnits">{item.stock}</p>
              <button
                className="stokButton"
                onClick={() => {
                  removeItem(index);
                }}
              >
                Elminar
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
