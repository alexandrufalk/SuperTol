import React, { useState } from "react";
import trimCanvas from "trim-canvas";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CustomImage = ({
  index,
  imageSrc,
  results,
  setResults,
  displayImg,
  stDisplayImg,
}) => {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  const getCroppedImg = async (index) => {
    const canvas = document.getElementById("canvas");
    const image = document.getElementById(index);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imageWidthRatio = image.naturalWidth / image.width;
    const imageHeightRatio = image.naturalHeight / image.height;

    ctx.drawImage(
      image,
      crop.x * imageWidthRatio,
      crop.y * imageHeightRatio,
      crop.width * imageWidthRatio,
      crop.height * imageHeightRatio,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = trimCanvas(canvas).toDataURL("image/png", 1);
    setResults([...results, base64Image]);
  };
  return (
    <>
      {displayImg && (
        <div style={{ width: 200 }}>
          <ReactCrop crop={crop} onChange={setCrop}>
            <img
              id={index}
              src={imageSrc}
              alt={imageSrc}
              style={{ height: "auto", width: "100%" }}
            />
          </ReactCrop>
          <button
            style={{
              fontFamily: "Open Sans",
              width: "100%",
              backgroundColor: "#1CC6FF",
              color: "white",
              border: "none",
              height: 30,
            }}
            onClick={() => {
              getCroppedImg(index);
              stDisplayImg(false);
            }}
          >
            Select to Crop image
          </button>
        </div>
      )}
    </>
  );
};

export default CustomImage;
