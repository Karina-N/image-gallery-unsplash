import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import BeatLoader from "react-spinners/BeatLoader";

export default function ImageDetails(props) {
  const { photoId } = useParams();
  const [imageDetails, setImageDetails] = useState(null);

  useEffect(() => {
    props.api.photos
      .get({ photoId })
      .then((singleImage) => {
        setImageDetails(singleImage.response);
      })
      .catch(() => console.log("error getting single image details"));
  }, []);

  const renderImageDetails = () => {
    return (
      <div className="single-image-div">
        <img className="single-image" src={imageDetails.urls.regular} alt={imageDetails.description} />
        <p>
          Photo by
          <span>
            <a href={imageDetails.user.links.html} target="_blank" rel="noreferrer">
              {imageDetails.user.name}
            </a>
          </span>
          on
          <span>
            <a
              href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral"
              target="_blank"
              rel="noreferrer"
            >
              Unsplash
            </a>
          </span>
        </p>
        <p>
          Published:
          <span>
            <ReactTimeAgo date={Date.parse(imageDetails.created_at)} locale="en-US" timeStyle="round-minute" />
          </span>
        </p>
        {imageDetails.exif.name && <p>Camera: {imageDetails.exif.name}</p>}
      </div>
    );
  };

  return (
    <>
      <Link to="/" className="button home-button">
        Home
      </Link>
      {imageDetails ? renderImageDetails() : <BeatLoader className="spinner" color="black" />}
    </>
  );
}
