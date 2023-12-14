import React from "react";
import theme from "../util/Theme";
import styled from "styled-components";

const LaptopRankCard = (props) => {
  const Container = styled.div`
    border-radius: 10.78px;
    border: 2.16px solid ${theme.primary_80};
    background-color: ${theme.primary_20};
    position: relative;

    background-image: url(${props.img});
    background-size: cover; /* 이미지를 컨테이너에 맞게 조절 */
    background-position: center; /* 이미지를 가운데 정렬 */

    .laptop_img {
      @media screen and (max-width: 768px) {
        width: 244px;
        height: 186px;
      }
      width: 292px;
      height: 223px;
      position: absolute;
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
  return (
    <Container className={`${props.className}`}>
      {/* <img src={props.img} alt={props.alt} className={"laptop_img"} /> */}
      <img
        src={`/img/result/${props.rank}.png`}
        alt={`rank ${props.rank}`}
        className="rank_img"
      />
      {props.children}
    </Container>
  );
};

export default LaptopRankCard;
