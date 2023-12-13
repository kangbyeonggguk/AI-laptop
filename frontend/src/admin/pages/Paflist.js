import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./Paflist.css";
import Page from "../../shared/UIElements/Page";
import Modal from "../../shared/UIElements/Modal";
import Card from "../../shared/UIElements/Card";
import Enlargemodal from "../components/Enlargemodal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Paflist = () => {
  const { isLoading, sendRequest, clearError } = useHttpClient();
  const [itemlen, setItemLen] = useState(7);
  const [loadeddata, setLoadedData] = useState();
  const [error, setError] = useState();
  const [sellid, setSellId] = useState();

  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Enter 키를 눌렀을 때 실행할 함수 호출
      searchparamshandler("name", inputValue);
    }
  };

  const [selectedStep, setSelectedStep] = useState(1);
  const handleRadioChange = async (event) => {
    setSelectedStep(event.target.value);

    await sendRequest(
      `http://127.0.0.1:8000/sell/progress?step=${event.target.value}&sell_id=${sellid}`,
      "PATCH"
    );
  };
  const [listnum, setListNum] = useState(0);
  const Listnumhandler = (index) => {
    setListNum(index);
    setSelectedStep(loadeddata[index].step);
    setSellId(loadeddata[index].laptop_sell_info_id);
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
    return selectedItems.length === loadeddata.length;
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
      setSelectedItems([...loadeddata]);
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
  useEffect(() => {
    const getinfo = async () => {
      try {
        const responseData = await sendRequest(
          `http://127.0.0.1:8000/admin/laptop_info_list?${
            searchParams.get("page") ? `page=${searchParams.get("page")}` : 1
          }${
            searchParams.get("name") ? `&name=${searchParams.get("name")}` : ""
          }`,
          "GET",
          null
        );
        setItemLen(responseData.data_count);
        setLoadedData(responseData.list);
      } catch (err) {
        setError(err);
      }
    };
    getinfo();
  }, [searchParams]);
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  };
  return (
    <React.Fragment>
      {!isLoading && loadeddata && (
        <>
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
            <div className="paflist-modal_des">
              {loadeddata[listnum].device_name}
            </div>
            <div className="paflist-modal_name">모델명</div>
            <div className="paflist-modal_des">
              {loadeddata[listnum].serial_number}
            </div>
            <div className="paflist-modal_name">제품 특이사항</div>
            <div className="paflist-modal_des">
              {loadeddata[listnum].product_details}
            </div>
            <div className="paflist-modal_name">진행 상황</div>
            <div style={{ marginBottom: "1.5rem" }}>
              <input
                type="radio"
                name="step"
                value={1}
                onChange={handleRadioChange}
                checked={selectedStep == 1}
              />
              <a style={{ marginRight: "1.5rem" }}>신청서 작성</a>
              <input
                type="radio"
                name="step"
                value={2}
                onChange={handleRadioChange}
                checked={selectedStep == 2}
              />
              <a style={{ marginRight: "1.5rem" }}>내부 등급 측정 신청</a>
              <input
                type="radio"
                name="step"
                value={3}
                onChange={handleRadioChange}
                checked={selectedStep == 3}
              />
              <a>입금</a>
            </div>
            {loadeddata[listnum].laptop_sell_images[0] && (
              <>
                <div className="paflist-modal_name">노트북 사진</div>
                <div className="paflist-modal_imgcontain">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      className="paflist-modal_imgbox"
                      onClick={(e) => {
                        setImgurl(
                          loadeddata[listnum].laptop_sell_images[0].path
                        );
                        openEnlarge();
                      }}
                    >
                      <img
                        className="paflist-modal_img"
                        src={loadeddata[listnum].laptop_sell_images[0].path}
                      />
                    </div>
                    <div
                      className="paflist-modal_imgbox"
                      onClick={(e) => {
                        setImgurl(
                          loadeddata[listnum].laptop_sell_images[0].path
                        );
                        openEnlarge();
                      }}
                    >
                      <img
                        className="paflist-modal_img"
                        src={loadeddata[listnum].laptop_sell_images[0].path}
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
                        setImgurl(
                          loadeddata[listnum].laptop_sell_images[0].path
                        );
                        openEnlarge();
                      }}
                    >
                      <img
                        className="paflist-modal_img"
                        src={loadeddata[listnum].laptop_sell_images[0].path}
                      />
                    </div>
                    <div
                      className="paflist-modal_imgbox"
                      onClick={(e) => {
                        setImgurl(
                          loadeddata[listnum].laptop_sell_images[0].path
                        );
                        openEnlarge();
                      }}
                    >
                      <img
                        className="paflist-modal_img"
                        src={loadeddata[listnum].laptop_sell_images[0].path}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
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

          <input
            type="text"
            className="paflist_search"
            placeholder="내용 검색하기"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
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
            {loadeddata.map((list, index) => (
              <div key={index}>
                <div className="pafilist_main_list">
                  <input
                    type="checkbox"
                    checked={isSelected(list)} // 항목의 선택 상태 확인
                    onChange={() => handleItemSelect(list)}
                  ></input>
                  <span style={{ marginLeft: "1rem", width: "8.8125rem" }}>
                    <span style={{ fontWeight: "bold" }}>{index + 1}</span>{" "}
                    {list.accounts.nickname}님의 매입신청서
                  </span>
                  <span
                    style={{
                      marginLeft: "5rem",
                      width: "4.9125rem",
                      marginRight: "28.875rem",
                    }}
                  >
                    {formatDate(list.create_date)}
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
              itemcount={7}
            ></Page>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Paflist;
