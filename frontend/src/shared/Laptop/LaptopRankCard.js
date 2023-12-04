import React from "react";
import theme from "../util/Theme";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 10.78px;
  border: 2.16px solid ${theme.primary_80};
  background-color: ${theme.primary_20};
  position: relative;

  .laptop_img {
    @media screen and (max-width: 768px) {
      width: 242px;
      height: 145px;
    }
    position: absolute;
    width: 411.65px;
    height: 314.67px;
    top: 50%;
    left: 50%;
    border-radius: 10.78px;
    transform: translate(-50%, -50%);
  }

  .rank_img {
    @media screen and (max-width: 768px) {
      width: 56px;
      height: 56px;
    }
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }
`;

const LaptopRankCard = (props) => {
  return (
    <Container className={`${props.className}`}>
      <img src={props.img} alt={props.alt} className="laptop_img" />
      <img src={`/img/result/${props.rank}.png`} alt={`rank ${props.rank}`} className="rank_img" />
      {props.children}
    </Container>
  );
};

export default LaptopRankCard;
