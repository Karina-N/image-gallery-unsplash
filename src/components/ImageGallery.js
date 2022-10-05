import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ImageGallery(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [sortingInput, setSortingInput] = useState(props.orderBy);

  useEffect(() => {
    props.updateCurrentPageNumber(pageNumber);
  }, [pageNumber]);

  const handleSelection = (e) => {
    setSortingInput(e.target.value);
    props.updateSorting(e.target.value);
  };

  return (
    <>
      <div>
        Sort by
        <select value={props.sortingInput} onChange={(e) => handleSelection(e)}>
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
          <option value="views">Views</option>
          <option value="downloads">Downloads</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div>
        {props.imagesList?.map((image) => {
          return (
            <Link key={image.id} to={"/photos/" + image.id}>
              <img src={image.urls.thumb} alt="" />
            </Link>
          );
        })}
      </div>
      <button onClick={() => pageNumber > 1 && setPageNumber(() => pageNumber - 1)}>previous</button>
      <span> {pageNumber} </span>
      <button onClick={() => setPageNumber(() => pageNumber + 1)}>next</button>
    </>
  );
}
