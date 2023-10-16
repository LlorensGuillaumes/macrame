import React from "react";
import "./Title.css";
import headboard from "../../Images/headboard.png";

const Title = () => {
  return (
    <div className="titleContain" >
      <div className="headboardContain" id="title">
        <img className="headboard" src={headboard} alt="logo"></img>
      </div>
    </div>
  );
};

export default Title;
