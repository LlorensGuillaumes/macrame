import React, { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [productsMenuVisible, setProductsMenuVisible] = useState(false);
  const [colorsMenuVisible, setColorsMenuVisible] = useState(false);
  const [categoriesVisible, setCatgoriesVisible] = useState(false);
  return (
    <div>
      <h2
        className="btnNavbar btnRegister"
        onClick={() => {
          setProductsMenuVisible(!productsMenuVisible);
        }}
      >
        Productos
      </h2>

      {productsMenuVisible && (
        <div>
          <p
            className="btnNavbar"
            onClick={() => {
              navigate("/new_product");
            }}
          >
            Crear
          </p>
          <p className="btnNavbar">Modificar</p>
        </div>
      )}
      <h2
        className="btnNavbar btnRegister"
        onClick={() => {
          setColorsMenuVisible(!colorsMenuVisible);
        }}
      >
        Colores
      </h2>
      {colorsMenuVisible && <p className="btnNavbar">Gestinonar</p>}
      <h2
        className="btnNavbar btnRegister"
        onClick={() => {
          setCatgoriesVisible(!categoriesVisible);
        }}
      >
        Grupos
      </h2>
      {categoriesVisible &&    <p
            className="btnNavbar"
            onClick={() => {
              navigate("/categories");
            }}
          >
            Gestionar
          </p>}
    </div>
  );
};

export default Admin;
