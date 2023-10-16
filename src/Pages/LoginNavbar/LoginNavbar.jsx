import React, { useEffect, useState } from "react";
import "./LoginNavbar.css";
import { useNavigate } from "react-router-dom";
import user from "../../Images/iconos/user.png";
import opciones from "../../Images/iconos/opciones.png";
import instagram from "../../Images/iconos/instagram.png";
import api from "../../Shared/API/api";

const LoginNavbar = ({ setIsRegister, userData, setUserData }) => {
  const navigate = useNavigate();
  const [userOptionsVisible, setUserOptionsVisible] = useState(false);

  const fnRegister = () => {
    setIsRegister(true);
    navigate("/login");
  };
  const fnLogin = () => {
    setIsRegister(false);
    navigate("/login");
  };
  const fnLogOut = () => {
    api
      .post('/session/logout')
      .then((response)=>{
        console.log(response)
        setUserData(null)
      })
    navigate("/");
  };

  return (
    <div>
      {!userData ? (
        <div className="LoginNavbarContainer">
          <a
            href="https://www.instagram.com/es_cotton.macrame"
            target="_blank"
            rel="noreferrer"
          >
            <div className="socialNetworksItemContain">
              <img
                src={instagram}
                alt="Instagram"
                className="socialNetworksItem"
              />
            </div>
          </a>
          <div className="iconNavBarContainer" title="Iniciar sesión">
            <img
              src={user}
              alt="iconoUser"
              className="iconNavBar"
              onClick={() => {
                fnLogin();
              }}
            />
          </div>
          <div className="btnNavbar marginRight">
            <div
              className="btnRegister"
              onClick={() => {
                fnRegister();
              }}
            >
              Regístrate
            </div>
          </div>
        </div>
      ) : (
        <div className="LoginNavbarContainer">
        <a
            href="https://www.instagram.com/es_cotton.macrame"
            target="_blank"
            rel="noreferrer"
          >
            <div className="socialNetworksItemContain">
              <img
                src={instagram}
                alt="Instagram"
                className="socialNetworksItem"
              />
            </div>
          </a>
          <div
            className="btnNavbar marginRight userOptions"
            onClick={() => {
              setUserOptionsVisible(!userOptionsVisible);
            }}
          >
            <div className="btnRegister">
              {userData.name}
              <div className="btnOpciones">
                <img
                  src={opciones}
                  alt="opciones"
                  className="btnOpcionesImage"
                />
              </div>
              {userOptionsVisible && (
                <div className="userOptionsList">
                  <ul>
                    <li onClick={() => {
                      setUserOptionsVisible(false);
                      navigate('/my_profile')
                    }}>Mi perfil</li>
                    <li
                      onClick={() => {
                        setUserData(null);
                        setUserOptionsVisible(false);
                        fnLogOut();
                      }}
                    >
                      Cerrar sesión
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginNavbar;
