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
import { useHttpClient } from "../../shared/hooks/http-hook";

const Mypageauth = (props) => {
  const { isLoading, sendRequest } = useHttpClient(); //api호출 훅 불러오기

  const [errphone, setErrPhone] = useState(true);
  const [errnumber, setErrNumber] = useState(true);
  const [authlist, setAuthList] = useState({
    number: false,
    auth: false,
  });
  const [inputlist, setInputList] = useState({
    number: "",
    phone: "",
  });

  const check = (e, validator, setstate) => {
    const value = e.target.value;
    const isValid = validate(value, [validator]);
    setstate(isValid);
  };

  const handleButtonClick = () => {
    if (
      Object.values(authlist).every((value) => value === true) &&
      Object.values(inputlist).every((value) => value !== "")
    ) {
      props.setAuthCheck(true);
    }
  };

  const sendsms = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/send`,
        "POST",
        JSON.stringify({ phone: inputlist.phone }),
        {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("accessToken")}`, // 헤더에 토큰 추가
        }
      );
      setAuthList({
        ...authlist,
        number: true,
        auth: false,
      });
      alert("인증번호가 발송되었습니다.");
    } catch (err) {
      alert("휴대폰번호를 다시 입력해주세요.");
      setErrPhone(false);
    }
  };
  const verify = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/verify`,
        "POST",
        JSON.stringify({ phone: inputlist.phone, auth_num: inputlist.number }),
        {
          "Content-Type": "application/json",
        }
      );
      setAuthList({
        ...authlist,
        auth: true,
      });
      alert("인증번호가 확인되었습니다.");
    } catch (err) {
      setAuthList({
        ...authlist,
        auth: false,
      });
      alert("인증번호를 다시 입력해주세요.");
      setErrNumber(false);
    }
  };

  return (
    <React.Fragment>
      <span className="mypage-auth_title">본인 인증하기</span>
      <div className="mypage-auth_contentcontain">
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
            <button className="mypage-auth_content_btn" onClick={sendsms}>
              인증요청
            </button>
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
              readOnly={authlist.auth}
            ></input>
            <button
              className="mypage-auth_content_btn"
              onClick={(e) => {
                verify();
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
