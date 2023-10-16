import React from "react";
import "./TreadsExplain.css";
import { useNavigate } from "react-router-dom";
import trenzada from "../../Images/TreadsExplain/trenzada.jpg";
import urdimbre from "../../Images/TreadsExplain/urdimbre.png";
import torcida from "../../Images/TreadsExplain/torcida.jpg";
import encerada from "../../Images/TreadsExplain/encerada.jpg";
import exterior from '../../Images/TreadsExplain/exterior.jpg'

const TreadsExplain = () => {
  const navigate = useNavigate();
  return (
    <div className="historyContainer">
      <h1>TIPOS DE CUERDA</h1>

      <section className="historySection">
        <p className="historyText">
          Todos los productos de es_cotton.macramé están realizadoc con cuerdas
          ecológicas, materiales reciclados y dismponen de cerificado{" "}
          <a href="https://www.oeko-tex.com/en/" target="_blank">
            Oeko-Tex
          </a>
          . Estos productos miran por el tratamiento de los resíduos, por una
          buena fabricación y por el conjunto del planeta; ya que este
          certificado garantiza que no contiene ninguna sustancia nociva para la
          salud humana, incluidos los requisitos para bebés y medio ambiente.
        </p>
        <h1>CUERDA TORCIDA DE ALGODÓN</h1>
        <p className="historyText">
          La cuerda torciada es la tradicionalmente usada en la técnica del
          Macramé. Se produce torciendo tres hebras en espiral. Es una cuerda no
          elástica, con bastante peso pero muy resistente y fuerte.
        </p>

        <div className="treadExplainImageContainer">
          <img src={torcida} alt="torcida" className="treadExplainImage" />
        </div>

        <h1>CUERDA PEINADA O URDIMBRE DE ALGODÓN</h1>
        <p className="historyText">
          La cuerda peinada, también llamada Urdimbre, se produce torciendo
          hilos de algodón en una sola hebra. Es una cuerda no flexible, exta
          suave y ligera. Es ideal para flecos o plumas.
        </p>

        <div className="treadExplainImageContainer">
          <img src={urdimbre} alt="urdimbre" className="treadExplainImage" />
        </div>

        <h1>CUERDA TRENZADA DE ALGODÓN</h1>
        <p className="historyText">
          La cuerda torcida de algodón tiene un núcleo de hilo de algodón que
          hace que mantenga su forma. Es una cuerda ligera y un poco elástica,
          que no se puede deshilachar.
        </p>
        <div className="treadExplainImageContainer">
          <img src={trenzada} alt="trenzada" className="treadExplainImage" />
        </div>

        <h1>CUERDA DE ALGODÓN ENCERADO</h1>
        <p className="historyText">
          La cuerda de algodón encerado contiene una hebra encerada por
          inmersión, por lo que el hilo queda prensado, por lo que mantiene su
          aspecto mate. Es una cuerda rígida y fuerte, perfecta para pequeños
          nudos como los que se realizan en bisutería.
        </p>
        <div className="treadExplainImageContainer">
          <img src={encerada} alt="encerada" className="treadExplainImage" />
        </div>
        <h1>CUERDA TORCIDA DE EXTERIOR</h1>
        <p className="historyText">
          La cuerda torcida de exterior se compone 100% TASLASN PP, que es un
          polipropileno reciclado. Es una cuerda que permite realizar trabajos
          de Macramé outdour ya que soporta el sol, la humedad y la lluvia.
        </p>

        <div className="treadExplainImageContainer">
          <img src={exterior} alt="exterior" className="treadExplainImage" />
        </div>
      </section>
      <button
        className="btnAddCart end"
        onClick={() => {
          navigate(-1);
        }}
      >
        VOLVER
      </button>
    </div>
  );
};

export default TreadsExplain;
