import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./Filter.css";
import Modal from "./Modal";

const Filter = (props) => {
  let pricecheck = false;
  if (props.title === "낮은가격순") {
    pricecheck = true;
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const searchparamshandler = (sort, value) => {
    //쿼리 생성
    searchParams.set(`${sort}`, `${value}`);
    setSearchParams(searchParams);
  };

  const [showFilter, setShowFilter] = useState(false); //필터 활성화,비활성화
  const closefilter = () => {
    setShowFilter(false);
  };
  const openfilter = () => {
    setShowFilter(true);
    filtercancle();
  };

  const pricearray = ["all", "asc", "desc"]; //쿼리에 따라 name 메뉴 체크
  const [priceIndex, setPriceIndex] = useState(
    searchParams.get("price") === null
      ? 0
      : parseInt(pricearray.indexOf(searchParams.get("price")))
  );

  const datearray = ["all", "asc", "desc"]; //쿼리에 따라 date 메뉴 체크
  const [dateIndex, setDateIndex] = useState(
    searchParams.get("date") === null
      ? 0
      : parseInt(datearray.indexOf(searchParams.get("date")))
  );

  const namearray = ["all", "asc", "desc"]; //쿼리에 따라 name 메뉴 체크
  const [nameIndex, setNameIndex] = useState(
    searchParams.get("name") === null
      ? 0
      : parseInt(namearray.indexOf(searchParams.get("name")))
  );

  const ratingarray = ["", "ss", "s", "a", "b", "c"]; //쿼리에 따라 name 메뉴 체크
  const [ratingIndex, setRatingIndex] = useState(
    searchParams.get("rating") === null
      ? 0
      : parseInt(ratingarray.indexOf(searchParams.get("rating")))
  );

  const [filter, setFilter] = useState({
    //filter 내용 초기값 지정
    rating: `${
      searchParams.get("rating") === null
        ? ""
        : ratingarray[parseInt(ratingarray.indexOf(searchParams.get("rating")))]
    }`,
    ...(pricecheck
      ? {
          price: `${
            searchParams.get("price") === null
              ? "asc"
              : datearray[
                  parseInt(datearray.indexOf(searchParams.get("price")))
                ]
          }`,
        }
      : {
          date: `${
            searchParams.get("date") === null
              ? "desc"
              : datearray[parseInt(datearray.indexOf(searchParams.get("date")))]
          }`,
          name: `${
            searchParams.get("name") === null
              ? "asc"
              : namearray[parseInt(namearray.indexOf(searchParams.get("name")))]
          }`,
        }),
  });
  const filtersave = () => {
    //저장하기 클릭 시 filter에 따른 쿼리 생성
    for (const key in filter) {
      searchparamshandler(`${key}`, `${filter[key]}`);
      searchparamshandler(`page`, 1);
    }
  };
  const filtercancle = () => {
    //취소하기 선택 시 선택 된 버튼과 filter값 초기화
    setDateIndex(
      searchParams.get("date") === null
        ? 0
        : parseInt(datearray.indexOf(searchParams.get("date")))
    );
    setNameIndex(
      searchParams.get("date") === null
        ? 0
        : parseInt(datearray.indexOf(searchParams.get("date")))
    );
    setRatingIndex(
      searchParams.get("rating") === null
        ? 0
        : parseInt(ratingarray.indexOf(searchParams.get("rating")))
    );

    if (pricecheck) {
      setPriceIndex(
        searchParams.get("price") === null
          ? 0
          : parseInt(pricearray.indexOf(searchParams.get("price")))
      );
    }

    setFilter({
      rating: `${
        searchParams.get("rating") === null
          ? ""
          : ratingarray[
              parseInt(ratingarray.indexOf(searchParams.get("rating")))
            ]
      }`,
      ...(pricecheck
        ? {
            price: `${
              searchParams.get("price") === null
                ? "asc"
                : datearray[
                    parseInt(datearray.indexOf(searchParams.get("price")))
                  ]
            }`,
          }
        : {
            date: `${
              searchParams.get("date") === null
                ? "all"
                : datearray[
                    parseInt(datearray.indexOf(searchParams.get("date")))
                  ]
            }`,
            name: `${
              searchParams.get("name") === null
                ? "all"
                : namearray[
                    parseInt(namearray.indexOf(searchParams.get("name")))
                  ]
            }`,
          }),
    });
  };

  return (
    <React.Fragment>
      <Modal show={showFilter} onCancel={closefilter} className="filter-modal">
        <div className="filter-modal_title">
          <div className="filter-modal_title_text">필터</div>
          <img
            className="filter-modal_title_cancle"
            src="/img/modal/Cancle.png"
            alt="Cancle"
            onClick={closefilter}
          />
        </div>
        {pricecheck && (
          <>
            <div className="filter-modal_date">가격</div>
            <div style={{ display: "flex" }}>
              {[
                ["전체", "asc"],
                ["오름차순", "asc"],
                ["내림차순", "desc"],
              ].map((menu, index) => (
                <div
                  key={index}
                  className={`filter-modal_menu center ${
                    priceIndex === index ? " filter-modal_menu_active" : "" //선택된 메뉴 css 변경
                  }`}
                  onClick={() => {
                    setPriceIndex(index);
                    setFilter((prev) => ({ ...prev, price: `${menu[1]}` }));
                  }}
                >
                  {menu[0]}
                </div>
              ))}
            </div>
          </>
        )}
        {!pricecheck && (
          <>
            <div
              className={pricecheck ? "filter-modal_name" : "filter-modal_date"}
            >
              날짜
            </div>
            <div style={{ display: "flex" }}>
              {[
                ["전체", "all"],
                ["오름차순", "asc"],
                ["내림차순", "desc"],
              ].map((menu, index) => (
                <div
                  key={index}
                  className={`filter-modal_menu center ${
                    dateIndex === index ? " filter-modal_menu_active" : "" //선택된 메뉴 css 변경
                  }`}
                  onClick={() => {
                    setDateIndex(index);
                    setFilter((prev) => ({ ...prev, date: `${menu[1]}` }));
                  }}
                >
                  {menu[0]}
                </div>
              ))}
            </div>
            <div className="filter-modal_name">이름</div>
            <div style={{ display: "flex" }}>
              {[
                ["전체", "all"],
                ["오름차순", "asc"],
                ["내림차순", "desc"],
              ].map((menu, index) => (
                <div
                  key={index}
                  className={`filter-modal_menu center ${
                    nameIndex === index ? " filter-modal_menu_active" : "" //선택된 메뉴 css 변경
                  }`}
                  onClick={() => {
                    setNameIndex(index);
                    setFilter((prev) => ({ ...prev, name: `${menu[1]}` }));
                  }}
                >
                  {menu[0]}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="filter-modal_name">등급</div>
        <div style={{ display: "flex", flexWrap: "wrap", width: "14rem" }}>
          {[
            ["전체", ""],
            ["SS", "ss"],
            ["S", "s"],
            ["A", "a"],
            ["B", "b"],
            ["C", "c"],
          ].map((menu, index) => (
            <div
              key={index}
              className={`filter-modal_menu center ${
                ratingIndex === index ? " filter-modal_menu_active" : "" //선택된 메뉴 css 변경
              }`}
              onClick={() => {
                setRatingIndex(index);
                setFilter((prev) => ({ ...prev, rating: `${menu[1]}` }));
              }}
            >
              {menu[0]}
            </div>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="filter-modal_savebtn center"
            onClick={() => {
              closefilter();
              filtersave();
            }}
          >
            저장하기
          </div>
          <div
            className="filter-modal_canclebtn center"
            onClick={() => {
              filtercancle();
              closefilter();
            }}
          >
            취소
          </div>
        </div>
      </Modal>
      <img
        className="filterimg"
        src="/img/rating/Filter.png"
        alt="filterimage"
      ></img>
      <div className="filter" onClick={openfilter}>
        {props.title}
      </div>
    </React.Fragment>
  );
};

export default Filter;
