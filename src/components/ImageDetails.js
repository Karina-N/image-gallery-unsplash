import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import BeatLoader from "react-spinners/BeatLoader";

export default function ImageDetails(props) {
  const { photoId } = useParams();
  const [imageDetails, setImageDetails] = useState(null);
  const [retryCounter, setRetryCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getSingleImageDetails();
  }, [retryCounter]);

  const getSingleImageDetails = () => {
    setErrorMessage(null);
    props.api.photos
      .get({ photoId })
      .then((singleImage) => {
        if (singleImage.type === "error") {
          throw new Error(); // ensure all failing requests are catched ("unsplash-js" does not always throws an error)
        }

        setImageDetails(singleImage.response);
      })
      .catch(() => {
        setErrorMessage("Sorry, we can't find what you are looking for...");
        if (retryCounter <= 3) {
          setRetryCounter((prevCounter) => prevCounter + 1);
        }
      });
  };

  const renderImageDetails = () => {
    return (
      <div className="single-image-div">
        <img className="single-image" src={imageDetails.urls.regular} alt={imageDetails.description} />
        <p>
          Photo by
          <span>
            <a
              href={imageDetails.user.links.html + "?utm_source=zedge_image_gallery&utm_medium=referral"}
              target="_blank"
              rel="noreferrer"
            >
              {imageDetails.user.name}
            </a>
          </span>
          on
          <span>
            <a
              href="https://unsplash.com?utm_source=zedge_image_gallery&utm_medium=referral"
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

  const renderContent = () => {
    if (errorMessage) {
      return <p className="error-message">{errorMessage}</p>;
    } else if (imageDetails) {
      return <div>{renderImageDetails()}</div>;
    } else {
      return <BeatLoader className="spinner" color="black" />;
    }
  };

  return (
    <>
      <Link to="/" className="button home-button">
        Home
      </Link>
      {renderContent()}
    </>
  );
}
