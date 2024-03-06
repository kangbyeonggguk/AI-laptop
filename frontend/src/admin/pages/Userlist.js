import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../../shared/UIElements/Page";
import Modal from "../../shared/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Userlist.css";
import "./Paflist.css";

const Userlist = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { isLoading, sendRequest } = useHttpClient();

  const [itemlen, setItemLen] = useState(7);
  const [loadeddata, setLoadedData] = useState([]);
  const [error, setError] = useState();

  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Enter 키를 눌렀을 때 실행할 함수 호출
      searchparamshandler("name", inputValue);
    }
  };

  const searchparamshandler = (sort, value) => {
    //쿼리 생성 및 변경
    searchParams.set(`${sort}`, `${value}`);
    setSearchParams(searchParams);
  };

  const openModal = (item) => {
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const getinfo = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/accounts?${
            searchParams.get("page") ? `page=${searchParams.get("page")}` : 1
          }${
            searchParams.get("name") ? `&name=${searchParams.get("name")}` : ""
          }`,
          "GET",
          null
        );
        setItemLen(responseData.data_count);
        setLoadedData(responseData.accounts);
      } catch (err) {
        setError(err);
        alert("유저 정보를 찾을 수 없습니다.");
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
          <input
            type="text"
            className="paflist_search"
            placeholder="내용 검색하기"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
          <div className="paflist_title">유저 리스트</div>
          <div className="pafilist_main">
            <div className="pafilist_main_listtop">
              <span style={{ marginLeft: "1rem" }}>Name</span>
              <span style={{ marginLeft: "11.8125rem" }}>E-mail</span>
              <span style={{ marginLeft: "13.5625rem " }}>Join Date</span>
            </div>
            {loadeddata.map((list, index) => (
              <div className="pafilist_main_list" key={index}>
                <span style={{ marginLeft: "1rem", width: "13.1875rem" }}>
                  <span style={{ fontWeight: "bold" }}></span> {list.nickname}
                </span>
                <span style={{ marginLeft: "1rem", width: "16.125rem" }}>
                  {list.email}
                </span>
                <span style={{ width: "79px" }}>
                  {formatDate(list.create_date)}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    width: "2.875rem",
                    marginLeft: "12.3125rem",
                    cursor: "pointer",
                  }}
                  onClick={() => openModal(list)}
                >
                  더보기
                </span>
                <img
                  className="paflist_main_moreimg"
                  src="/img/admin/more.png"
                  alt="morepng"
                ></img>
              </div>
            ))}
          </div>
          {selectedItem && (
            <div id="backdrop-hook">
              <Modal
                show={isModalOpen}
                onCancel={closeModal}
                className="userlist_modal"
              >
                <div className="modal_context">
                  <div
                    style={{ display: "flex", flexDirection: "space-between" }}
                  >
                    <h1 className="userlist_modalTitle">유저 상세정보</h1>
                    <img
                      src="/img/admin/Cancel.png"
                      alt="cancel"
                      className="modal_cancel"
                      onClick={closeModal}
                    />
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <div className="userlist_inputContainer">
                      <span className="userlist_label">아이디</span>
                      <input
                        type="text"
                        className="userlist_input"
                        defaultValue={selectedItem.id}
                      ></input>
                    </div>
                    <div className="userlist_inputContainer">
                      <span className="userlist_label">이름</span>
                      <input
                        type="text"
                        className="userlist_input"
                        defaultValue={selectedItem.nickname}
                      ></input>
                    </div>
                    <div className="userlist_inputContainer">
                      <span className="userlist_label">이메일</span>
                      <input
                        type="text"
                        className="userlist_input"
                        defaultValue={selectedItem.email}
                      ></input>
                    </div>
                    <div className="userlist_inputContainer">
                      <span className="userlist_label">휴대전화</span>
                      <input
                        type="text"
                        className="userlist_input"
                        defaultValue={selectedItem.phonenumber}
                      ></input>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          )}
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

export default Userlist;
