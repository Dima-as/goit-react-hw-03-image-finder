import { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImSearch } from "react-icons/im";
import s from "./Searchbar.module.scss";
import PropTypes from "prop-types";

class Searchbar extends Component {
  state = {
    inputName: "",
  };

  handleNameChange = (e) => {
    this.setState({ inputName: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputName.trim() === "") {
      return toast.error("Wow so easy !");
    }
    this.props.onSubmit(this.state.inputName);
    this.setState({ inputName: "" });
  };
  hendle;
  render() {
    return (
      <>
        <header>
          <form onSubmit={this.handleSubmit} className={s.form}>
            <input
              autoComplete="off"
              autoFocus
              type="text"
              name="inputName"
              placeholder="Search images and photos"
              onChange={this.handleNameChange}
              value={this.state.inputName}
              className={s.input}
            />
            <button type="submit" className={s.button}>
              <ImSearch style={{ marginRight: 8 }} />
              <span>Search</span>
            </button>
          </form>
        </header>
      </>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
