import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.scss";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.hendleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.hendleKeyDown);
  }
  hendleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  hendleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={s.backdrop} onClick={this.hendleBackdropClick}>
        <div className={s.content}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default Modal;
