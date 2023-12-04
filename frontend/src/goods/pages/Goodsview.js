import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Goodsview.css";
import Pagetitle from "../../shared/Pagetitle/Pagetitle";
import Imgslide from "../components/Imgslide";
import Modal from "../../shared/UIElements/Modal";

const Goodsview = (props) => {
  const { goodsNo } = useParams();
  const isLoading = props.isLoading;
  const loadedGoods = props.loadedGoods.filter(
    (item) => item.laptop_info_list_id === parseInt(goodsNo)
  );
  const imagePaths =
    loadedGoods.length > 0
      ? loadedGoods[0].laptop_info_list_image
          .map((image) => image.path)
          .reverse()
      : [];

  const [mainImg, setMainImg] = useState("");
  useEffect(() => {
    if (
      loadedGoods.length > 0 &&
      loadedGoods[0].laptop_info_list_image.length > 0 &&
      !mainImg
    ) {
      setMainImg(
        loadedGoods[0].laptop_info_list_image[
          loadedGoods[0].laptop_info_list_image.length - 1
        ].path
      );
    }
    console.log(loadedGoods);
  }, [loadedGoods]);

  // console.log(imagePaths);
  const [showbasket, setShowBasket] = useState(false);
  const [showpurchase, setShowPurchase] = useState(false);
  const closebasket = () => {
    setShowBasket(false);
  };
  const openbasket = () => {
    setShowBasket(true);
  };
  const closepurchase = () => {
    setShowPurchase(false);
  };
  const openpurchase = () => {
    setShowPurchase(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 렌더링 시 맨 위로 스크롤
  }, []);

  return (
    <React.Fragment>
      {!isLoading && loadedGoods[0] && (
        <div className="goodsview">
          <Modal
            show={showpurchase}
            onCancel={closepurchase}
            className="goodsview_modal"
          >
            <div className="good_modal_box">
              <img
                className="goodsview_modal_cancle"
                src="/img/modal/Cancle.png"
                alt="modalcancle"
                onClick={closepurchase}
              />
              <img
                className="goodsview_modal_img"
                src="/img/goodsview/Default.png"
                alt="modaldefault"
              />
              <a className="goodsview_modal_text">구매가 완료되었습니다!</a>
              <button
                className="goodsview_modal_button"
                onClick={closepurchase}
              >
                확인
              </button>
            </div>
          </Modal>
          <Modal
            show={showbasket}
            onCancel={closebasket}
            className="goodsview_modal"
          >
            <div className="good_modal_box">
              <img
                className="goodsview_modal_cancle"
                src="/img/modal/Cancle.png"
                alt="modalcancle"
                onClick={closebasket}
              />
              <img
                className="goodsview_modal_img"
                src="/img/goodsview/Smile.png"
                alt="modalsmile"
              />
              <a
                className="goodsview_modal_text"
                style={{ marginTop: "0.5rem" }}
              >
                장바구니에 상품이 담겼습니다!
              </a>
              <div className="center">
                <button
                  className="goodsview_modal_button"
                  onClick={closebasket}
                  style={{
                    color: "#759CFF",
                    background: "#FAFBFF",
                    border: "solid 0.5px #759cff",
                  }}
                >
                  장바구니로 가기
                </button>
                <button
                  className="goodsview_modal_button"
                  onClick={closebasket}
                  style={{ marginLeft: "0.5rem" }}
                >
                  쇼핑 계속하기
                </button>
              </div>
            </div>
          </Modal>
          <Pagetitle title="구매하기">
            판매자들의 노트북을 구매할 수 있습니다
          </Pagetitle>
          <div className="goodsview_contain">
            <div className="goodsview_imgcontain">
              <div className="goodsview_img_mainbox center">
                {loadedGoods[0].laptop_info_list_image.length > 0 ? (
                  <img
                    className="goodsview_img_main"
                    src={mainImg}
                    alt="goodsviewmainimg"
                  />
                ) : (
                  <div>No Image Available</div>
                )}
              </div>
              <img
                src={`/img/rating/${loadedGoods[0].rank}.png`}
                className="goodsview_rank"
                alt="goodsviewrank"
              ></img>

              <Imgslide statusimg={imagePaths} setMainImg={setMainImg} />
            </div>
            <div className="goodsview_descontain">
              <div className="goodsview_des_name">
                {loadedGoods[0].title}
                <div className="goodsview_mobile_price">
                  <a
                    style={{
                      fontWeight: "700",
                      fontSize: "0.875rem",
                      color: "#4f80ff",
                    }}
                  >
                    {loadedGoods[0].price_time_sale
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </a>
                  <a
                    style={{
                      marginLeft: "0.3125rem",
                      fontWeight: "400",
                      fontSize: "0.75rem",
                      color: "#999999",
                      textDecoration: "line-through",
                    }}
                  >
                    {loadedGoods[0].price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </a>
                </div>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">짧은 내용</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].hashtag
                    .split(",")
                    .map((des, index) => `#${des} `)}
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">정가</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">타임세일가</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].price_time_sale
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">구매제한</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].purchase_limit}개
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">배송비</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].delivery_fee}/택배
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">상품코드</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].product_code}
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">자체상품코드</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].own_product_code}
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">브랜드</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].brand}
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">제조사</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].manufacturing_company}
                </a>
              </div>

              <div className="goodsview_des_text">
                <a className="goodsview_des_text_key">상품재고</a>
                <a className="goodsview_des_text_value">
                  {loadedGoods[0].stock}개
                </a>
              </div>
            </div>
          </div>
          <div className="goodsview_price-btn">
            <div className="goodsview_pricecontain">
              <div className="goodsview_pricebox">
                <a className="goodsview_price_text">총 상품금액</a>
                <a className="goodsview_price_price1">
                  {loadedGoods[0].price_time_sale
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </a>
              </div>
              <hr className="goodsview_price_hr"></hr>
              <div
                className="goodsview_pricebox"
                style={{ height: "2.1875rem" }}
              >
                <a
                  className="goodsview_price_text"
                  style={{ color: "#4F80FF" }}
                >
                  총 합계금액
                </a>
                <a className="goodsview_price_price2">
                  {loadedGoods[0].price_time_sale
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </a>
              </div>
            </div>
            <div className="goodsview_btncontain">
              <button className="goodsview_btn" onClick={openbasket}>
                장바구니
              </button>
              <button
                className="goodsview_btn"
                style={{ color: "#ffffff", background: "#4f80ff" }}
                onClick={openpurchase}
              >
                바로구매
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Goodsview;
