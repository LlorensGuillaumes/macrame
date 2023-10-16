import React from "react";
import "./History.css";
import toallas from "../../Images/WhatsIs/toallas2.png";
import tapiz from "../../Images/WhatsIs/tapiz.png";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  return (
    <div className="historyContainer">
      <h1>¿QUÉ ES EL MACRAMÉ?</h1>

      <section className="historySection">
        <p className="historyText">
          El macramé es una técnica artesanal que consiste en crear tejidos con
          nudos decorativos, realizados única y exclusivamente con las manos y
          usando cordones e hilos de distintos materiales, tales cómo el
          algodón, el yute, el lino, la seda u otras fibras. Con esta técnica se
          pueden realizar desde pequeñas piezas como llaveros hasta grandes
          trabajos como hamacas, cortinas, biombos...Pero, ¿cúal es su origen?
        </p>
        <p className="historyText">
          En realidad, el macramé se remonta al mesolítico, donde la necesidad
          da a lugar a anudar con fibras vegetales para crear flechas o lanzas.
          Más tarde, se perfeccionaría la técnica para la actividad pesquera. La
          red más antigua encontrada data del 9000 a.C. y estaba hecha de sauce.
        </p>
        <p className="historyText">
          Y como no, el macramé acabaría siendo hacia el 8000 a.C., una de las
          primeras técnicas de confección textil, mucho antes de la aparición de
          los telares que fué uno de los grandes inventos del neolítico junto la
          rueda.
        </p>

        <div className="text_image">
          <p className="historyText withImage">
            Es curioso como la necesidad de cubrir necesidades básicas, dió a
            que en diferentes lugares de la Tierra se llegara a esta técnica.
            Muchas civilizaciones dotaron de significado i misticismo a estos
            nudos, dándoles indentidad própia como manifestaciones culturales.
            Por eso, encontramos nudos celtas, chinos, japoneses...
          </p>
          <div className="historyImageContainer">
            <img src={toallas} alt="Toallas" className="historyImage" />
          </div>
        </div>

        <h1 className="historyText subTitle" >
          Entonces, ¿Cuándo surge el Macramé tal y como lo conocemos ahora?
          </h1>
        <p className="historyText">
          El Macramé tal y como lo conocemos en el día de hoy, se remonta a
          Mesopotamia, hacia el 2300 a.C., en los pueblos Sírios y Persas. Éstos
          anudaron con el fin de decorar los bordes de los tapetes. Se dice, que
          probablemente de allí surja la primera denominación de esta técnica,
          de la palabra árabe <em>migramah (flecos anudados)</em>, que es
          anterior a la palabra turca <em>makrama</em>, y a la palabra francesa{" "}
          <em>Macramé</em>.
        </p>
        <p className="historyText">
          Los pueblos árabes, en el s.VIII, le dieron relevancia al Macramé por
          su grand destreza artística. En la antigua Turquía, los tejedores
          solian adornar los bordes de toallas y manteles.
        </p>

        <p className="historyText">
          Posteriormente, el Macramé se hizo conocido desde el Medio Oriente a
          toda la Europa Mediterránea, especialmente a España, donde fué muy
          popular a partir de s.XV, teniendo especial valor artístico durante el
          Renacimiento. Más tarde se propagaría por toda Europa y desde Europa
          llegaría a América a través de los viajes y el intercambio comercial.
        </p>
        <div className="historyTapizContainer">
        <img src={tapiz} alt="tapiz" className="tapiz"/>
        </div>
        <p className="historyText">
          Bueno, ahora ya sabeis porque soy una enamorada del Macramé. Por su
          historia, por su cultura, porque nos remonta al humano más primitivo.
          Todos ANUDAMOS, desde el pescador al cirujano, desde la costurera al
          alpinista, desde el carnicero al lutier.
        </p>
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

export default History;
