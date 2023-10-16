import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import api from "../../Shared/API/api";
import zoomMas from "../../Images/iconos/zoomMas.png";
import zoomMenos from "../../Images/iconos/zoomMenos.png";
import flechaArriba from "../../Images/iconos/FlechaArriba.png";
import flechaAbajo from "../../Images/iconos/flechaAbajo.png";
import flechaDerecha from "../../Images/iconos/flechaDerecha.png";
import flechaIzquierda from "../../Images/iconos/flechaIzquierda.png";
import "./Colors.css";

const Colors = () => {
  const BASE_URL = "http://localhost:5000";

  const [colorData, setColorData] = useState([]);
  const [nameColor, setNameColor] = useState("");
  const [imagePositionX, setImagePositionX] = useState(0);
  const [imagePositionY, setImagePositionY] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [colorImage, setColorImage] = useState(null);
  const [imagePreUpload, setImagePreUpload] = useState(null);
  const [imageName, setImageName] = useState("");
  const [addImageVisible, setAddImageVisible] = useState(false);
  const [btnSaveVisible, setBtnSaveVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const canvasRef = useRef(null);

  <canvas
    ref={canvasRef}
    width={200}
    height={300}
    style={{ border: "3px solid black", objectFit: "contain" }}
  />;

  useEffect(() => {
    api.get("/colors").then((response) => {
      setColorData(response);
    });
  }, []);

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
      const scale = 0.8;
      html2canvas(imageToSave, { scale: scale }).then((canvas) => {
        const imageBase64 = canvas.toDataURL("image/png");
        setColorImage(imageBase64);
      });
      setImageName(imageToSave);
    }
  };

  useEffect(() => {
    if (nameColor) {
      setAddImageVisible(true);
    } else {
      setAddImageVisible(false);
    }
  }, [nameColor]);

  useEffect(() => {
    if (nameColor && imageName) {
      setBtnSaveVisible(true);
    } else {
      setBtnSaveVisible(false);
    }
  }, [nameColor, imageName]);

  const fnLoadImage = (e) => {
    const file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    setImagePreUpload(objectURL);
    const currentDate = new Date();
    const formatteDate = currentDate.toISOString().replace(/[-:]/g, "");
    const nameImage = `${nameColor}_${formatteDate}`;
    
  };
  
  const fnSaveDatabase = () => {
    const colorExists = colorData.some((color) => color.name === nameColor);
    if (!colorExists) {
      setErrorVisible(false);
      if (nameColor && imageName && colorImage) {
        const base64String = colorImage;
        const byteCharacters = atob(base64String.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });

        const formData = new FormData();
        formData.append("file", blob, `${imageName}.png`);

        api
          .postFormData("/images/colors/new/", formData)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        const objColor = {
          name: nameColor,
          image: imageName,
        };

        api
          .post("/colors/new", objColor)
          .then(() => {})
          .then(() => {
            api.get("/colors").then((response) => {
              setColorData(response);
            });
          })
          .catch((error) => {
            console.log(error);
          });

        setNameColor("");
        setColorImage(null);
      }
    } else {
      setErrorVisible(true);
    }
  };

  return (
    <div className="colorsManage">
      <div className="colorsTittle">
        <h1>COLORES</h1>
      </div>

      <div className="listImagesContainer">
        {colorData &&
          colorData.length > 0 &&
          colorData.map((item, index) => (
            <div key={index} className="name_image">
              <div className="listImageName">
                <p className="color_name">{item.name}</p>
              </div>
              <div className="listImageItem">
                <img
                  src={`http://localhost:5000/images/colors/${item.image}`}
                  alt="color"
                  className="listImageImage"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="newColorContainer">
        {errorVisible && <p className="error">El color ya existe</p>}

        <h2>CREAR COLOR</h2>
        <div className="nameCategory">
          <input
            placeholder="Nombre"
            className="loginInput nameInput upper"
            value={nameColor}
            onChange={(e) => {
              setNameColor(e.target.value);
            }}
          />
        </div>

        {addImageVisible && (
          <div className="">
            <div>
              <div className="chargeImageContainer">
                <input
                  type="file"
                  onChange={(e) => fnLoadImage(e)}
                  className="ChargeImages"
                />
              </div>

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
                </div>
                
              </div>
              <button onClick={() => {
                saveImage();
              }
              } className="btnSaveColorImage">
                SELECCIONAR IMAGEN
              </button>
            </div>
            <div className="">
              {colorImage && (
                <div className="colorImageContainer">
                  <img
                    src={colorImage}
                    alt="color"
                    className="colorImageItem"
                  />
                </div>
              )}
            </div>
            {btnSaveVisible && (
              <button
                className="btnColorSave"
                onClick={() => {
                  fnSaveDatabase();
                }}
              >
                GUARDAR
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Colors;
