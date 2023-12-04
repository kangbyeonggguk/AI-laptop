import React, { useState, useEffect } from "react";

import "./Page.css";

const Page = (props) => {
  const searchParams = props.searchParams;
  const setSearchParams = props.setSearchParams;
  const searchparamshandler = props.searchparamshandler;
  const page = Math.ceil(props.itemlen / props.itemcount); //데이터 총 개수에 따라 페이지 계산
  const pagearray = [];
  for (let i = 1; i < page + 1; i++) {
    pagearray.push(i);
  }
  const [pageindex, setPageIndex] = useState(
    searchParams.get("page") === null
      ? 0
      : parseInt(pagearray.indexOf(parseInt(searchParams.get("page")))) //쿼리에 따라 페이지 체크
  );
  const pageplus = () => {
    //페이지 증가
    if (pageindex === page - 1) {
      setPageIndex(pageindex);
    } else {
      setPageIndex(pageindex + 1);
      searchParams.set("page", `${pageindex + 2}`);
      setSearchParams(searchParams);
    }
  };
  const pageminus = () => {
    //페이지 감소
    if (pageindex === 0) {
      setPageIndex(0);
    } else {
      setPageIndex(pageindex - 1);
      searchParams.set("page", `${pageindex}`);
      setSearchParams(searchParams);
    }
  };

  const [pagecut, setPagecut] = useState(0); //페이지를 5단위로 체크하고 변경
  useEffect(() => {
    if (pageindex > pagecut + 4) {
      setPagecut(pagecut + 5);
    } else if (pageindex < pagecut) {
      setPagecut(pagecut - 5);
    }
  }, [pageindex, pagecut]);

  return (
    <div className="page center">
      <img
        className="page_arrow"
        src="/img/rating/leftarrow.png"
        onClick={pageminus}
        alt="pagearrow"
      />
      <div className="page_num_contain center">
        {/*페이지 표시*/}
        {page < 5
          ? pagearray.map((page, index) => (
              <div
                key={index}
                className={`page_num center ${
                  pageindex === index ? " page_num_active" : ""
                }`}
                onClick={() => {
                  setPageIndex(index);
                  searchparamshandler("page", `${index + 1}`);
                }}
              >
                {page}
              </div>
            ))
          : pagearray.map((page, index) => {
              return (
                index >= pagecut &&
                index <= 4 + pagecut && (
                  <div
                    key={index}
                    className={`page_num center ${
                      pageindex === index ? " page_num_active" : ""
                    }`}
                    onClick={() => {
                      setPageIndex(index);
                      searchparamshandler("page", `${index + 1}`);
                    }}
                  >
                    {page}
                  </div>
                )
              );
            })}
      </div>
      <img
        className="page_arrow"
        src="/img/rating/rightarrow.png"
        onClick={pageplus}
        alt="pagearrow"
      />
    </div>
  );
};

export default Page;
