import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import theme from "../../shared/util/Theme";

const blink = keyframes`
  50% {
    background-color: ${theme.neutral_20};
  }
`;

const Center = styled.div`
  position: relative;

  .ai_robot {
    @media screen and (max-width: 768px) {
      position: relative;
      width: 263.8px;
      height: 202.72px;
      top: 230px;
      left: 15px;
      right: 19.1px;
    }
    position: absolute;
    width: 377px;
    height: 289.61px;
    top: 252px;
    // left: 596px;
  }

  .description {
    @media screen and (max-width: 768px) {
      position: absolute;

      left: 50;
      top: 500px;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 144%;
      text-align: center;
    }
    position: relative;
    top: 638px;
    // left: 586px;

    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%;
    text-align: center;
  }

  .theme_color {
    color: ${theme.primary_100};
  }

  .loading_dots {
    @media screen and (max-width: 768px) {
      position: absolute;
      top: 460px;
      right: 125px;

      height: 12px;
    }
    position: absolute;
    display: flex;
    justify-content: space-between;
    top: 600px;
    // left: 694px;
    right: 98px;
    text-align: center;
  }

  .loader__dot {
    animation: ${blink} 1s infinite;
    text-align: center;
    width: 12px;
    height: 12px;
    background-color: ${theme.primary_100};
    border-radius: 50%;
    margin: 0 5px;
  }

  .loader__dot:nth-child(2) {
    animation-delay: 230ms;
  }

  .loader__dot:nth-child(3) {
    animation-delay: 480ms;
  }
`;

const Div = styled.div`
  position: relative;

  .b_star1 {
    @media screen and (max-width: 768px) {
      position: relative;
      width: 48.54px;
      height: 48.54px;
      top: 168px;
      left: 55px;
    }
    position: absolute;
    // left: 402px;
    right: 94.94px;
    top: 174px;
    width: 99.07px;
    height: 99.07px;
  }

  .p_star {
    @media screen and (max-width: 768px) {
      position: absolute;
      width: 65.58px;
      height: 65.58px;
      top: 195px;
      left: 3px;
    }
    position: absolute;
    top: 240px;
    // left: 314px;
    right: 148.17px;
    width: 133.83px;
    height: 133.83px;
  }

  .ai {
    @media screen and (max-width: 768px) {
      position: absolute;
      width: 85.81px;
      height: 40.25px;
      top: 298px;
      left: -26px;
      transform: rotate(-23.53deg);
    }
    position: absolute;
    top: 462px;
    // left: 327px;
    right: 75.64px;
    transform: rotate(-23.53deg);
    width: 175.13px;
    height: 82.15px;
  }

  .b_star2 {
    @media screen and (max-width: 768px) {
      display: none;
    }
    position: absolute;
    left: 399px;
    top: 530px;
    width: 86px;
    height: 86px;
  }

  .bad {
    @media screen and (max-width: 768px) {
      position: absolute;
      width: 96.644px;
      height: 29.47px;
      top: 72px;
      left: 133px;
      transform: rotate(-19.72deg);
    }
    position: absolute;
    top: 182px;
    left: 212.58px;
    width: 197.23px;
    height: 60.16px;
    transform: rotate(-19.72deg);
  }

  .great {
    @media screen and (max-width: 768px) {
      position: absolute;
      width: 94.764px;
      height: 35px;
      top: 113px;
      left: 192px;
      transform: rotate(30.254deg);
    }
    width: 193.4px;
    height: 60px;
    position: absolute;
    top: 265px;
    left: 305px;
    right: 308.06px;
    transform: rotate(30.85deg);
  }
`;

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 렌더링 시 맨 위로 스크롤
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Div>
        <img
          src="/img/loading/BlueStar.png"
          alt="BlueStar"
          className="b_star1"
        />
        <img
          src="/img/loading/PinkStar.png"
          alt="PinkStar"
          className="p_star"
        />
        <img src="/img/loading/AI.png" alt="AI" className="ai" />
      </Div>

      <Div>
        <img src="/img/loading/Bad.png" alt="Bad" className="bad" />

        <img src="/img/loading/Great.png" alt="Great" className="great" />

        <img
          src="/img/loading/BlueStar.png"
          alt="BlueStar"
          className="b_star2"
        />
      </Div>
      <Center>
        <img
          src="/img/loading/AILoading.png"
          alt="AILoading"
          className="ai_robot"
        />

        {loading ? (
          <div className="loading_dots">
            <div className="loader__dot"></div>
            <div className="loader__dot"></div>
            <div className="loader__dot"></div>
          </div>
        ) : (
          <div>error</div>
        )}

        <div className="description">
          <span className="theme_color">AI</span>가{" "}
          <span className="theme_color">등급을 측정중</span>입니다.
        </div>
      </Center>
    </div>
  );
};

export default Loading;
