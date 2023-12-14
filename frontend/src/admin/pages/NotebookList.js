import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../../shared/UIElements/Page";
import Modal from "../../shared/UIElements/Modal";

import "./NotebookList.css";

const dummydata = [
  {
    id: 1,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "A",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },

  {
    id: 2,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "S",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },

  {
    id: 3,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "A",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },

  {
    id: 4,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "S",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },

  {
    id: 5,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "A",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },

  {
    id: 6,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "S",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },

  {
    id: 7,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "A",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },

  {
    id: 8,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "B",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },

  {
    id: 9,
    notebook_img: "/img/admin/dummyimg/dummy2.png",
    front: "/img/admin/dummyimg/dummy1.png",
    back: "/img/admin/dummyimg/dummy2.png",
    keyboard: "/img/admin/dummyimg/dummy3.png",
    monitor: "/img/admin/dummyimg/dummy4.png",
    name: "맥북 에어",
    level: "A",
    model: " NT950XBE-X716A",
    register: "2023. 09. 08",
    description: "모서리 부분 파손이 살짝 있음. 화면 상태는 \n 기스 없이 깔끔한 편.",
  },
];

const itemlen = 100;

const Userlist = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedimg, setSelectedImg] = useState("");

  const searchparamshandler = (sort, value) => {
    //쿼리 생성 및 변경
    searchParams.set(`${sort}`, `${value}`);
    setSearchParams(searchParams);
  };

  //   const navigate = useNavigate();

  const openModal = (item) => {
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  const openDetailModal = (item) => {
    setDetailModalOpen(true);
    setSelectedImg(item);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImg(imageSrc);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedImg(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <React.Fragment>
      <input className="paflist_search" placeholder="내용 검색하기"></input>
      <div className="paflist_title">노트북 리스트</div>
      <div className="notebooklist_main">
        {dummydata.map((list, index) => (
          <div className="notebooklist_container" key={index} onClick={() => openModal(list)}>
            <img src={list.notebook_img} alt="notebook_img" className="notebooklist_img" />
          </div>
        ))}
      </div>
      {selectedItem && (
        <div id="backdrop-hook">
          <Modal show={isModalOpen} onCancel={closeModal} className="notebooklist_modal">
            <div className="modal_context">
              <div style={{ display: "flex", flexDirection: "space-between" }}>
                <h1 className="userlist_modalTitle">노트북 상세정보</h1>
                <img src="/img/admin/Cancel.png" alt="cancel" className="modal_cancel" onClick={closeModal} />
              </div>
              <div className="notebook_modelContainer">
                <div className="notebook_rank_container">
                  <img src="/img/admin/notebook.png" alt="notebook" className="notebook_img" />
                  <img src={`/img/admin/rank_${selectedItem.level}.png`} alt={`rank ${selectedItem.level}`} className="level_img" />
                </div>
                <div className="des_container">
                  <p className="notebook_title">{selectedItem.name}</p>
                  <p className="notebook_tag">
                    모델명: {selectedItem.model}
                    <br /> 등록일: {selectedItem.register}
                  </p>
                  <p className="notebook_description">{selectedItem.description}</p>
                </div>
              </div>
              <div className="slide_container">
                <img src="/img/admin/Left_arrow.png" alt="left_arrow" className="modal_arrow" />
                <div className="img_slide_container" onClick={() => openDetailModal(selectedItem.front)}>
                  <img src={selectedItem.front} alt="front" className="aspect_laptop" />
                </div>
                <div className="img_slide_container" onClick={() => openDetailModal(selectedItem.back)}>
                  <img src={selectedItem.back} alt="back" className="aspect_laptop" />
                </div>
                <div className="img_slide_container" onClick={() => openDetailModal(selectedItem.keyboard)}>
                  <img src={selectedItem.keyboard} alt="keyboard" className="aspect_laptop" />
                </div>
                <div className="img_slide_container" onClick={() => openDetailModal(selectedItem.monitor)}>
                  <img src={selectedItem.monitor} alt="monitor" className="aspect_laptop" />
                </div>
                <img src="/img/admin/Right_arrow.png" alt="left_arrow" className="modal_arrow" />
              </div>
            </div>
          </Modal>
        </div>
      )}

      {selectedimg && (
        <div id="backdrop-hook">
          <Modal
            show={detailModalOpen}
            onCancel={closeDetailModal}
            onImageClick={handleImageClick}
            className="detailList_modal"
            front={selectedItem.front}
            back={selectedItem.back}
            keyboard={selectedItem.keyboard}
            monitor={selectedItem.monitor}
            detail={true}>
            <img src={selectedimg} alt="detail_aspect" style={{ width: "100%", height: "100%" }}></img>
          </Modal>
        </div>
      )}
      <div className="paflist_page">
        <Page itemlen={itemlen} searchParams={searchParams} setSearchParams={setSearchParams} searchparamshandler={searchparamshandler}></Page>
      </div>
    </React.Fragment>
  );
};

export default Userlist;
