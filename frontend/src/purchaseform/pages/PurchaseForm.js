import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import "./PurchaseForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loading from "../../result/pages/Loading";

const PurchaseForm = () => {
  const { isLoading, sendRequest, clearError } = useHttpClient(); // useHttpClient 훅 사용

  const navigate = useNavigate();
  const [deviceName, setDeviceName] = useState("");
  const [modelName, setModelName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState(Array(4).fill(null));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [attachmentType, setAttachmentType] = useState("");
  const [modalHeight, setModalHeight] = useState(26.25);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  const [mobilePage, setMobilePage] = useState(1);

  const nextpage = () => {
    if (mobilePage === 1) {
      setMobilePage(2);
    } else if (mobilePage === 2) {
    }
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    window.scrollTo(0, 0); // 페이지 렌더링 시 맨 위로 스크롤

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const differentImages = [
    "/img/purchaseimg/front.png",
    "/img/purchaseimg/back.png",
    "/img/purchaseimg/keyboard.png",
    "/img/purchaseimg/monitor.png",
  ];

  const mobileImages = [
    "/img/purchaseimg/mobilefront.png",
    "/img/purchaseimg/mobileback.png",
    "/img/purchaseimg/mobilekeyboard.png",
    "/img/purchaseimg/mobilemonitor.png",
  ];

  Modal.setAppElement("#root");

  // 모달창 open
  const openModal = (index, type) => {
    setSelectedSlot(index);
    setAttachmentType(type);
    setModalIsOpen(true);
  };

  // 모달창 close
  const closeModal = () => {
    setSelectedSlot(null);
    setAttachmentType("");
    setTempImage(null);
    setModalIsOpen(false);
    setUploadedFileName("");
    setModalHeight(26.25);
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    const fileName = acceptedFiles[0].name;
    setUploadedFileName(fileName);
    setModalHeight(26.25 + 1.875);

    reader.onload = () => {
      setTempImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const getAttachmentTypeByIndex = (index) => {
    switch (index) {
      case 0:
        return "정면";
      case 1:
        return "후면";
      case 2:
        return "키보드";
      case 3:
        return "모니터";
      default:
    }
  };

  const handleImageUpload = () => {
    if (tempImage) {
      const newImages = [...selectedImages];
      newImages[selectedSlot] = tempImage;
      setSelectedImages(newImages);
      setTempImage(null);
      closeModal();
    } else {
      // 이미지를 선택하지 않은 경우
    }
  };

  const handleReset = () => {
    setDeviceName("");
    setModelName("");
    setProductDetails("");
    setSelectedImages(Array(4).fill(null));
  };

  const handleAIProcessing = async () => {
    function dataURItoBlob(dataURI) {
      // Split the data URI to get the metadata and the data part
      const splitDataURI = dataURI.split(",");
      const byteString = atob(splitDataURI[1]);

      // Extract MIME type from the metadata
      const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

      // Convert to byte array
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const intArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }

      // Create Blob object
      return new Blob([arrayBuffer], { type: mimeString });
    }
    const time = new Date().toISOString();

    // 업로드된 이미지만 필터링
    const uploadedImages = selectedImages.filter((image) => image !== null);
    const formData = new FormData();
    formData.append("device_name", deviceName);
    formData.append("serial_number", modelName);
    formData.append("product_details", productDetails);
    formData.append("step", 2);
    formData.append("create_date", time);

    const images = selectedImages.filter((image) => image !== null);

    images.forEach((image, index) => {
      if (index === 0) {
        formData.append("files", dataURItoBlob(images[1]), `file_0.jpg`);
      } else if (index === 1) {
        formData.append("files", dataURItoBlob(images[0]), `file_1.jpg`);
      } else {
        formData.append("files", dataURItoBlob(image), `file_${index}.jpg`);
      }
    });

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await sendRequest(
        "http://localhost:8000/sell",
        "POST",
        formData,
        {
          token: accessToken, // 가져온 액세스 토큰 사용
        }
      );

      navigate(
        `/result?sell_id=${response.sell_id}&front_image=${response.front_image}&back=${response.serving_datas.back}&front=${response.serving_datas.front}&keyboard=${response.serving_datas.keyboard}&monitor=${response.serving_datas.monitor}`
      );

      console.log(response);
    } catch (error) {
      console.error("Error while sending data to the server:", error);
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div className="purchase-container">
      <img
        className="rectangle"
        src="/img/purchaseimg/rectangle.png"
        alt="rectangle"
      />

      <div className="purchase-overlay">
        <div className="text-section">내 노트북의 등급은?</div>
        <div className="text-section2">
          노트북을 촬영한 사진을 분석한 후 손상 부위 별로 판단해
          <br /> 등급을 결정해주는 똑똑한 AI와 함께 편리한 판매를 경험해보세요.
        </div>

        <div className="text-section3">
          똑똑한 AI와 함께 편리한 판매를 경험해보세요.
        </div>

        <Link className="go_ratingsystem" to="/main/ratingsystem">
          등급제 보러가기
        </Link>
      </div>
      <div className="main_text">매입신청서 작성</div>
      <div className="main_text2">좋은 가격에 편하게 팔아요!</div>

      <div
        className="mobile1"
        style={{
          display: isMobile && mobilePage !== 1 ? "none" : "block",
        }}
      >
        <form className="purchase-form">
          <label className="purchase-label">기기명</label>
          <input
            className="purchase-input"
            type="text"
            id="deviceName"
            placeholder="기기명을 입력해주세요."
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />

          <label className="purchase-label">모델명</label>
          <input
            className="purchase-input"
            type="text"
            id="modelName"
            placeholder="모델명을 입력해주세요."
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />

          <label className="purchase-label">제품 특이사항</label>
          <input
            className="purchase-input"
            type="text"
            id="productDetails"
            placeholder="제품 특이사항을 입력해주세요."
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
        </form>
      </div>

      <div
        className="mobile2"
        style={{
          display: isMobile && mobilePage !== 2 ? "none" : "block",
        }}
      >
        <label className="purchase-label">노트북 사진</label>
        <div className="img-grid">
          {/* 이미지를 업로드할 4칸 */}
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className="img_box"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {image ? null : (
                <img
                  className="instruction-image"
                  src={differentImages[index]}
                  alt={`Instruction ${index + 1}`}
                />
              )}

              {image ? null : (
                <img
                  className="ins-image"
                  src={mobileImages[index]}
                  alt={`Instruction ${index + 1}`}
                />
              )}

              <img
                className="button-img"
                src="/img/purchaseimg/button.png"
                alt="button-img"
                onClick={() =>
                  openModal(index, getAttachmentTypeByIndex(index))
                }
              />
            </div>
          ))}
        </div>
        {/* 이미지를 업로드하는 모달 창 */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Upload Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: isMobile ? "20rem" : "45rem",
              height: isMobile ? "20.875rem" : `${modalHeight}rem`,
              margin: "auto",
              border: "0.0625rem",
              borderRadius: "0.625rem",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <div className="modal-head">
            <p className="title-text">{attachmentType} 사진 첨부하기</p>
            <img
              className="close-btn"
              src="/img/purchaseimg/x.png"
              alt="close"
              onClick={closeModal}
            ></img>
          </div>

          {uploadedFileName && (
            <div className="uploaded-file">
              <img
                src="/img/purchaseimg/fileicon.png"
                alt="Icon"
                className="file-icon"
              />
              {uploadedFileName}
            </div>
          )}
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div className="drop-zone" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drop-content">
                  <p className="here-drag">파일을 여기로 드래그 해주세요</p>
                  <button className="select-btn">컴퓨터에서 파일 선택</button>
                </div>
                {/* 이미지 드랍존 안에 표시*/}
                {tempImage && (
                  <img
                    src={tempImage}
                    alt="Preview"
                    style={{
                      width: isMobile ? "18.625rem" : "22.1875rem",
                      height: isMobile ? "11rem" : "13.125rem",
                      objectFit: "cover",
                      marginLeft: isMobile ? "0.625rem" : "11.25rem",
                      marginTop: isMobile ? "0.625rem" : "2.25rem",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </div>
            )}
          </Dropzone>
          <div className="modal-btns">
            <button
              className={`cancel-btn ${tempImage ? "uploaded" : ""}`}
              onClick={closeModal}
            >
              취소
            </button>

            <button
              className={`upload-btn ${tempImage ? "uploaded" : ""}`}
              onClick={handleImageUpload}
            >
              업로드
            </button>
          </div>
        </Modal>
      </div>

      <div className="bottom-btn">
        <button className="reset_btn" onClick={handleReset}>
          초기화
        </button>

        <button
          className="next-button"
          style={{
            display: isMobile && mobilePage === 1 ? "block" : "none",
            marginLeft: "0.5rem",
            background: "#4F80FF",
            border: "none",
            color: "#ffffff",
          }}
          onClick={nextpage}
        >
          {mobilePage === 1 ? "다음으로" : "다음 단계"}
        </button>

        <button
          className={`rank_btn ${
            selectedImages.some((image) => image !== null) ? "" : "disabled"
          }`}
          onClick={handleAIProcessing}
          disabled={!selectedImages.some((image) => image !== null)}
          style={{
            display: isMobile ? (mobilePage === 2 ? "block" : "none") : "block",
          }}
        >
          AI 등급 측정하기
        </button>
      </div>
    </div>
  );
};

export default PurchaseForm;
