import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./Paflist.css";
import Page from "../../shared/UIElements/Page";
import Modal from "../../shared/UIElements/Modal";
import Card from "../../shared/UIElements/Card";
import Enlargemodal from "../components/Enlargemodal";

const dummydata = [
  {
    id: 1,
    nickname: "Teddy",
    time: "2023. 10. 31",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    des: "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편.",
    img: [
      "/img/admin/dummyimg/dummy1.png",
      "/img/admin/dummyimg/dummy2.png",
      "/img/admin/dummyimg/dummy3.png",
      "/img/admin/dummyimg/dummy4.png",
    ],
  },
  {
    id: 2,
    nickname: "최지원",
    time: "2023. 09. 12",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    des: "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편.",
    img: [
      "/img/admin/dummyimg/dummy1.png",
      "/img/admin/dummyimg/dummy2.png",
      "/img/admin/dummyimg/dummy3.png",
      "/img/admin/dummyimg/dummy4.png",
    ],
  },
  {
    id: 3,
    nickname: "최지원",
    time: "2023. 09. 12",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    des: "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편.",
    img: [
      "/img/admin/dummyimg/dummy1.png",
      "/img/admin/dummyimg/dummy2.png",
      "/img/admin/dummyimg/dummy3.png",
      "/img/admin/dummyimg/dummy4.png",
    ],
  },
  {
    id: 4,
    nickname: "최지원",
    time: "2023. 09. 12",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    des: "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편.",
    img: [
      "/img/admin/dummyimg/dummy1.png",
      "/img/admin/dummyimg/dummy2.png",
      "/img/admin/dummyimg/dummy3.png",
      "/img/admin/dummyimg/dummy4.png",
    ],
  },
  {
    id: 5,
    nickname: "최지원",
    time: "2023. 09. 12",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    des: "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편.",
    img: [
      "/img/admin/dummyimg/dummy1.png",
      "/img/admin/dummyimg/dummy2.png",
      "/img/admin/dummyimg/dummy3.png",
      "/img/admin/dummyimg/dummy4.png",
    ],
  },
  {
    id: 6,
    nickname: "최지원",
    time: "2023. 09. 12",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    des: "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편.",
    img: [
      "/img/admin/dummyimg/dummy1.png",
      "/img/admin/dummyimg/dummy2.png",
      "/img/admin/dummyimg/dummy3.png",
      "/img/admin/dummyimg/dummy4.png",
    ],
  },
  {
    id: 7,
    nickname: "최지원",
    time: "2023. 09. 12",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    des: "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편.모서리 부분 파손이 살짝 있음.",
    img: [
      "/img/admin/dummyimg/dummy1.png",
      "/img/admin/dummyimg/dummy2.png",
      "/img/admin/dummyimg/dummy3.png",
      "/img/admin/dummyimg/dummy4.png",
    ],
  },
];
const itemlen = 100;
const Paflist = () => {
  const [listnum, setListNum] = useState(0);
  const Listnumhandler = (index) => {
    setListNum(index);
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const [imgenlarge, setImageenlarge] = useState(false);
  const closeEnlarge = () => {
    setImageenlarge(false);
  };
  const openEnlarge = () => {
    setImageenlarge(true);
  };

  const [imgurl, setImgurl] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchparamshandler = (sort, value) => {
    //쿼리 생성 및 변경
    searchParams.set(`${sort}`, `${value}`);
    setSearchParams(searchParams);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const isAllSelected = () => {
    return selectedItems.length === dummydata.length;
  };

  const handleSelectAll = () => {
    // 전체 체크박스 상태를 반전시킴
    // 만약 전체 체크박스가 선택되어 있다면 해제하고,
    // 선택되어 있지 않다면 선택함
    if (isAllSelected()) {
      // 모든 항목의 체크를 해제
      setSelectedItems([]);
    } else {
      // 모든 항목을 선택
      setSelectedItems([...dummydata]);
    }
  };

  const handleItemSelect = (item) => {
    if (isSelected(item)) {
      // 이미 선택된 항목인 경우, 선택 취소
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      // 선택되지 않은 항목인 경우, 선택
      setSelectedItems([...selectedItems, item]);
    }
  };

  const isSelected = (item) => {
    return selectedItems.includes(item);
  };
  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeModal}
        className="paflist-modal"
        Backdropclass={imgenlarge && "backdropclose"}
      >
        <span className="paflist-modal_title">매입신청서 상세 정보</span>
        <img
          className="paflist_modal_cancle"
          src="/img/modal/Cancle.png"
          alt="modalcancle"
          onClick={closeModal}
        />
        <div className="paflist-modal_name">기기명</div>
        <div className="paflist-modal_des">{dummydata[listnum].name}</div>
        <div className="paflist-modal_name">모델명</div>
        <div className="paflist-modal_des">{dummydata[listnum].model}</div>
        <div className="paflist-modal_name">제품 특이사항</div>
        <div className="paflist-modal_des">{dummydata[listnum].des}</div>
        <div className="paflist-modal_name">노트북 사진</div>
        <div className="paflist-modal_imgcontain">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="paflist-modal_imgbox"
              onClick={(e) => {
                setImgurl(dummydata[listnum].img[0]);
                openEnlarge();
              }}
            >
              <img
                className="paflist-modal_img"
                src={dummydata[listnum].img[0]}
              />
            </div>
            <div
              className="paflist-modal_imgbox"
              onClick={(e) => {
                setImgurl(dummydata[listnum].img[1]);
                openEnlarge();
              }}
            >
              <img
                className="paflist-modal_img"
                src={dummydata[listnum].img[1]}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              className="paflist-modal_imgbox"
              onClick={(e) => {
                setImgurl(dummydata[listnum].img[2]);
                openEnlarge();
              }}
            >
              <img
                className="paflist-modal_img"
                src={dummydata[listnum].img[2]}
              />
            </div>
            <div
              className="paflist-modal_imgbox"
              onClick={(e) => {
                setImgurl(dummydata[listnum].img[3]);
                openEnlarge();
              }}
            >
              <img
                className="paflist-modal_img"
                src={dummydata[listnum].img[3]}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Enlargemodal
        show={imgenlarge}
        onCancel={closeEnlarge}
        className="paflist-modal_img_enlarge"
      >
        <img
          className="paflist-modal_img_enlarge_img"
          src={imgurl}
          alt="imgenlarge"
        ></img>
      </Enlargemodal>

      <input className="paflist_search" placeholder="내용 검색하기"></input>
      <div className="paflist_title">매입신청서 리스트</div>
      <div className="pafilist_main">
        <div className="pafilist_main_listtop">
          <input
            type="checkbox"
            onChange={handleSelectAll} // 전체 선택 상태 변경 핸들러 연결
            checked={isAllSelected()}
          ></input>
          <span style={{ marginLeft: "1rem" }}>Name</span>
          <span style={{ marginLeft: "11.4375rem" }}>Time</span>
        </div>
        {dummydata.map((list, index) => (
          <div key={index}>
            <div className="pafilist_main_list">
              <input
                type="checkbox"
                checked={isSelected(list)} // 항목의 선택 상태 확인
                onChange={() => handleItemSelect(list)}
              ></input>
              <span style={{ marginLeft: "1rem", width: "8.8125rem" }}>
                <span style={{ fontWeight: "bold" }}>{index + 1}</span>{" "}
                {list.nickname}님의 매입신청서
              </span>
              <span
                style={{
                  marginLeft: "5rem",
                  width: "4.9125rem",
                  marginRight: "28.875rem",
                }}
              >
                {list.time}
              </span>
              <div
                className="center"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  openModal();
                  Listnumhandler(index);
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    width: "2.875rem",
                    textAlign: "left",
                  }}
                >
                  더보기
                </div>
                <img
                  className="paflist_main_moreimg"
                  src="/img/admin/more.png"
                  alt="morepng"
                ></img>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="paflist_page">
        <Page
          itemlen={itemlen}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          searchparamshandler={searchparamshandler}
        ></Page>
      </div>
    </React.Fragment>
  );
};

export default Paflist;
