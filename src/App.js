import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery";

const api = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY,
});

function App() {
  const [imagesList, setImagesList] = useState(null);

  useEffect(() => {
    api.photos
      .list()
      .then((res) => {
        console.log(res);
        setImagesList(res.response.results);
      })
      .catch(() => console.log("something went wrong"));
  }, []);

  return (
    <div className="App">
      <h2>Homepage</h2>
      {imagesList ? <ImageGallery imagesList={imagesList} /> : "loading"}
    </div>
  );
}

export default App;
