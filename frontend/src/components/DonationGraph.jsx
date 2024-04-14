import React, { Component } from 'react';
import './TriangleGraph.css';
import icon from '../assets/man.png';
import axios from 'axios';

class TriangleGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: [],
      donationPercentage: 0 // Initialize with 0, will be updated after fetching from backend
    };
  }

  componentDidMount() {
    // Generate dots in a triangular pattern
    this.fetchDonationPercentage();
    const dots = [];
    const rows = 24; // Number of rows in the triangle
    let count = 0;
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= row; col++) {
        dots.push({ row, col, count });
        count++;
      }
    }
    this.setState({ dots });
  }

  async fetchDonationPercentage() {
    try {
      const response = await axios.get('http://localhost:3000/donation/percentage');
      const data = response.data;
      this.setState({ donationPercentage: data.donationPercentage });
    } catch (error) {
      console.error('Error fetching donation percentage:', error.message);
    }
  }
  render() {
    const { dots, donationPercentage } = this.state;
    const totalDots = dots.length;

    // Calculate the number of donated pixels based on the percentage
    const donatedPixels = Math.round((donationPercentage / 100) * totalDots);

    // Render dots with opacity effect
    const dotElements = dots.map((dot, index) => {
      // Calculate opacity for each pixel based on the index and donated pixels
      const opacity = index < donatedPixels ? 1 : 0.5; // 100% opacity for donated pixels, 50% for others
      const opacityStyle = {
        opacity: opacity, // Apply opacity effect
        // Adjust positioning for right-angle triangle shape
        top: `${(24 - dot.col) * 20}px`, // Adjust top position based on the column
        left: `${dot.row * 20}px`, // Adjust left position based on the row
      };
      return <img key={index} className="dot" style={opacityStyle} src={icon} alt="icon" />;
    });

    return (
      <div>
        <div className="triangle-graph">{dotElements}</div>
        <h1>pixels donated: {donationPercentage.toFixed(2)}%</h1>
      </div>
    );
  }
}

export default TriangleGraph;
