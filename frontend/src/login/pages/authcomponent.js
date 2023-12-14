// // AuthComponent.js

// import React, { useEffect } from "react";
// import { useHttpClient } from "../../shared/hooks/http-hook";
// import { useParams } from "react-router-dom";

// const AuthComponent = () => {
//   const { isLoading, sendRequest, clearError } = useHttpClient(); // useHttpClient 훅 사용
//   const { code } = useParams();

//   useEffect(() => {
//     const handleCodeReceived = async () => {
//       const code = new URL(window.location.href).searchParams.get("code");
//       console.log(code);

//       if (code) {
//         try {
//           const responseData = await sendRequest(
//             "http://127.0.0.1:8000/accountes/login/kakao",
//             "POST",
//             JSON.stringify({ code }),
//             {
//               "Content-Type": "application/json",
//             }
//           );

//           console.log("Response from backend:", responseData);
//         } catch (error) {
//           console.error("Error sending code to backend:", error.message);
//         }
//       }
//     };

//     handleCodeReceived();
//   }, [code, sendRequest]);
// };

// export default AuthComponent;
