import { useState } from "react";
import { createApi } from "unsplash-js";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Routes, Route } from "react-router-dom";

import "./normalize.scss";
import "./App.scss";
import ImageGallery from "./components/ImageGallery";
import ImageDetails from "./components/ImageDetails";

const api = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY,
});

TimeAgo.addDefaultLocale(en);

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("latest");

  return (
    <div className="app">
      <h1>Image gallery</h1>
      <Routes>
        <Route
          path="/"
          element={
            <ImageGallery
              api={api}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
          }
        />
        <Route path="/photos/:photoId" element={<ImageDetails api={api} />} />
      </Routes>
    </div>
  );
}

export default App;
