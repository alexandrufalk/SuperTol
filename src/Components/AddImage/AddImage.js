import React, { useState, useEffect } from "react";

import "react-image-crop/dist/ReactCrop.css";
import CustomImage from "../CustomImage/CustomImage";

const AddImage = () => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const [results, setResults] = useState([]);
  const [displayImg, stDisplayImg] = useState(false);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  const onImageChange = (e) => {
    setImages([...e.target.files]);
    stDisplayImg(true);
  };

  return (
    <div>
      <div>
        <div>
          <label
            htmlFor="inputTag"
            style={{ cursor: "pointer", color: "red", fontFamily: "Open Sans" }}
          >
            Select Image
            <input
              id="inputTag"
              type="file"
              multiple
              accept="image/*"
              onChange={onImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {
          <canvas
            id="canvas"
            style={{
              display: "none",
            }}
          />
        }
      </div>
      <div>
        {results.map((item, index) => (
          <div key={index}>
            <img
              src={item}
              alt={item}
              key={item}
              style={{ height: 100, width: 100 }}
            />
          </div>
        ))}
      </div>
      <div>
        {imageURLs.map((imageSrc, index) => (
          <CustomImage
            imageSrc={imageSrc}
            key={index}
            id={index}
            index={index}
            results={results}
            setResults={setResults}
            displayImg={displayImg}
            stDisplayImg={stDisplayImg}
          />
        ))}
      </div>
    </div>
  );
};

export default AddImage;
