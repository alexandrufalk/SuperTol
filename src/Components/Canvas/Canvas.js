import React, { useEffect, useRef } from "react";

const Canvas = (props) => {
  const canvas = useRef(null);
  let ctx = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
    drawLine({ x: 20, y: 20, x1: 100, y1: 20 });
    drawLine({ x: 100, y: 50, x1: 200, y1: 50 }, { color: "red" });
    drawLine({ x: 200, y: 80, x1: 260, y1: 80 }, { color: "green", width: 5 });
    drawLine({ x: 40, y: 110, x1: 260, y1: 110 }, { color: "blue" });
  }, []);

  // draw a line
  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = "black", width = 1 } = style;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  };
  return (
    <div className="App">
      <h3>Tolerance stack-up</h3>
      <canvas ref={canvas}></canvas>
    </div>
  );
};

export default Canvas;
