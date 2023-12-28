import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./Rating.css";
import Filter from "../../shared/UIElements/Filter";
import Pagetitle from "../../shared/Pagetitle/Pagetitle";
import Page from "../../shared/UIElements/Page";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

const Rating = () => {
  const { isLoading, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [itemlen, setItemLen] = useState(10);
  const [loadeddata, setLoadedData] = useState([]);
  const [error, setError] = useState();

  const searchparamshandler = (sort, value) => {
    //쿼리 생성 및 변경
    searchParams.set(`${sort}`, `${value}`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const getinfo = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/sell?${
            searchParams.get("page") ? `page=${searchParams.get("page")}` : 1
          }${
            searchParams.get("date")
              ? `&date=${searchParams.get("date")}`
              : "&date=desc"
          }${
            searchParams.get("rating")
              ? `&rank=${searchParams.get("rating")}`
              : ""
          }`,
          "GET",
          null,
          {
            token: `${localStorage.getItem("accessToken")}`, // 헤더에 토큰 추가
          }
        );
        setItemLen(responseData.totalcount);
        setLoadedData(responseData.laptop_sell_info);
      } catch (err) {
        setError(err);
      }
    };
    getinfo();
  }, [searchParams]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  }
  return (
    <React.Fragment>
      {!isLoading && loadeddata && (
        <div className="rating">
          <Pagetitle title="노트북 등급">
            나의 노트북을 모아볼 수 있습니다.
          </Pagetitle>
          <div className="rating_sort">
            <div className="rating-sort_filter center">
              <Filter title="날짜순"></Filter>
              {/*클릭 시 필터 표시*/}
            </div>
          </div>
          <div className="rating_notebook_contain">
            {loadeddata.map((notebook, index) => (
              <div
                className="rating_notebook "
                key={index}
                onClick={() =>
                  navigate(`/process`, {
                    state: {
                      totalRank: notebook.rank,
                      frontImage: notebook.laptop_sell_images[1].path,
                      id: notebook.laptop_sell_info_id,
                    },
                  })
                }
              >
                <div className="rating_notebook_imgbox center">
                  <img
                    className="rating_notebook_img"
                    src={
                      notebook.laptop_sell_images[1]
                        ? `${notebook.laptop_sell_images[1].path}`
                        : "null"
                    }
                    alt="notebookimage"
                  ></img>
                </div>

                <div>
                  <div className="rating_notebook_name ">
                    {notebook.device_name}
                  </div>
                  <div className="rating_notebook_model">
                    모델명: {notebook.serial_number}
                    <br />
                    등록일: {formatDate(notebook.create_date)}
                  </div>
                  <div className="rating_notebook_des">
                    {notebook.product_details}
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
          {itemlen != 0 ? (
            <Page
              itemlen={itemlen}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              searchparamshandler={searchparamshandler}
              itemcount={9}
            ></Page>
          ) : (
            <Page
              itemlen={1}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              searchparamshandler={searchparamshandler}
              itemcount={9}
            ></Page>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Rating;
