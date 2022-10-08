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

  useEffect(() => {
    props.api.photos
      .list({ perPage: imagesPerPage, page: currentPage, orderBy: orderBy })
      .then((res) => {
        setImagesList(res.response.results);
      })
      .catch((err) => console.log("something went wrong getting images ", err));
  }, [currentPage, orderBy]);

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

      {imagesList ? (
        <div className="image-gallery">{renderImagesGallery()}</div>
      ) : (
        <BeatLoader className="spinner" color="black" />
      )}

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
