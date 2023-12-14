import React, { useEffect, useState } from "react";

import "./Imageupload.css";
import Modal from "react-modal";
import Dropzone from "react-dropzone";
const Imageupload = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedImages = props.selectedImages;
  const setSelectedImages = props.setSelectedImages;

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [attachmentType, setAttachmentType] = useState("");
  const [modalHeight, setModalHeight] = useState(26.25);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const differentImages = [
    "/img/purchaseimg/front.png",
    "/img/purchaseimg/back.png",
    "/img/purchaseimg/keyboard.png",
    "/img/purchaseimg/monitor.png",
  ];

  // 모달창 open
  const openModal = (index, type) => {
    setSelectedSlot(index);
    setAttachmentType(type);
    setModalIsOpen(true);
  };
  Modal.setAppElement("#root");
  // 모달창 close
  const closeModal = () => {
    setSelectedSlot(null);
    setAttachmentType("");
    setTempImage(null);
    setModalIsOpen(false);
    setUploadedFileName("");
    setModalHeight(26.25);
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

  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Upload Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
          },
          content: {
            width: "45rem",
            height: `${modalHeight}rem`,
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
                    width: "22.1875rem",
                    height: "13.125rem",
                    objectFit: "cover",
                    marginLeft: "11.25rem",
                    marginTop: "2.25rem",
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
      <div className="paflist-modal_name">노트북 사진</div>
      <div className="img-grid">
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

            <img
              className="button-img"
              src="/img/purchaseimg/button.png"
              alt="button-img"
              onClick={() => openModal(index, getAttachmentTypeByIndex(index))}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Imageupload;
