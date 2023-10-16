import React, { useEffect, useState } from "react";
import "./Login.css";
import api from "../../Shared/API/api";
import {
  isMail,
  isCorrectPasword,
  confirmKeyGenerate,
} from "../../regularExpresions";
import { useNavigate } from "react-router-dom";

const Login = ({ isRegister, setIsRegister, setUserData }) => {
  const navigate = useNavigate();
  const [countdown, setCountDown] = useState(630); //630
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [confirmMailVisible, setConfirmMailVisible] = useState(false);
  const [confirmMailCode, setConfirmMailCode] = useState("");
  const [confirmCode, setConfirmCode] = useState(null);
  const [cookiesVisible, setCookiesVisible] = useState(true);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountDown(countdown - 1);
      }, 1000);
    } else {
      setConfirmMailVisible(false);
      navigateHome();
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const navigateHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (confirmMailCode === confirmCode) {
      const userData = {
        mail: mail,
        name: name,
        password: password,
      };
      api
        .post("/users/register", userData)
        .then((response) => {
          if (response.error) {
            setLoginError({ message: response.message });
          } else {
            const userData = {
              mail: mail,
              password: password,
            };

            api
              .post("/users/login", userData)
              .then((response) => {
                if (!response.error) {
                  setUserData(response);
                  navigate(-1);
                } else {
                  setLoginError({ message: response.message });
                }
              })
              .catch((error) => {
                console.log(error);
              });

            setMail("");
            setName("");
            setPassword("");
            setConfirmPassword("");
            setConfirmMailVisible(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [confirmMailCode]);

  const fnLogin = () => {
    const userData = {
      mail: mail,
      password: password,
    };

    api
      .login("/users/login", userData)
      .then((response) => {
        if (!response.error) {
          setUserData(response);
          navigate(-1);
        } else {
          setLoginError({ message: response.message });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateConfirmCode = async () => {
    const confirmCode = confirmKeyGenerate();
    setConfirmCode(confirmCode);
    return confirmCode;
  };
  const fnRegister = () => {
    const validMail = isMail(mail);
    const validPassword = isCorrectPasword(password);

    if (!validMail) {
      setLoginError({ message: "El mail no tiene un formato correcto" });
    }
    if (!validPassword) {
      setLoginError({
        message: "La contraseña no contiene un formato correcto",
      });
    }

    if (password !== confirmPassword && validMail && validPassword) {
      setLoginError({ message: "Las contraseñas no coinciden" });
    } else {
      const userData = {
        mail: mail,
        name: name,
        password: password,
      };

      const createMailData = async () => {
        const confirmCode = await generateConfirmCode();
        setConfirmCode(confirmCode);
        const mailData = {
          clientMail: mail,
          subject: "Confirmación de email",
          isRegister: true,
          isPurchase: false,
          key: confirmCode,
        };
        setConfirmMailVisible(true);
        return mailData;
      };

      createMailData().then((response) => {
        console.log(userData);
        console.log(response);
        sendMail(userData, response);
      });
    }

    const sendMail = (userData, mailData) => {
      api.post("/mail/send/", mailData);
      console.log(userData);
      console.log(mailData);
    };
  };
  return (
    <div className="loginContainer">
      {!isRegister ? (
        <div className="loginItemsContainer">
          <h1 className="loginTitle loginText">Iniciar Sesión</h1>
          {loginError && <h1>{loginError.message}</h1>}
          <input
            className="loginInput lower"
            placeholder="email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          <input
            className="loginInput"
            placeholder="contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            className=" btnRegister btnNavbar loginInput "
            onClick={() => {
              fnLogin();
              setLoginError(null);
              setMail("");
              setPassword("");
            }}
          >
            Entrar
          </div>
          <div className="loginOptions">¿Olvidaste la contraseña?</div>
          <div className=" loginOptions" onClick={() => setIsRegister(true)}>
            ¿Aún no estás registrado? REGÍSTRATE
          </div>
        </div>
      ) : (
        <div className="loginItemsContainer">
          <h1 className="loginTitle loginText">Regístrate</h1>
          {loginError && <h1>{loginError.message}</h1>}
          <div className="passwordConditions">
            <p>La contraseña debe tener mínimo 8 carácteres </p>
            <p>con 1 mayúscula, 1 minúsucla, 1 número y un carácter especial</p>
          </div>

          <input
            className="loginInput lower"
            placeholder="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <input
            className="loginInput upper"
            placeholder="nombre"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="loginInput"
            placeholder="contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input
            className="loginInput"
            placeholder="confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <div
            className="btnRegister btnNavbar loginInput"
            onClick={() => {
              fnRegister();
              setLoginError(null);
            }}
          >
            Registrar
          </div>
          {confirmMailVisible && (
            <div className="confirmPassword">
              <h1>Tienes en tu email un código de confirmación a tu email</h1>
              <h2>no te olvides de mirar en la carpeta de spam</h2>
              <p>
                Tiempo restante: {Math.floor(countdown / 60)}:
                {countdown % 60 < 10 ? "0" : ""}
                {countdown % 60}
              </p>
              <input
                type="text"
                className="inputCode"
                placeholder="Introduce tu código"
                value={confirmMailCode}
                onChange={(e) => {
                  setConfirmMailCode(e.target.value);
                }}
                maxLength={6}
              />
            </div>
          )}
        </div>
      )}

      {cookiesVisible && (
        <div className="cookies">
          <div className="cookiesText">
            <p>
              Las COOKIES que utilizamos en esta página, són solo para su óptimo
              funcionamiento, en ningún caso para fines publicitarios o de
              monitorización.
            </p>
          </div>
          <div>
            <button
              className="cookiesBtn"
              onClick={() => {
                setCookiesVisible(false);
              }}
            >
              ACEPTAR COOKIES
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
