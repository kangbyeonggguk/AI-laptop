import React, { useEffect, useState } from "react";

import "./Mypage.css";
import Pagetitle from "../../shared/Pagetitle/Pagetitle";
import Mypageauth from "./Mypageauth";
import Mypageedit from "./Mypageedit";

const Mypage = () => {
  const [authcheck, setAuthCheck] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 렌더링 시 맨 위로 스크롤
  }, []);
  return (
    <div className="mypage-auth">
      <Pagetitle title="내 정보 수정">
        계정 정보를 확인하고 수정할 수 있습니다.
      </Pagetitle>
      {authcheck ? <Mypageedit /> : <Mypageauth setAuthCheck={setAuthCheck} />}
    </div>
  );
};

export default Mypage;
