import { Link } from "react-router-dom";

export default function ImageGallery(props) {
  return (
    <div>
      this is image gallery
      {props.imagesList.map((image) => {
        return (
          <Link key={image.id} to="#">
            <img src={image.urls.thumb} alt="" />
          </Link>
        );
      })}
    </div>
  );
}
