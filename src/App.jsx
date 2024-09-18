import React, { useRef, useState, useEffect } from "react";
import { GenerateFiguresRandom } from "./utils/GenerateFiguresRandom";
import { DetectFigure } from "./utils/DetectFigure";


const App = () => {
  const canvasRef = useRef(null);
  const gravity = 0.5;
  let isMouseDown = false;
  let pressStartTime = 0;
  let selectedShape = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let figures = Array.from({ length: 10 }, () => GenerateFiguresRandom());

    function drawShapes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      figures.forEach((shape) => {
        ctx.fillStyle = shape.color;
        switch (shape.type) {
          case "square":
            ctx.fillRect(
              shape.x - shape.size / 2,
              shape.y - shape.size / 2,
              shape.size,
              shape.size
            );
            break;
          case "circle":
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            break;
          case "triangle":
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y - shape.size / 2);
            ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
            ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
        }
      });
    }

    function updateShapes() {
      figures.forEach((shape) => {
        if (shape === selectedShape && isMouseDown) {
          let pressDuration = (Date.now() - pressStartTime) / 1000;
          shape.velocity = -Math.min(10, pressDuration * 5);
        }

        shape.y += shape.velocity; 
        shape.velocity += gravity;

  
        if (shape.y + shape.size / 2 > canvas.height) {
          shape.y = canvas.height - shape.size / 2;
          shape.velocity = 0;
        }
      });

      drawShapes();
      requestAnimationFrame(updateShapes);
    }


    canvas.addEventListener("mousedown", (e) => {
      const mousePos = { x: e.offsetX, y: e.offsetY };
      selectedShape = DetectFigure(mousePos.x, mousePos.y, figures);

      if (selectedShape) {
        isMouseDown = true;
        pressStartTime = Date.now();
      }
    });

    canvas.addEventListener("mouseup", () => {
      isMouseDown = false;
    });


    drawShapes();
    updateShapes();
  }, []);

  return <canvas ref={canvasRef} height={700} width={800} style={{background: "black", margin: "0 auto"}} />;
};

export default App;
