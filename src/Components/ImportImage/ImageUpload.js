// ImageUpload.js
import React, { useState } from "react";
import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [croppedImageData, setCroppedImageData] = useState(undefined);
  const { addImage } = useDatabaseProjects();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("ImageUpload file:", file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  console.log("ImageUpload sectedImage:", selectedImage);

  const handleCropComplete = (cropData) => {
    if (cropData.width > 0 && cropData.height > 0) {
      // Crop the image based on the cropData
      const croppedImage = getCroppedImg(selectedImage, cropData);

      // Optionally, you can display a preview of the cropped image
      // setPreviewImage(croppedImage);

      // You can also store the cropped image data in a state variable
      setCroppedImageData(croppedImage);
    } else {
      // Handle the case where the user has not selected a valid crop area
      // You can display an error message or take appropriate action
      console.error("Invalid crop area");
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // Reject the promise if the blob is not available
          reject(new Error("Could not create a cropped image blob"));
          return;
        }
        resolve(blob);
      }, "image/jpeg"); // You can specify the desired image format here
    });
  };

  const handleUpload = () => {
    // Implement the logic to upload the cropped image to your server (backend).
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <ReactCrop
            src={selectedImage}
            crop={crop}
            onImageLoaded={handleCropComplete}
            onComplete={handleCropComplete}
            onChange={(newCrop) => setCrop(newCrop)}
            style={{ width: "100%", height: "auto" }}
          />

          <button onClick={handleUpload}>Upload</button>
          {/* <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <img src={src} />
          </ReactCrop> */}
        </div>
      )}
      {croppedImageData && (
        <img src={croppedImageData} />
        // <img
        //   src={URL.createObjectURL(croppedImageData)}
        //   alt="Cropped Preview"
        // />
      )}
    </div>
  );
};

export default ImageUpload;
