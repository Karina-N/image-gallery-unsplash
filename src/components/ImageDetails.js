import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment/moment";

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

  const timeSincePublished = (imageDetails) => {
    return moment(imageDetails?.created_at).fromNow();
  };

  return (
    <>
      <Link to="/">Home</Link>
      {imageDetails && (
        <div>
          <img src={imageDetails.urls.small} alt={imageDetails.description} />
          <p>
            Photo by
            <span>
              <a href={imageDetails.user.portfolio_url} target="_blank" rel="noreferrer">
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
          <p>Published {timeSincePublished()}</p>
          <p>{imageDetails.exif.name}</p>
          <p>{imageDetails.likes} likes </p>
        </div>
      )}
    </>
  );
}
