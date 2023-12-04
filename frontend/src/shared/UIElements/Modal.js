import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";
import Backdrop from "./Backdrop";
import Card from "./Card";

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} className={props.Backdropclass} />}
      {props.detail && <div className="backdrop_double" onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200} // 200ms 동안 트랜지션 지속
        classNames="modal">
        <>
          <Card className={`modal ${props.className}`}>{props.children}</Card>
          {props.detail && (
            <div className="slide_modal_container ">
              <img src="/img/admin/Left_arrow.png" alt="left_arrow" className="modal_arrow_detail" />
              <div className="modal_img_slide_container" onClick={() => props.onImageClick(props.front)}>
                <img src={props.front} alt="front" className="detail_aspect_laptop" />
              </div>
              <div className="modal_img_slide_container" onClick={() => props.onImageClick(props.back)}>
                <img src={props.back} alt="back" className="detail_aspect_laptop" />
              </div>
              <div className="modal_img_slide_container" onClick={() => props.onImageClick(props.keyboard)}>
                <img src={props.keyboard} alt="keyboard" className="detail_aspect_laptop" />
              </div>
              <div className="modal_img_slide_container" onClick={() => props.onImageClick(props.monitor)}>
                <img src={props.monitor} alt="monitor" className="detail_aspect_laptop" />
              </div>
              <img src="/img/admin/Right_arrow.png" alt="left_arrow" className="modal_arrow_detail" />
            </div>
          )}
        </>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
