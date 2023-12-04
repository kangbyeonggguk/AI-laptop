import React from "react";
import Pagetitle from "../../shared/Pagetitle/Pagetitle";
import "./Ratingsystem.css";
import Ratinginfo from "../components/Ratinginfo";

const Ratingsystem = () => {
  return (
    <div className="ratingsystem">
      <Pagetitle title="등급제">
        파손 부위 별로 등급을 판단할 수 있어요
      </Pagetitle>
      <div className="mobile-contain">
        <div className="ratingsystem_ratingcontain ">
          <Ratinginfo
            color="#759CFF"
            backgroundColor="#F0F4FF"
            percent="5"
            fontcolor="#759CFF"
            rating="SS"
          />
          <Ratinginfo
            color="#759CFF"
            backgroundColor="#759CFF"
            percent="10"
            fontcolor="#ffffff"
            rating="S"
          />
          <Ratinginfo
            color="#FFC806"
            backgroundColor="#FFC806"
            percent="30"
            fontcolor="#ffffff"
            rating="A"
          />
          <Ratinginfo
            color="#B3B3B3"
            backgroundColor="#B3B3B3"
            percent="50"
            fontcolor="#ffffff"
            rating="B"
          />
          <Ratinginfo
            color="#DDCC93"
            backgroundColor="#DDCC93"
            percent="70"
            fontcolor="#ffffff"
            rating="C"
          />
        </div>
      </div>
      <img
        className="ratingsystem_image"
        src="/img/Ratingsystem/RankSS.png"
        alt="rankssimage"
      ></img>
    </div>
  );
};

export default Ratingsystem;
