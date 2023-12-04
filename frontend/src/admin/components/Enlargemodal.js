import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Enlargemodal.css";
import Backdrop from "../../shared/UIElements/Backdrop";
import Card from "../../shared/UIElements/Card";

const Enlargemodal = (props) => {
  return (
    <React.Fragment>
      {props.show && (
        <Backdrop onClick={props.onCancel} className="enlargemodal_backdrop" />
      )}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <Card className={`enlargemodal ${props.className}`}>
          {props.children}
        </Card>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Enlargemodal;
