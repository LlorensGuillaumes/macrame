import React from "react";
import "./AboutMe.css";
import imagen from "../../Images/aboutMe/foto.jpg";
import foto from "../../Images/iconos/user.png"
import { useNavigate } from "react-router-dom";

const AboutMe = () => {
const navigate = useNavigate();
return (
<div className="historyContainer">
    <h1>¿QUIÉN SOY?</h1>

    <section className="historySection">
    <div className="myImage">
        <img src={foto} alt="foto" className="tapiz" />
    </div>
    <p className="historyText">Hola, soy Esther!</p>
    <p className="historyText">
        Soy una óptica y optometrista👓 amante de su profesión, y disfruto de
        ella cada día. Aún así, me encanta sacar tiempo para mis aficiones,
        aquellas que le dan salsa a mi vida.💃
    </p>
    <p className="historyText">
        Me encanta la naturaleza, el senderismo y viajar. Si no me
        encuentras... andando por algún lugar del mundo estoy🗻. Jaja! Ya sea
        un Camino de Santiago o caminar de casa a Andorra, como se
        cachondea mi mejor amiga.
    </p>
    <p className="historyText">
        Mi familia... que decir, tienen todo mi corazón❤️️. En casa y en mi
        camino, me acompañan cuatro maravillosos seres vivos. Mi pareja Joan,
        el peque Marc y mis dos niñas peludas Mel y Mi🐶🐶.
    </p>
    <p className="historyText">
        ¿Y el Macramé qué? Tranquilos que no me olvido, sin él no sería yo. Ya
        de peque como a todos, me tocó hacer una manualidad de Macramé y ahí
        me enamoré. Recuerdo con gran cariño esa cortina de mi casa hecha por
        mi, pero con unos colores... verde y amarilla 😅. Ya os lo podéis
        imaginar, suerte que mis padres les pudo más el amor y la colgaron en
        la puerta al lavadero.
    </p>

    <p className="historyText">
        Tardé mucho en reencontrarme con el Macramé, pero me alegro tanto de
        haberlo retomado, no os lo podéis ni imaginar. Se convirtió en mi
        afición, en mi terapia y mi pasión.
    </p>
    <p className="historyText">
        A día de hoy, sigo Anudando. No concibo mi día sin un ratito de
        Macramé. ¿Os he hablado de la Nudoterpia? Anudar ayuda a despejar la
        mente, a fortalecer la espalda e incluso ayuda a la concentración y la
        creatividad.
    </p>
    <p className="historyText">
        Bueno, ya sabéis un poquito más de mi; ahora, ¿nos ponemos manos a la
        "obra"👐 ?
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

export default AboutMe;
