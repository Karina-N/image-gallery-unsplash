import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ImageGallery(props) {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    props.updateCurrentPageNumber(pageNumber);
  }, [pageNumber]);

  return (
    <>
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
