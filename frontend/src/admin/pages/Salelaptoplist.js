import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./Paflist.css";
import Page from "../../shared/UIElements/Page";
import Modal from "../../shared/UIElements/Modal";
import Card from "../../shared/UIElements/Card";
import Enlargemodal from "../components/Enlargemodal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Imageupload from "../components/Imageupload";
import Dropdown from "../components/Dropdown";

const Salelaptoplist = () => {
  const [modellist, setModellist] = useState();

  const [selectedImages, setSelectedImages] = useState(Array(4).fill(null));

  const [isadd, setIsAdd] = useState(false); //추가하기인지 아닌지 확인

  const { isLoading, sendRequest } = useHttpClient();
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
    laptop_id: "",
    laptop_info_list_id: "",
    model: "",
    title: "",
    hashtag: "",
    price: "",
    price_time_sale: "",
    os: "",
    rank: "",
    hardware: "",
    screen_size: "",
  });
  const inpulistvalue = (index) => {
    setInputList({
      laptop_id: loadeddata[index].laptop_id,
      laptop_info_list_id:
        loadeddata[index].laptop_info_list.laptop_info_list_id,
      model: loadeddata[index].laptop_info_list.device_name,
      title: loadeddata[index].title,
      hashtag: loadeddata[index].hashtag,
      price: loadeddata[index].price,
      price_time_sale: loadeddata[index].price_time_sale,
      os: loadeddata[index].os,
      rank: loadeddata[index].rank,
      hardware: loadeddata[index].hardware,
      screen_size: loadeddata[index].laptop_info_list.screen_size,
    });
  };
  useEffect(() => {}, [inputlist]);
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
          `${process.env.REACT_APP_BACKEND_URL}/admin/laptop_list?${
            searchParams.get("page") ? `page=${searchParams.get("page")}` : 1
          }${
            searchParams.get("name") ? `&name=${searchParams.get("name")}` : ""
          }`,
          "GET",
          null
        );
        setItemLen(responseData.data_count);
        setLoadedData(responseData.list);
        setModellist(responseData.info_list);
      } catch (err) {
        setError(err);
        alert("판매 정보를 찾을 수 없습니다.");
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
          `${process.env.REACT_APP_BACKEND_URL}/admin/laptop_list`,
          "PATCH",
          JSON.stringify({
            laptop_id: inputlist.laptop_id,
            title: inputlist.title,
            hashtag: inputlist.hashtag,
            price: inputlist.price,
            price_time_sale: inputlist.price_time_sale,
            os: inputlist.os,
            hardware: inputlist.hardware,
            rank: inputlist.rank,
            laptop_info_list_id: inputlist.laptop_info_list_id,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {
        setError(err);
        alert("판매 정보를 수정할 수 없습니다.");
      }
    };
    patch();
  };
  const addhandler = () => {
    setIsAdd(true);
    setInputList({
      laptop_id: "",
      laptop_info_list_id: "",
      model: "",
      title: "",
      hashtag: "",
      price: "",
      price_time_sale: "",
      os: "",
      rank: "",
      hardware: "",
      screen_size: "",
    });
  };

  const createinfo = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/laptop_list`,
        "POST",
        JSON.stringify({
          title: inputlist.title,
          hashtag: inputlist.hashtag,
          price: inputlist.price,
          price_time_sale: inputlist.price_time_sale,
          os: inputlist.os,
          hardware: inputlist.hardware,
          rank: inputlist.rank,
          laptop_info_list_id: inputlist.laptop_info_list_id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      window.location.reload();
    } catch (error) {}
  };
  const deleteinfo = () => {
    const deletelaptop = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/laptop_list?laptop_id=${inputlist.laptop_id}`,
          "delete"
        );
        window.location.reload();
      } catch (err) {
        setError(err);
        alert("판매 정보를 삭제할 수 없습니다.");
      }
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
          <span className="paflist-modal_title">판매 상세 정보</span>
        )}

        <img
          className="paflist_modal_cancle"
          src="/img/modal/Cancle.png"
          alt="modalcancle"
          onClick={closeModal}
        />
        <div className="paflist-modal_name">모델</div>
        <Dropdown
          modellist={modellist}
          inputlist={inputlist}
          setInputList={setInputList}
        />
        <div className="paflist-modal_name" style={{ marginTop: "1.5rem" }}>
          제목
        </div>
        <input
          className="paflist-modal_des"
          value={inputlist.title}
          onChange={(e) => {
            setInputList({ ...inputlist, title: e.target.value });
          }}
        ></input>
        <div className="paflist-modal_name">해시태그</div>
        <input
          className="paflist-modal_des"
          value={inputlist.hashtag}
          onChange={(e) => {
            setInputList({ ...inputlist, hashtag: e.target.value });
          }}
        ></input>
        <div className="paflist-modal_name">정가</div>
        <input
          className="paflist-modal_des"
          value={inputlist.price}
          onChange={(e) => {
            setInputList({ ...inputlist, price: e.target.value });
          }}
        ></input>
        <div className="paflist-modal_name">할인가</div>
        <input
          className="paflist-modal_des"
          value={inputlist.price_time_sale}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              price_time_sale: e.target.value,
            });
          }}
        ></input>

        <div className="paflist-modal_name">OS</div>
        <input
          className="paflist-modal_des"
          value={inputlist.os}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              os: e.target.value,
            });
          }}
        ></input>

        <div className="paflist-modal_name">하드웨어</div>
        <input
          className="paflist-modal_des"
          value={inputlist.hardware}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              hardware: e.target.value,
            });
          }}
        ></input>

        <div className="paflist-modal_name">등급</div>
        <input
          className="paflist-modal_des"
          value={inputlist.rank}
          onChange={(e) => {
            setInputList({
              ...inputlist,
              rank: e.target.value,
            });
          }}
        ></input>

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
                  <span style={{ fontWeight: "bold" }}></span> [{list.title}]
                  {list.laptop_info_list.device_name}
                </span>
                <span
                  style={{
                    marginLeft: "5rem",
                    width: "4.9125rem",
                  }}
                >
                  {list.laptop_info_list.screen_size}
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

export default Salelaptoplist;
