import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "./NewProduct.css";
import api from "../../Shared/API/api";
import zoomMas from "../../Images/iconos/zoomMas.png";
import zoomMenos from "../../Images/iconos/zoomMenos.png";
import flechaArriba from "../../Images/iconos/FlechaArriba.png";
import flechaAbajo from "../../Images/iconos/flechaAbajo.png";
import flechaDerecha from "../../Images/iconos/flechaDerecha.png";
import flechaIzquierda from "../../Images/iconos/flechaIzquierda.png";
import Products from "../Products/Products";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [family, setFamily] = useState("");

  const [imagePositionX, setImagePositionX] = useState(0);
  const [imagePositionY, setImagePositionY] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [arrImages, setArrImages] = useState([]);
  const [imagePreUpload, setImagePreUpload] = useState(null);
  const [familiData, setFamilyData] = useState([]);
  const [treadsData, setTreadsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newProductVisible, setNewProductVisible] = useState(false);
  const [productsSettingVisible, setProductsSettingVisible] = useState(false);

  const canvasRef = useRef(null);

  <canvas
    ref={canvasRef}
    width={200}
    height={300}
    style={{ border: "3px solid black", objectFit: "contain" }}
  />;

  const moveImage = (position) => {
    switch (position) {
      case "left":
        setImagePositionX(imagePositionX - 10);
        break;
      case "right":
        setImagePositionX(imagePositionX + 10);
        break;
      case "top":
        setImagePositionY(imagePositionY - 10);
        break;
      case "down":
        setImagePositionY(imagePositionY + 10);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    api
      .get("/families/")
      .then((response) => {
        response.sort((a, b) => {
          const lowA = a.group.toLowerCase();
          const lowB = b.group.toLowerCase();

          if (lowA < lowB) {
            return -1;
          }

          if (lowA > lowB) {
            return 1;
          }
          return 0;
        });
        setFamilyData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/treads/")
      .then((response) => {
        setTreadsData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = imagePreUpload;
    image.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          image,
          imagePositionX,
          imagePositionY,
          220 / imageScale,
          300 / imageScale
        );
      }
    };
  }, [imagePreUpload, imagePositionX, imagePositionY, imageScale]);

  const saveImage = () => {
    const imageToSave = document.getElementById("formatImage");
    if (imageToSave) {
      const scale = 2;
      html2canvas(imageToSave, { scale: scale }).then((canvas) => {
        const imageBase64 = canvas.toDataURL("image/png");
        setArrImages((prevImages) => [...prevImages, imageBase64]);
      });
    }
  };

  const fnLoadImage = (e) => {
    const file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setImagePreUpload(objectURL);
  };

  const fnSaveProduct = () => {
    const arrImagesNames = [];

    for (const image of arrImages) {
      const base64String = image;
      const byteCharacters = atob(base64String.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      const currentDate = new Date();
      const formatteDate = currentDate.toISOString().replace(/[-:]/g, "");
      const nameImage = `${name}_${formatteDate}.png`;
      arrImagesNames.push(nameImage);
      const formData = new FormData();
      formData.append("file", blob, nameImage);

      api
        .postFormData("/images/products/new", formData)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const objectToSend = {
      name: name,
      description: description,
      price: price,
      group: family,
      images: arrImagesNames,
    };

    api
      .post("/products/new", objectToSend)
      .then((response) => {
        setSelectedProduct(response);
        setNewProductVisible(false);
        setProductsSettingVisible(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="productsTitle">
        <h1>PRODUCTOS</h1>
      </div>

      <div className="navbarContainerLeftButons">
        <div
          className="btnNavbar btnRegister navProducts"
          onClick={() => {
            setNewProductVisible(true);
            setProductsSettingVisible(false);
          }}
        >
          CREAR
        </div>
        <div
          className="btnNavbar btnRegister navProducts"
          onClick={() => {
            setNewProductVisible(false);
            setProductsSettingVisible(true);
          }}
        >
          GESTIONAR
        </div>
      </div>
      {newProductVisible && (
        <div className="newProductContainer">
          <h1 className="subTitle">NUEVO PRODUCTO</h1>
          <div className="inputProduct">
            <div className="inputData">
              <div className="nameCategory">
                <select
                  placeholder="Grupo"
                  className="loginInput selectCategory"
                  onChange={(e) => {
                    setFamily(e.target.value);
                  }}
                >
                  <option>Família</option>
                  {familiData &&
                    familiData.length > 0 &&
                    familiData.map((item, index) => (
                      <option key={index}>{item.group}</option>
                    ))}
                </select>
              </div>
              <div className="nameCategory">
                <input
                  placeholder="Nombre"
                  className="loginInput nameInput upper"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="nameCategory">
                <input
                  placeholder="Precio"
                  className="loginInput nameInput"
                  onChange={(e) => {
                    setPrice(e.target.value); 
                  }}
                />
              </div>
              <div className="nameCategory">
                <textarea
                  placeholder="Descripción"
                  className="inputDescription lower"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="imputSelectImage">
              <div className="preSelectImage">
                <div className="formatImage" id="formatImage">
                  {imagePreUpload && (
                    <img
                      className="prova"
                      src={imagePreUpload}
                      alt="prova"
                      style={{
                        transform: `translate(${imagePositionX}px, ${imagePositionY}px) scale(${imageScale})`,
                      }}
                    />
                  )}
                </div>
                <div className="btnFormatImageContainer">
                  <button
                    className="btnFormatImage"
                    onClick={() => {
                      setImageScale(imageScale + 0.1);
                    }}
                  >
                    <img src={zoomMas} alt="zomm Mas" className="iconoImagen" />
                  </button>
                  <button
                    className="btnFormatImage"
                    onClick={() => {
                      setImageScale(imageScale - 0.1);
                    }}
                  >
                    <img
                      src={zoomMenos}
                      alt="zoom Menos"
                      className="iconoImagen"
                    />
                  </button>
                  <button
                    onClick={() => moveImage("left")}
                    className="btnFormatImage"
                  >
                    <img
                      src={flechaIzquierda}
                      alt="zoom Menos"
                      className="iconoImagen"
                    />
                  </button>
                  <button
                    onClick={() => moveImage("right")}
                    className="btnFormatImage"
                  >
                    <img
                      src={flechaDerecha}
                      alt="zoom Menos"
                      className="iconoImagen"
                    />
                  </button>
                  <button
                    onClick={() => moveImage("top")}
                    className="btnFormatImage"
                  >
                    <img
                      src={flechaArriba}
                      alt="zoom Menos"
                      className="iconoImagen"
                    />
                  </button>
                  <button
                    onClick={() => moveImage("down")}
                    className="btnFormatImage"
                  >
                    <img
                      src={flechaAbajo}
                      alt="zoom Menos"
                      className="iconoImagen"
                    />
                  </button>
                  <button onClick={() => saveImage()} className="btnImageSave">
                    GUARDAR IMAGEN
                  </button>
                </div>
              </div>
              <div className="chargeImageContainer">
                <input
                  type="file"
                  onChange={(e) => fnLoadImage(e)}
                  className="ChargeImages"
                />
              </div>
            </div>
          </div>

          <div className="imagesListContainer">
            {arrImages &&
              arrImages.map((image, index) => (
                <div key={index} className="imagePreSave">
                  <img src={image} alt={index} className="littleImagesImage" />
                </div>
              ))}
          </div>

          <div
            className="btnRegister"
            onClick={() => {
              fnSaveProduct();
            }}
          >
            Grabar producto
          </div>
        </div>
      )}

      {productsSettingVisible && (
        <div className="newProductContainer">
          <h1 className="subTitle"> GESTIONAR</h1>

          <Products
            treadsData={treadsData}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
      )}
    </div>
  );
};

export default NewProduct;
