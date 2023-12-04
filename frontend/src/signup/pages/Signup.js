import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook"; //api호출
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const { isLoading, sendRequest, clearError, setIsLoading } = useHttpClient();
  const navigate = useNavigate();

  const initialFormData = {
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phoneNumber: "",
    platformType: "", // 추가: 플랫폼 타입
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isidAvailable, setIsidAvailable] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [idErrorMessage, setidErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [mobilePage, setMobilePage] = useState(1);

  const nextpage = () => {
    if (mobilePage === 1) {
      setMobilePage(2);
    } else if (mobilePage === 2) {
    }
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
      setInvalidEmail(!isValidEmail);
    }

    if (name === "phoneNumber") {
      const cleanedValue = value.replace(/[^0-9]/g, "");
      const formattedValue = cleanedValue.replace(
        /(\d{3})(\d{0,4})(\d{0,4})/,
        (match, p1, p2, p3) => {
          let result = p1;
          if (p2) result += `-${p2}`;
          if (p3) result += `-${p3}`;
          return result;
        }
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "password") {
      const isPasswordValid = validatePassword(value);
      setFormData({ ...formData, [name]: value });

      if (!isPasswordValid) {
        setError(true);
        setPasswordError(
          "영문 대/소문자, 숫자, 특수문자 중 2가지 이상 조합하여 8~16자를 입력하세요."
        );
      } else {
        setError(false);
        setPasswordError("");
      }
    }

    if (name === "confirmPassword") {
      setPasswordMismatch(value !== formData.password); // 비밀번호 확인과 일치 여부 확인
    } else if (name === "password" && formData.confirmPassword) {
      setPasswordMismatch(formData.confirmPassword !== value);
    } else {
      setPasswordMismatch(false);
    }

    if (name === "id") {
      setIsidAvailable(null);
    }
  };

  const validatePassword = (password) => {
    // 비밀번호 유효성 검사 규칙
    const lowercase = /[a-z]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const numeric = /[0-9]/.test(password);
    const special = /[@$!%*?&]/.test(password);
    const length = password.length >= 8 && password.length <= 16;

    let conditionsMet = 0;

    if (lowercase) conditionsMet++;
    if (uppercase) conditionsMet++;
    if (numeric) conditionsMet++;
    if (special) conditionsMet++;

    // 조건이 2개 이상 충족되고 길이가 8에서 16 사이인 경우 유효
    return conditionsMet >= 2 && length;
  };

  const handleCheckAvailability = async () => {
    if (formData.id.length < 4) {
      setidErrorMessage("4글자 이상 입력하세요.");
      setIsidAvailable(null);
      return;
    } else {
      setidErrorMessage(""); // Reset the error message
    }

    try {
      const response = await sendRequest(
        `http://127.0.0.1:8000/accounts/duplicate?id=${formData.id}`
      );

      if (response && response.status === 200) {
        if (response.data.isidAvailable) {
          setidErrorMessage("사용 가능한 아이디입니다.");
        } else {
          setidErrorMessage("이미 사용중인 아이디입니다.");
        }
      } else if (response && response.status === 400) {
        setidErrorMessage("사용 가능한 아이디입니다.");
      } else {
        console.error("사용 가능한 아이디:", response);

        setIsidAvailable(true);
      }
    } catch (error) {
      setIsidAvailable();
    }
  };

  const handleSubmit = async () => {
    if (
      formData.id.length < 4 ||
      // !isidAvailable || // 이 줄이 변경된 부분
      isidAvailable === false || // 변경된 부분
      !validatePassword(formData.password) || // 비밀번호 규칙 확인
      passwordMismatch ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
      !/^010-([0-9]{4})-([0-9]{4})$/.test(formData.phoneNumber) ||
      formData.name.trim() === "" ||
      formData.phoneNumber.trim() === ""
    ) {
      alert("모두 올바르게 작성하세요.");
      return;
    }

    try {
      const formDataToSend = {
        id: formData.id,
        platform_type: "R",
        admin: false,
        password: formData.password,
        nickname: formData.name,
        email: formData.email,
        phonenumber: formData.phoneNumber,
        create_date: new Date().toISOString(),
      };

      const responseData = await sendRequest(
        "http://127.0.0.1:8000/accounts",
        "POST",
        JSON.stringify(formDataToSend),
        {
          "Content-Type": "application/json",
        }
      );

      console.log("성공");
      // 성공적으로 회원가입한 경우의 로직
      navigate("/login");
    } catch (err) {
      // 오류 처리
      console.log("실패");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setPasswordMismatch(false);
    setIsidAvailable(null);
  };

  return (
    <div>
      <h1 className="signup-text">회원가입</h1>
      <form className="signup-form">
        <div
          style={{
            display: isMobile && mobilePage !== 1 ? "none" : "block",
          }}
        >
          <label className="signup-label">아이디 </label>
          <div className="id-content">
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="id-input"
              placeholder="아이디를 입력해주세요."
            />
            <button
              type="button"
              className="double_check"
              onClick={handleCheckAvailability}
            >
              중복확인
            </button>
          </div>
          {idErrorMessage && (
            <p className="isuserid_available">{idErrorMessage}</p>
          )}

          {isidAvailable !== null && (
            <p
              className={`isuserid_available ${
                isidAvailable ? "available" : "used"
              }`}
            >
              {isidAvailable
                ? "사용 가능한 아이디입니다."
                : "이미 사용 중인 아이디입니다."}
            </p>
          )}

          <label className="signup-label">비밀번호 </label>
          <input
            className={`signup-input ${error ? "error-border" : ""}`}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요."
          />
          {passwordError && (
            <p className="password_mismatch">{passwordError}</p>
          )}

          <label className="signup-label">비밀번호 확인 </label>
          <input
            className={`signup-input ${
              formData.confirmPassword && passwordMismatch ? "error-border" : ""
            }`}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력해주세요."
          />
          {passwordMismatch && formData.confirmPassword && (
            <p className="password_mismatch">
              비밀번호가 일치하지 않습니다. 다시 입력해주세요.
            </p>
          )}
        </div>
        <div
          style={{
            display: isMobile && mobilePage !== 2 ? "none" : "block",
          }}
        >
          <label className="signup-label">이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력해주세요."
            className="signup-input"
          />

          <label className="signup-label">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요."
            className="signup-input"
          />
          {invalidEmail && formData.email && (
            <p className="invalid_email">
              잘못된 형식의 이메일입니다. 다시 입력해주세요.
            </p>
          )}

          <label className="signup-label">휴대전화</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="휴대전화 번호를 입력해주세요."
            className="signup-input"
          />
        </div>
      </form>

      <div className="signup-bottom">
        <button type="button" className="reset_button" onClick={handleReset}>
          초기화
        </button>
        <button
          className="signup-next"
          style={{
            display: isMobile && mobilePage === 1 ? "block" : "none",
            marginLeft: "0.5rem",
            background: "#4F80FF",
            border: "none",
            color: "#ffffff",
          }}
          onClick={nextpage}
        >
          {mobilePage === 1 ? "다음으로" : "다음 단계"}
        </button>
        <button
          type="button"
          className="signup_button"
          onClick={handleSubmit}
          style={{
            display: isMobile ? (mobilePage === 2 ? "block" : "none") : "block",
          }}
        >
          회원가입 하기
        </button>
      </div>
    </div>
  );
};

export default Signup;
