import { Component } from "react";
import { createPortal } from "react-dom";
// import { ImCross } from "react-icons/im";
import "./Modal.scss";

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
      <div className="Modal__backdrop" onClick={this.hendleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
