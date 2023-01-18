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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    ctx = canvasEle.getContext("2d");
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, []);

  useEffect(() => {
    drawLine({
      x: 20,
      y: 20,
      x1: 100,
      y1: 20,
      t: "D1",
    });
    drawLine2({ x: 100, y: 20, x1: 100, y1: 50 });
    drawLine({ x: 100, y: 50, x1: 200, y1: 50, t: "D2" }, { color: "red" });
    drawLine2({ x: 200, y: 50, x1: 200, y1: 80 });
    drawLine(
      { x: 200, y: 80, x1: 260, y1: 80, t: "D3" },
      { color: "green", width: 5 }
    );
    drawLine2({ x: 260, y: 80, x1: 260, y1: 110 });
    drawLine({ x: 260, y: 110, x1: 40, y1: 110, t: "D4" }, { color: "blue" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // draw a line
  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1, t = "" } = info;
    const { color = "black", width = 1 } = style;
    const tx = x + Math.round((x1 - x) / 2);
    const ty = Math.round(y - 10);
    var headlen = 10;
    var angle = Math.atan2(y1 - y, x1 - x);
    console.log("t", t);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.font = "12px serif";
    ctx.fillText(`${t}`, tx, ty);

    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headlen * Math.cos(angle - Math.PI / 7),
      y1 - headlen * Math.sin(angle - Math.PI / 7)
    );

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(
      x1 - headlen * Math.cos(angle + Math.PI / 7),
      y1 - headlen * Math.sin(angle + Math.PI / 7)
    );

    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(x1, y1);
    ctx.lineTo(
      x1 - headlen * Math.cos(angle - Math.PI / 7),
      y1 - headlen * Math.sin(angle - Math.PI / 7)
    );

    //draws the paths created above
    ctx.stroke();
    ctx.restore();
  };
  const drawLine2 = (info, style = {}) => {
    const { x, y, x1, y1, t = "" } = info;
    const { color = "black", width = 1 } = style;
    const tx = x + Math.round((x1 - x) / 2);
    const ty = Math.round(y - 10);

    console.log("t", t);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.font = "12px serif";
    ctx.fillText(`${t}`, tx, ty);
  };
  return (
    <div className="container-fluid text-center">
      <h3>Tolerance stack-up</h3>
      <canvas ref={canvas}></canvas>
    </div>
  );
};

export default Canvas;
