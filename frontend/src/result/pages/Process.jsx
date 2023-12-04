import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Process.module.css";
import PageTitle from "../../shared/Pagetitle/Pagetitle";
import LaptopRankCard from "../../shared/Laptop/LaptopRankCard";
import Button from "../../shared/UIElements/Button";

const Process = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 렌더링 시 맨 위로 스크롤
  }, []);

  const navigate = useNavigate();

  const imageNames = ["Step1.png", "Step2.png", "Step3.png", "Step4.png", "Step5.png"];

  const location = useLocation();
  const { totalRank, frontImage } = location.state;

  return (
    <div className={styles.container}>
      <PageTitle title={"진행 상황"} className={styles.title}>
        내 노트북의 등급 측정 상황
      </PageTitle>

      <div className={styles.modelContainer}>
        <LaptopRankCard img={frontImage} rank={`rank_${totalRank}`} className={styles.rankcard} imgStyle={{ width: "290px", height: "174px" }} />
        <p className={styles.model_title}>맥북 에어</p>
        <p className={styles.model_description}>
          모델명: NT950XBE-X716A <br /> 등록일: 2023. 09. 08
        </p>
      </div>

      <img src="/img/process/robot.png" alt="robot" className={styles.robot}></img>
      <div className={styles.company_name}>(주)도구모음</div>
      <div className={styles.company_address}>서울특별시 강남구 봉은사로454 (금탁타워) 2층</div>

      <div className={styles.process_container}>
        {imageNames.map((imageName, index) => (
          // 이미지 파일 이름을 사용하여 이미지 태그를 동적으로 생성
          <div key={imageName}>
            <img src={`/img/process/${imageName}`} alt={`StepImage ${index + 1}`} className={`${index >= 2 ? styles.grayscale : ""} ${styles.step_img}`} />
            {index === imageNames.length - 1 ? null : (
              <img src="/img/process/arrow.png" alt={`StepArrow`} className={`${index >= 2 ? styles.grayscale : ""} ${styles.arrow}`} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.button_group}>
        <Button active={false} className={styles.prev_btn} onClick={() => navigate("/purchaseform")}>
          이전으로
        </Button>
        <Button active={true} className={styles.prev_btn} onClick={() => navigate("/main/rating")}>
          다른 노트북 보기
        </Button>
      </div>
    </div>
  );
};

export default Process;
