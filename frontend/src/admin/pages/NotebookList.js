import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./Paflist.css";
import Page from "../../shared/UIElements/Page";
import Modal from "../../shared/UIElements/Modal";
import Card from "../../shared/UIElements/Card";
import Enlargemodal from "../components/Enlargemodal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Imageupload from "../components/Imageupload";

const NotebookList = () => {
  const [selectedImages, setSelectedImages] = useState(Array(4).fill(""));

  const [isadd, setIsAdd] = useState(false); //추가하기인지 아닌지 확인

  const { isLoading, sendRequest, clearError } = useHttpClient();
  const [itemlen, setItemLen] = useState(7);
  const [loadeddata, setLoadedData] = useState();
  const [error, setError] = useState();

  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Enter 키를 눌렀을 때 실행할 함수 호출
      searchparamshandler("name", inputValue);
    }
  };

  const [inputlist, setInputList] = useState({
    id: "",
    device_name: "",
    screen_size: "",
    business_usage: "",
    internet_lecture_usage: "",
    gaming_usage: "",
    purchase_limit: "",
    delivery_fee: "",
    manufacturing_company: "",
    brand: "",
  });
  const inpulistvalue = (index) => {
    setInputList({
      id: loadeddata[index].laptop_info_list_id,
      device_name: loadeddata[index].device_name,
      screen_size: loadeddata[index].screen_size,
      business_usage: loadeddata[index].business_usage,
      internet_lecture_usage: loadeddata[index].internet_lecture_usage,
      gaming_usage: loadeddata[index].gaming_usage,
      purchase_limit: loadeddata[index].purchase_limit,
      delivery_fee: loadeddata[index].delivery_fee,
      manufacturing_company: loadeddata[index].manufacturing_company,
      brand: loadeddata[index].brand,
      image: loadeddata[index].laptop_info_list_image,
    });
  };

  const [listnum, setListNum] = useState(0);
  const Listnumhandler = (index) => {
    setListNum(index);
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setIsAdd(false);
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

  useEffect(() => {
    const getinfo = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/laptop_info_list?${
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
        alert("노트북 정보를 찾을 수 없습니다.");
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
  const patchinfo = () => {
    const patch = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/laptop_info_list`,
          "PATCH",
          JSON.stringify({
            info_id: inputlist.id,
            device_name: inputlist.device_name,
            screen_size: inputlist.screen_size,
            business_usage: inputlist.business_usage,
            internet_lecture_usage: inputlist.internet_lecture_usage,
            gaming_usage: inputlist.gaming_usage,
            purchase_limit: inputlist.purchase_limit,
            delivery_fee: inputlist.delivery_fee,
            manufacturing_company: inputlist.manufacturing_company,
            brand: inputlist.brand,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
    };
    patch();
  };
  const addhandler = () => {
    setIsAdd(true);
    setInputList({
      id: "",
      device_name: "",
      screen_size: "",
      business_usage: "",
      internet_lecture_usage: "",
      gaming_usage: "",
      purchase_limit: "",
      delivery_fee: "",
      manufacturing_company: "",
      brand: "",
    });
  };

  const createinfo = async () => {
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

    const formData = new FormData();
    formData.append("device_name", inputlist.device_name);
    formData.append("screen_size", inputlist.screen_size);
    formData.append("business_usage", inputlist.business_usage);
    formData.append("internet_lecture_usage", inputlist.internet_lecture_usage);
    formData.append("gaming_usage", inputlist.gaming_usage);
    formData.append("purchase_limit", inputlist.purchase_limit);
    formData.append("delivery_fee", inputlist.delivery_fee);
    formData.append("manufacturing_company", inputlist.manufacturing_company);
    formData.append("brand", inputlist.brand);
    formData.append("create_date", time);

    const images = selectedImages.filter((image) => image !== null);

    // 0번 1번 인덱스 위치 변경
    const temp = selectedImages[0];
    selectedImages[0] = selectedImages[1];
    selectedImages[1] = temp;

    // 변경된 이미지 배열을 사용하여 파일 이름 생성
    selectedImages.forEach((image, index) => {
      const uniqueFileName = `${time}_${index}_${Math.random()
        .toString(36)
        .substring(7)}.png`;

      formData.append("files", dataURItoBlob(image), uniqueFileName);
    });

    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/laptop_info_list`,
        "POST",
        formData
      );
      window.location.reload();
    } catch (error) {}
  };
  const deleteinfo = () => {
    const deletelaptop = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/laptop_info_list?info_id=${inputlist.id}`,
          "delete"
        );
        window.location.reload();
      } catch (err) {}
    };
    deletelaptop();
  };
  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeModal}
        className="paflist-modal"
        Backdropclass={imgenlarge && "backdropclose"}
      >
        {isadd ? (
          <span className="paflist-modal_title">노트북 추가하기</span>
        ) : (
          <span className="paflist-modal_title">노트북 상세 정보</span>
        )}

        <img
          className="paflist_modal_cancle"
          src="/img/modal/Cancle.png"
          alt="modalcancle"
          onClick={closeModal}
        />
        <div className="paflist-modal_name">기기명</div>
        <input
          className="paflist-modal_des"
          value={inputlist.device_name}
          onChange={(e) => {
            setInputList({ ...inputlist, device_name: e.target.value });
          }}
        ></input>
        <div className="paflist-modal_name">화면 사이즈</div>
        <input
          className="paflist-modal_des"
          value={inputlist.screen_size}
          onChange={(e) => {
            setInputList({ ...inputlist, screen_size: e.target.value });
          }}
        ></input>
        <div className="paflist-modal_name">업무용</div>
        <input
          className="paflist-modal_des"
          value={inputlist.business_usage}
          onChange={(e) => {
            setInputList({ ...inputlist, business_usage: e.target.value });
          }}
        ></input>
        <div className="paflist-modal_name">인강용</div>
        <input
          className="paflist-modal_des"
          value={inputlist.internet_lecture_usage}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              internet_lecture_usage: e.target.value,
            });
          }}
        ></input>

        <div className="paflist-modal_name">게임용</div>
        <input
          className="paflist-modal_des"
          value={inputlist.gaming_usage}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              gaming_usage: e.target.value,
            });
          }}
        ></input>

        <div className="paflist-modal_name">구매제한</div>
        <input
          className="paflist-modal_des"
          value={inputlist.purchase_limit}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              purchase_limit: e.target.value,
            });
          }}
        ></input>

        <div className="paflist-modal_name">배송비</div>
        <input
          className="paflist-modal_des"
          value={inputlist.delivery_fee}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              delivery_fee: e.target.value,
            });
          }}
        ></input>

        <div className="paflist-modal_name">제조사</div>
        <input
          className="paflist-modal_des"
          value={inputlist.manufacturing_company}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              manufacturing_company: e.target.value,
            });
          }}
        ></input>

        <div className="paflist-modal_name">브랜드</div>
        <input
          className="paflist-modal_des"
          value={inputlist.brand}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              brand: e.target.value,
            });
          }}
        ></input>

        {isadd ? (
          <Imageupload
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        ) : (
          <>
            {inputlist.image && (
              <>
                <div className="paflist-modal_name">노트북 사진</div>
                <div className="paflist-modal_imgcontain">
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
                          inputlist.image[0] ? inputlist.image[0].path : ""
                        );
                        openEnlarge();
                      }}
                    >
                      <img
                        className="paflist-modal_img"
                        src={inputlist.image[0] ? inputlist.image[0].path : ""}
                      />
                    </div>
                    <div
                      className="paflist-modal_imgbox"
                      onClick={(e) => {
                        setImgurl(
                          inputlist.image[1] ? inputlist.image[1].path : ""
                        );
                        openEnlarge();
                      }}
                    >
                      <img
                        className="paflist-modal_img"
                        src={inputlist.image[1] ? inputlist.image[1].path : ""}
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
                          inputlist.image[2] ? inputlist.image[2].path : ""
                        );
                        openEnlarge();
                      }}
                    >
                      <img
                        className="paflist-modal_img"
                        src={inputlist.image[2] ? inputlist.image[2].path : ""}
                      />
                    </div>
                    <div
                      className="paflist-modal_imgbox"
                      onClick={(e) => {
                        setImgurl(
                          inputlist.image[3] ? inputlist.image[3].path : ""
                        );
                        openEnlarge();
                      }}
                    >
                      <img
                        className="paflist-modal_img"
                        src={inputlist.image[3] ? inputlist.image[3].path : ""}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div className="center">
          {isadd ? (
            <button className="paflist-modal_editbutton" onClick={createinfo}>
              추가하기
            </button>
          ) : (
            <>
              <button
                className="paflist-modal_editbutton"
                onClick={patchinfo}
                style={{ marginRight: "13px", marginLeft: "15px" }}
              >
                수정하기
              </button>
              <button className="paflist-modal_editbutton" onClick={deleteinfo}>
                삭제하기
              </button>
            </>
          )}
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

      <input
        type="text"
        className="paflist_search"
        placeholder="내용 검색하기"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="paflist_title">노트북 리스트</div>
        <button
          className="paflist_addbutton"
          onClick={() => {
            addhandler();
            openModal();
          }}
        >
          노트북 추가
        </button>
      </div>
      <div className="pafilist_main">
        <div className="pafilist_main_listtop">
          <span style={{ marginLeft: "1rem" }}>Name</span>
          <span style={{ marginLeft: "11.4375rem" }}>Screen</span>
          <span style={{ marginLeft: "11.4375rem" }}>Time</span>
        </div>
        {loadeddata &&
          loadeddata.map((list, index) => (
            <div key={index}>
              <div className="pafilist_main_list">
                <span style={{ marginLeft: "1rem", width: "8.8125rem" }}>
                  <span style={{ fontWeight: "bold" }}></span>{" "}
                  {list.device_name}
                </span>
                <span
                  style={{
                    marginLeft: "5rem",
                    width: "4.9125rem",
                  }}
                >
                  {list.screen_size}
                </span>
                <span
                  style={{
                    marginLeft: "9rem",
                    width: "4.9125rem",
                    marginRight: "15.051625rem",
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
                    inpulistvalue(index);
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
    </React.Fragment>
  );
};

export default NotebookList;
