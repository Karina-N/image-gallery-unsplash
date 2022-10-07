import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import ImageGallery from "./components/ImageGallery";
import ImageDetails from "./components/ImageDetails";

const api = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY,
});

function App() {
  const [imagesList, setImagesList] = useState(null);
  const [imagesPerPage, setImagesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("latest");

  useEffect(() => {
    api.photos
      .list({ perPage: imagesPerPage, page: currentPage, orderBy: orderBy })
      .then((res) => {
        console.log(res.response);
        setImagesList(res.response.results);
      })
      .catch(() => console.log("something went wrong"));
  }, [currentPage, orderBy]);

  const updateCurrentPageNumber = (num) => setCurrentPage(num);
  const updateSorting = (sortCriteria) => setOrderBy(sortCriteria);

  return (
    <div className="app">
      <h1>Image gallery</h1>
      <Routes>
        <Route
          path="/"
          element={
            <ImageGallery
              imagesList={imagesList}
              updateCurrentPageNumber={updateCurrentPageNumber}
              currentPage={currentPage}
              orderBy={orderBy}
              updateSorting={updateSorting}
            />
          }
        />
        <Route path="/photos/:photoId" element={<ImageDetails api={api} />} />
      </Routes>
    </div>
  );
}

export default App;
