import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../../shared/UIElements/Page";
import Modal from "../../shared/UIElements/Modal";

import "./Userlist.css";

const dummydata = [
  {
    index: 1,
    id: "dac0eBdu",
    nickname: "Teddy",
    email: "jdh@naver.com",
    time: "2023. 10. 31",
    phoneNumer: "010-5988-5857",
  },
  {
    index: 2,
    id: "dac0efEdu",
    nickname: "최지원1",
    email: "Jiwon@gmail.com",
    time: "2023. 09. 12",
    phoneNumer: "010-5988-5857",
  },
  {
    index: 3,
    id: "dac0efEdu",
    nickname: "최지원2",
    email: "Jiwon@gmail.com",
    time: "2023. 10. 31",
    phoneNumer: "010-5988-5857",
  },
  {
    index: 4,
    id: "dac0efEdu",
    nickname: "최지원3",
    email: "Jiwon@gmail.com",
    time: "2023.  10. 31",
    phoneNumer: "010-5988-5857",
  },
  {
    index: 5,
    id: "dac0efEdu",
    nickname: "최지원4",
    email: "Jiwon@gmail.com",
    time: "2023. 10. 31",
    phoneNumer: "010-5988-5857",
  },
  {
    index: 6,
    id: "dac0efEdu",
    nickname: "최지원5",
    email: "Jiwon@gmail.com",
    time: "2023.  10. 31",
    phoneNumer: "010-5988-5857",
  },
  {
    index: 7,
    id: "dac0efEdu",
    nickname: "최지원6",
    email: "Jiwon@gmail.com",
    time: "2023. 10. 31",
    phoneNumer: "010-5988-5857",
  },
];

const itemlen = 100;

const Userlist = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

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
      <input className="paflist_search" placeholder="내용 검색하기"></input>
      <div className="paflist_title">유저 리스트</div>
      <div className="pafilist_main">
        <div className="pafilist_main_listtop">
          <input
            type="checkbox"
            onChange={handleSelectAll} // 전체 선택 상태 변경 핸들러 연결
            checked={isAllSelected()}
          ></input>
          <span style={{ marginLeft: "1rem" }}>Name</span>
          <span style={{ marginLeft: "11.8125rem" }}>E-mail</span>
          <span style={{ marginLeft: "13.5625rem " }}>Join Date</span>
        </div>
        {dummydata.map((list, index) => (
          <div className="pafilist_main_list" key={index}>
            <input
              type="checkbox"
              checked={isSelected(list)} // 항목의 선택 상태 확인
              onChange={() => handleItemSelect(list)}
            ></input>
            <span style={{ marginLeft: "1rem", width: "13.1875rem" }}>
              <span style={{ fontWeight: "bold" }}>{index + 1}</span>{" "}
              {list.nickname}
            </span>
            <span style={{ marginLeft: "1rem", width: "16.125rem" }}>
              {list.email}
            </span>
            <span style={{ width: "79px" }}>{list.time}</span>
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
              <div style={{ display: "flex", flexDirection: "space-between" }}>
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
                    defaultValue={selectedItem.phoneNumer}
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
        ></Page>
      </div>
    </React.Fragment>
  );
};

export default Userlist;
