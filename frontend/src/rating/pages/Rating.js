import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./Rating.css";
import Filter from "../../shared/UIElements/Filter";
import Pagetitle from "../../shared/Pagetitle/Pagetitle";
import Page from "../../shared/UIElements/Page";

const dummydata = [
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "SS",
  },
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "S",
  },
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "A",
  },
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "B",
  },
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "C",
  },
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "SS",
  },
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "S",
  },
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "A",
  },
  {
    img: "/img/rating/notebook.png",
    name: "맥북 에어",
    model: "NT950XBE-X716A",
    date: "2023.09. 08",
    description:
      "모서리 부분 파손이 살짝 있음. 화면 상태는 기스 없이 깔끔한 편. ",
    rank: "B",
  },
];
const itemlen = 100;

const Rating = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchparamshandler = (sort, value) => {
    //쿼리 생성 및 변경
    searchParams.set(`${sort}`, `${value}`);
    setSearchParams(searchParams);
  };

  const menuarray = ["recent", "soldout", "interior"]; //쿼리에 따라 menu 체크
  const [menuindex, setMenuIndex] = useState(
    searchParams.get("situation") === null
      ? 0
      : parseInt(menuarray.indexOf(searchParams.get("situation")))
  );

  return (
    <React.Fragment>
      <div className="rating">
        <Pagetitle title="노트북 등급">
          나의 노트북을 모아볼 수 있습니다.
        </Pagetitle>
        <div className="rating_sort">
          <div className="rating_sort_menucontain">
            {[
              ["최근 등급 측정 노트북", "recent"],
              ["판매한 노트북", "soldout"],
              ["내부 등급 측정 노트북", "interior"],
            ].map((menu, index) => (
              <div
                key={index}
                className={`rating_sort_menu center ${
                  menuindex === index ? " rating_sort_menu_active" : "" //선택된 메뉴 css 변경(기본은 첫번째 메뉴 활성화)
                }`}
                onClick={() => {
                  setMenuIndex(index);
                  searchparamshandler("situation", menu[1]); //메뉴 선택시 쿼리도 생성
                }}
              >
                {menu[0]}
              </div>
            ))}
          </div>
          <div className="rating-sort_filter center">
            <Filter title="날짜순"></Filter>
            {/*클릭 시 필터 표시*/}
          </div>
        </div>
        <div className="rating_notebook_contain">
          {dummydata.map((notebook, index) => (
            <div className="rating_notebook " key={index}>
              <div className="rating_notebook_imgbox center">
                <img
                  className="rating_notebook_img"
                  src={`${notebook.img}`}
                  alt="notebookimage"
                ></img>
              </div>

              <div>
                <div className="rating_notebook_name ">{notebook.name}</div>
                <div className="rating_notebook_model">
                  모델명: {notebook.model}
                  <br />
                  등록일: {notebook.date}
                </div>
                <div className="rating_notebook_des">
                  {notebook.description}
                </div>
                <img
                  className="rating_notebook_rank"
                  src={`/img/rating/${notebook.rank}.png`}
                  alt="rankimage"
                ></img>
              </div>
            </div>
          ))}
        </div>
        <Page
          itemlen={itemlen}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          searchparamshandler={searchparamshandler}
          itemcount={9}
        ></Page>
      </div>
    </React.Fragment>
  );
};

export default Rating;
