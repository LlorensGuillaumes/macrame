import React, { useEffect, useState } from "react";
import "./MailForm.css";
import api from "../../Shared/API/api";
import { useNavigate } from "react-router-dom";
import { isMail } from "../../regularExpresions";
const MailForm = (userData) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [mail, setMail] = useState("");
  const [error, setError] = useState(false);
  const [messageSend, setMessageSend] = useState(false);

  useEffect(() => {
    if (userData.userData) {
      setMail(userData.userData.mail);
    }
  }, [userData]);

  const fnEnviar = () => {
    setError(false);

    if (
      mail === "" ||
      subject === "" ||
      text === "" ||
      !mail ||
      !subject ||
      !text ||
      !isMail(mail)
    ) {
      setError(true);
    } else {
      const mailData = {
        clientMail: mail,
        subject: subject,
        isRegister: false,
        isPurchase: false,
        text: text,
      };

      api
        .post("/mail/send/", mailData)
        .then((response) => {
          if (!response.error) {
            setMessageSend(true);
          }
          setSubject("");
          setText("");
          if (userData.userData.mail) {
            setMail(userData.userData.mail);
          } else {
            setMail("");
          }
        })
        .catch((error) => {
          console.error("Error al enviar el correo electrónico:", error);
        });
    }
  };

  return (
    <div className="newProductContainer">
      <h1>CONTACTAR</h1>
      {error && (
        <p className="error mailError">Todos los campos son obligatorios y el mail debe tener un formato correcto</p>
      )}

      <div className="mailItems">
        <input
          placeholder="Mi email"
          className="loginInput nameInput"
          value={mail}
          readOnly={userData.userData ? true : false}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />

        <input
          placeholder="Asunto"
          className="loginInput nameInput"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <textarea
          placeholder="Mensaje"
          className="inputDescription"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <button
          className="btnImageSave btnSendMail"
          onClick={() => {
            fnEnviar();
          }}
        >
          ENVIAR
        </button>
        {messageSend && (
          <div className="mailSend">
            <h1>Gracias por contactar conmigo</h1>
            <h3>Me pondré en contacto contigo lo antes posible</h3>

            <button
              className="btnClosePopUp"
              onClick={() => {
                setMessageSend(false);
                navigate("/");
              }}
            >
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailForm;
