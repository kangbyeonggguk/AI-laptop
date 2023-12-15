import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import styles from "./Process.module.css";
import PageTitle from "../../shared/Pagetitle/Pagetitle";
import LaptopRankCard from "../../shared/Laptop/LaptopRankCard";
import Button from "../../shared/UIElements/Button";

const Process = (props) => {
  const navigate = useNavigate();

  const imageNames = [
    { imageName: "step_1.png", label: "신청서 작성" },
    { imageName: "step_2.png", label: "매입가 안내" },
    { imageName: "step_3.png", label: "입금" },
  ];

  const location = useLocation();
  const { totalRank, frontImage, id } = location.state;
  const { isLoading, sendRequest, clearError } = useHttpClient(); // useHttpClient 훅 사용
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 렌더링 시 맨 위로 스크롤

    const handleAIStep = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:8000/sell/process/${id}`
        );

        const dateObject = new Date(response.create_date);
        const newResponseData = {
          device_name: response.device_name,
          serial_number: response.serial_numer,
          year: dateObject.getFullYear(),
          month: (dateObject.getMonth() + 1).toString().padStart(2, "0"),
          date: dateObject.getDate().toString().padStart(2, "0"),
          step: response.step,
        };
        setResponseData(newResponseData);
      } catch (error) {
        console.error("Error while sending data to the server:", error);
      }
    };

    handleAIStep();
  }, []);

  return (
    <div className={styles.container}>
      <PageTitle title={"진행 상황"} className={styles.title}>
        내 노트북의 등급 측정 상황
      </PageTitle>

      <div className={styles.modelContainer}>
        <LaptopRankCard
          img={frontImage}
          rank={`rank_${totalRank}`}
          className={styles.rankcard}
          imgclass={styles.laptop_img}
          customImgStyle={{ width: "290px", height: "174px" }}
        />
        <p className={styles.model_title}>{responseData.device_name}</p>
        <p className={styles.model_description}>
          모델명: {responseData.serial_number} <br /> 등록일:{" "}
          {`${responseData.year}. ${responseData.month}. ${responseData.date}`}
        </p>
      </div>

      <img
        src="/img/process/robot.png"
        alt="robot"
        className={styles.robot}
      ></img>
      <div className={styles.company_name}>(주)도구모음</div>
      <div className={styles.company_address}>
        서울특별시 강남구 봉은사로454 (금탁타워) 2층
      </div>

      <div className={styles.process_container}>
        {imageNames.map((imageName, index) => (
          // 이미지 파일 이름을 사용하여 이미지 태그를 동적으로 생성
          <div key={index} className={styles.next}>
            <div className={styles.stepContainer}>
              <img
                src={`/img/process/${imageName["imageName"]}`}
                alt={`StepImage ${index + 1}`}
                className={`${
                  index >= responseData.step ? styles.grayscale : ""
                } ${styles.step_img}`}
              />
              {index >= responseData.step ? (
                <img
                  src="/img/process/step_inactive.png"
                  alt="step_inactive"
                  className={styles.active}
                />
              ) : (
                <img
                  src="/img/process/step_active.png"
                  alt="step_active"
                  className={styles.active}
                />
              )}

              <span
                className={`${
                  index >= responseData.step ? styles.grayscale : ""
                } ${styles.step_dec}`}
              >
                {imageName["label"]}
              </span>
            </div>
            {index === imageNames.length - 1 ? null : (
              <img
                src="/img/process/arrow.png"
                alt={`StepArrow`}
                className={`${
                  index >= responseData.step ? styles.grayscale : ""
                } ${styles.arrow}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.button_group}>
        <Button
          active={false}
          className={styles.prev_btn}
          onClick={() => navigate("/purchaseform")}
        >
          이전으로
        </Button>
        <Button
          active={true}
          className={styles.prev_btn}
          onClick={() => navigate("/main/rating")}
        >
          다른 노트북 보기
        </Button>
      </div>
    </div>
  );
};

export default Process;
