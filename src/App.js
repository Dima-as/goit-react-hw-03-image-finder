import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import ImageListGallery from "./components/ImageListGallery/ImageListGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageSearch from "./components/ImageSearch/ImageSearch";
import ErrorImages from "./components/ErrorImages/ErrorImages";
import API from "./service";
import Loaders from "./components/Loader/Loader";
import Button from "./components/Button/Button";

class App extends Component {
  state = {
    inputName: null,
    page: 1,
    error: null,
    status: "idle",
    search: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.inputName;
    const nextName = this.state.inputName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ search: [], status: "panding" });
    }
    if (prevName !== nextName || prevPage !== nextPage) {
      API.fetchImage(nextName, nextPage)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return (
              toast.error(`We did not find ${nextName}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }),
              this.setState({ status: "idle" })
            );
          }
          return this.setState(({ search }) => ({
            search: [...search, ...hits],
            nextPage: this.onLoadMoreBtn,
            status: "resolved",
          }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handleFormSubmit = (inputName) => {
    this.setState({ inputName });
  };

  scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  onLoadMoreBtn = (e) => {
    e.preventDefault();
    this.setState(({ page }) => ({
      page: page + 1,
    }));
    this.scrollPageToEnd();
  };

  render() {
    const { error, status, search } = this.state;

    if (status === "idle") {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer autoClose={4000} />
          <ImageSearch />
        </div>
      );
    }
    if (status === "panding") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loaders />
        </>
      );
    }
    if (status === "rejected") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ErrorImages message={error.message} />
        </>
      );
    }
    if (status === "resolved") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer autoClose={4000} />
          <ul>
            <ImageListGallery searchImages={search} />
          </ul>
          <Button onSubmitPage={this.onLoadMoreBtn} />
        </>
      );
    }
  }
}

export default App;
