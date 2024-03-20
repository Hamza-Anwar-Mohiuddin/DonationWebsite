import CanvasComponent from '../../components/CanvasComponent/CanvasComponent.jsx'

function Home() {
  return (
    <>
    <CanvasComponent />
    </>
  )
}

export default Home

// import './Home.css'
// import PakistanFlag from '../../assets/Flag-of-Pakistan-01.svg';
// import { useState } from 'react';

// const Home = () => {

//   const width = 1000; // example width
//   const height = 1000; // example height
//   const numPixels = 10000; // total number of clickable areas

//   // Initialize state to track clicks
//   const [clicks, setClicks] = useState(Array(numPixels).fill(false));

//   // Function to handle click events
//   const handleClick = (index) => {
//     console.log(`Pixel ${index} clicked`); // Log the pixel number to the console
//     const newClicks = [...clicks];
//     newClicks[index] = !newClicks[index];
//     setClicks(newClicks);
//   };

//   // Calculate the size of each pixel
//   const pixelWidth = width / Math.sqrt(numPixels);
//   const pixelHeight = height / Math.sqrt(numPixels);

//   // Generate the area elements
//   const areas = [];
//   for (let i = 0; i < numPixels; i++) {
//     const x = (i % Math.sqrt(numPixels)) * pixelWidth;
//     const y = Math.floor(i / Math.sqrt(numPixels)) * pixelHeight;
//     areas.push(
//       <area
//         key={i}
//         shape="rect"
//         coords={`${x},${y},${x + pixelWidth},${y + pixelHeight}`}
//         alt={`Pixel ${i}`}
//         onClick={() => handleClick(i)}
//         className="area" // Add the class name here
//         style={{
//           cursor: 'pointer',
//           left: `${x}px`, // Position left
//           top: `${y}px`, // Position top
//           width: `${pixelWidth}px`, // Set width
//           height: `${pixelHeight}px` // Set height
//         }}
//       />
//     );
//   }

//   return (
//     <div style={{ position: 'relative' }}>
//   <img src={PakistanFlag} useMap="#flagMap" alt="Pakistani Flag" style={{ width: `${width}px`, height: `${height}px` }} />
//   <map name="flagMap">{areas}</map>
// </div>
//   );
// };

// export default Home;
