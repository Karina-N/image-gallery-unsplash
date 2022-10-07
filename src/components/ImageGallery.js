import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ImageGallery.scss";

export default function ImageGallery(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [sortingInput, setSortingInput] = useState(props.orderBy);

  useEffect(() => {
    props.updateCurrentPageNumber(pageNumber);
  }, [pageNumber]);

  const handleSortSelection = (e) => {
    setSortingInput(e.target.value);
    props.updateSorting(e.target.value);
  };

  return (
    <>
      <div className="sort-by-div">
        <h3>Sort by</h3>
        <select className="button" value={props.sortingInput} onChange={(e) => handleSortSelection(e)}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      <div className="image-gallery">
        {props.imagesList?.map((image) => {
          return (
            <div className="single-image" key={image.id}>
              <Link to={"/photos/" + image.id}>
                <img src={image.urls.small} alt={image.description} />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="pagination-buttons">
        <button className="button" onClick={() => pageNumber > 1 && setPageNumber(() => pageNumber - 1)}>
          previous
        </button>
        <span> {pageNumber} </span>
        <button className="button" onClick={() => setPageNumber(() => pageNumber + 1)}>
          next
        </button>
      </div>
    </>
  );
}
