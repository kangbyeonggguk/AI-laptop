import React, { useEffect, useState } from "react";

import "./Mypageauth.css";
import {
  validate,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_BIRTHDATE,
  VALIDATOR_PHONE,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validator";

const Mypageauth = (props) => {
  const [errname, setErrName] = useState(true);
  const [errdate, setErrDate] = useState(true);
  const [errphone, setErrPhone] = useState(true);
  const [errnumber, setErrNumber] = useState(true);
  const [authlist, setAuthList] = useState({
    name: false,
    date: false,
    number: false,
    auth: false,
  });
  const [inputlist, setInputList] = useState({
    name: "",
    date: "",
    number: "",
    phone: "",
  });

  const check = (e, validator, setstate) => {
    const value = e.target.value;
    const isValid = validate(value, [validator]);
    setstate(isValid);
  };

  const handleButtonClick = () => {
    setAuthList({
      ...authlist,
      name: errname,
      date: errdate,
      number: errnumber,
    });
  };
  useEffect(() => {
    if (
      Object.values(authlist).every((value) => value === true) &&
      Object.values(inputlist).every((value) => value !== "")
    ) {
      props.setAuthCheck(true);
    }
  }, [authlist, props.setAuthCheck]);

  return (
    <React.Fragment>
      <span className="mypage-auth_title">본인 인증하기</span>
      <div className="mypage-auth_contentcontain">
        <div className="mypage-auth_content">
          <span className="mypage-auth_content_name">이름</span>
          <input
            className="mypage-auth_content_input"
            onChange={(e) => {
              check(e, VALIDATOR_REQUIRE(), setErrName);
              setInputList({ ...inputlist, name: e.target.value });
            }}
            style={{ borderColor: !errname ? "#FF4848" : "" }}
          ></input>
          <span
            className="mypage-auth_content_err"
            style={{ color: !errname ? "#FF4848" : "" }}
          >
            {!errname && "이름을 입력해주세요."}
          </span>
        </div>

        <div className="mypage-auth_content">
          <span className="mypage-auth_content_name">생년월일</span>
          <input
            className="mypage-auth_content_input"
            onChange={(e) => {
              check(e, VALIDATOR_BIRTHDATE(), setErrDate);
              setInputList({ ...inputlist, date: e.target.value });
            }}
            style={{ borderColor: !errdate ? "#FF4848" : "" }}
          ></input>
          <span
            className="mypage-auth_content_err"
            style={{ color: !errdate ? "#FF4848" : "" }}
          >
            {!errdate && "0000.00.00형식으로 입력해주세요."}
          </span>
        </div>

        <div className="mypage-auth_content">
          <span className="mypage-auth_content_name">휴대전화 인증</span>
          <div style={{ display: "flex" }}>
            <input
              className="mypage-auth_content_input2"
              onChange={(e) => {
                check(e, VALIDATOR_PHONE(), setErrPhone);
                setInputList({ ...inputlist, phone: e.target.value });
              }}
              style={{
                borderColor: !errphone ? "#FF4848" : "",
              }}
            ></input>
            <button className="mypage-auth_content_btn">인증요청</button>
          </div>
          <span
            className="mypage-auth_content_err"
            style={{ color: !errphone ? "#FF4848" : "" }}
          >
            {"‘-’없이 휴대폰번호 11자리를 입력해주세요."}
          </span>
        </div>

        <div className="mypage-auth_content">
          <span className="mypage-auth_content_name">인증번호</span>
          <div style={{ display: "flex" }}>
            <input
              className="mypage-auth_content_input2"
              onChange={(e) => {
                check(e, VALIDATOR_MINLENGTH(6), setErrNumber);
                setInputList({ ...inputlist, number: e.target.value });
              }}
              style={{
                borderColor: !errnumber ? "#FF4848" : "",
              }}
            ></input>
            <button
              className="mypage-auth_content_btn"
              onClick={() => {
                setAuthList({
                  ...authlist,
                  auth: true,
                });
              }}
            >
              확인
            </button>
          </div>
          <span
            className="mypage-auth_content_err"
            style={{ color: !errnumber ? "#FF4848" : "" }}
          >
            {"인증번호 6자리를 입력해주세요."}
          </span>
        </div>
      </div>
      <div className="mypage-auth_btncontain">
        <button
          className="mypage-auth_btn"
          onClick={() => window.history.back()}
        >
          취소하기
        </button>
        <button
          className="mypage-auth_btn"
          style={{
            marginLeft: "0.5rem",
            background: "#4F80FF",
            border: "none",
            color: "#ffffff",
          }}
          onClick={handleButtonClick}
        >
          내 정보 수정하기
        </button>
      </div>
    </React.Fragment>
  );
};

export default Mypageauth;
