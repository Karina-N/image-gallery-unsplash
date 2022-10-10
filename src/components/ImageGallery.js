import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ImageGallery.scss";
import BeatLoader from "react-spinners/BeatLoader";

export default function ImageGallery(props) {
  const [imagesList, setImagesList] = useState(null);
  const [imagesPerPage, setImagesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("latest");
  const [sortingInput, setSortingInput] = useState(props.orderBy);
  const [retryCounter, setRetryCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getImagesList();
  }, [currentPage, orderBy]);

  const getImagesList = () => {
    setErrorMessage(null);
    props.api.photos
      .list({ perPage: imagesPerPage, page: currentPage, orderBy: orderBy })
      .then((res) => {
        if (res.type === "error") {
          throw new Error();
        }
        setImagesList(res.response.results);
      })
      .catch(() => {
        setErrorMessage("Sorry, we can't find what you are looking for... ");
        if (retryCounter <= 3) {
          setRetryCounter((prevCounter) => prevCounter + 1);
        }
      });
  };
  const handleSortSelection = (e) => {
    setSortingInput(e.target.value);
    setOrderBy(e.target.value);
  };

  const goToNextPage = (difference) => {
    if (currentPage === 1 && difference === -1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + difference);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderImagesGallery = () => {
    return imagesList.map((image) => {
      return (
        <div className="single-image" key={image.id}>
          <Link to={"/photos/" + image.id}>
            <img src={image.urls.small} alt={image.description} />
          </Link>
        </div>
      );
    });
  };

  const renderContent = () => {
    if (errorMessage) {
      return <p className="error-message">{errorMessage}</p>;
    } else if (imagesList) {
      return <div className="image-gallery">{renderImagesGallery()}</div>;
    } else {
      return <BeatLoader className="spinner" color="black" />;
    }
  };

  return (
    <>
      <div className="sort-by-div">
        <h3>Sort by</h3>
        <select className="button" value={sortingInput} onChange={(e) => handleSortSelection(e)}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      <div className="main-content">{renderContent()}</div>

      <div className="pagination-buttons">
        <button className="button" onClick={() => goToNextPage(-1)}>
          previous
        </button>
        <span> {currentPage} </span>
        <button className="button" onClick={() => goToNextPage(1)}>
          next
        </button>
      </div>
    </>
  );
}
