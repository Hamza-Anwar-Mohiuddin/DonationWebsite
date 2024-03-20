import { useEffect } from 'react';
import './CanvasComponent.css'
function CanvasComponent() {
  useEffect(() => {
    function getSquare(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left) % 3,
        y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top) % 3
      };
    }

    function drawGrid(context, width, height) {
      for (var x = 0.5; x < width; x += 3) {
        for (var y = 0.5; y < height; y += 3) {
          context.fillStyle = 'black'; // Set initial color to black
          context.fillRect(x, y, 3, 3);
        }
      }
    }

    function fillSquare(context, x, y) {
      context.clearRect(x, y, 3, 3); // Remove color by clearing the rectangle
      console.log("Clicked pixel coordinates: (" + x + ", " + y + ")");
    }

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    // Set fixed canvas dimensions
    var canvasWidth = 1000;
    var canvasHeight = 1000;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var totalPixels = canvasWidth * canvasHeight;
    console.log("Total pixels: " + totalPixels);

    drawGrid(context, canvasWidth, canvasHeight);

    function clickHandler(evt) {
      var mousePos = getSquare(canvas, evt);
      fillSquare(context, mousePos.x, mousePos.y); // Remove color on click
    }

    canvas.addEventListener('click', clickHandler);

    // Cleanup function
    return () => {
      canvas.removeEventListener('click', clickHandler);
    };
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  return (
    <div className="canvas-class">
      <canvas id="myCanvas"></canvas>
    </div>
  );
}

export default CanvasComponent;
