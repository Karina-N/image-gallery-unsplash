import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import ImageGallery from "./components/ImageGallery";
import ImageDetails from "./components/ImageDetails";

const api = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY,
});

function App() {
  const [imagesList, setImagesList] = useState(null);

  useEffect(() => {
    api.photos
      .list()
      .then((res) => setImagesList(res.response.results))
      .catch(() => console.log("something went wrong"));
  }, []);

  return (
    <div className="App">
      <h3>Image gallery</h3>
      <Routes>
        {/* <Route path="/">{imagesList ? <ImageGallery imagesList={imagesList} /> : "loading"}</Route> */}
        <Route path="/" element={<ImageGallery imagesList={imagesList} />} />
        <Route path="/photos/:photoId" element={<ImageDetails api={api} />} />
      </Routes>
    </div>
  );
}

export default App;
