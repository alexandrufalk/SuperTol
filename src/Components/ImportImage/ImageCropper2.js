import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import "./imbCropper.css";

const ImageCropper2 = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [showMultiTouchHint, setShowMultiTouchHint] = useState(false);
  const [removeTouchAction, setRemoveTouchAction] = useState(false);
  const zoomTimeoutRef = useRef();
  const touchTimeoutRef = useRef();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    clearTimeout(zoomTimeoutRef.current);
    clearTimeout(touchTimeoutRef.current);
  }, []);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const onWheelRequest = (e) => {
    // require the CTRL/⌘ key to be able to zoom with wheel
    if (e.ctrlKey || e.metaKey) {
      setShowZoomHint(false);
      return true;
    }
    setShowZoomHint(true);
    clearTimeout(zoomTimeoutRef.current);
    zoomTimeoutRef.current = setTimeout(() => setShowZoomHint(false), 2000);
    return false;
  };
  const onTouchRequest = (e) => {
    // require 2 fingers to be able to interact with the image
    if (e.touches.length > 1) {
      setShowMultiTouchHint(false);
      setRemoveTouchAction(true);
      return true;
    }
    setShowMultiTouchHint(true);
    setRemoveTouchAction(false);
    clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(
      () => setShowMultiTouchHint(false),
      2000
    );
    return false;
  };

  return (
    <div>
      <div className="crop-container">
        <Cropper
          image="https://storage.googleapis.com/supertolbucket/img1_1_3"
          crop={crop}
          zoom={zoom}
          rotation={rotation} // Pass the rotation angle
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onWheelRequest={onWheelRequest}
          onTouchRequest={onTouchRequest}
          classes={
            removeTouchAction && { containerClassName: "removeTouchAction" }
          }
        />
        {showZoomHint && (
          <div className="zoom-hint">
            <p>Use ⌘ + scroll (or ctrl + scroll) to zoom the image</p>
          </div>
        )}
        {showMultiTouchHint && (
          <div className="touch-hint">
            <p>Use 2 fingers to interact with the image</p>
          </div>
        )}
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value);
          }}
          className="zoom-range"
        />
      </div>
      <div className="rotation-controls">
        <input
          type="range"
          value={rotation}
          min={0}
          max={360}
          step={10}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setRotation(e.target.value);
          }}
          className="zoom-range"
        />
      </div>
      <div className="rotation-controls">
        <button onClick={() => setRotation(rotation - 90)}>Rotate Left</button>
        <button onClick={() => setRotation(rotation + 90)}>Rotate Right</button>
      </div>
    </div>
  );
};

export default ImageCropper2;
