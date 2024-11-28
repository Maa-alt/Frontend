// src/Components/ProductBarChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProductBarChart = ({ data, products, color = '#1cc88a' }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('product-chart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: products.map((product) => product.name),
        datasets: [
          {
            label: 'Quantity',
            data: products.map((product) => product.users),
            backgroundColor: color, // Use the passed color
            barPercentage: 0.4, // Reduce bar width
            categoryPercentage: 0.9, // Increase space between bars
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // Disable all animations
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: (value) => value, // Display all numbers
              color: 'white', // Set quantity number color to white
              font: {
                size: 18,
                weight: 'bold', // Set text to bold
              },
            },
            grid: {
              color: 'white', // Set grid line color to white
            },
            title: {
              display: true,
              text: 'Quantity Number',
              color: 'white',
              font: {
                size: 18,
                weight: 'bold', // Set text to bold
              },
            },
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 0, // Prevent rotation
              minRotation: 0, // Prevent rotation
              color: 'white', // Set label color to white
              font: {
                size: 18,
                weight: 'bold', // Set text to bold
              },
            },
            grid: {},
            title: {
              display: true,
              text: 'Product Name',
              color: 'white',
              font: {
                size: 18,
                weight: 'bold', // Set text to bold
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      width: 800, // Increase chart width
      height: 400, // Increase chart height
    });

    return () => {
      chartRef.current.destroy();
    };
  }, [data, products, color]);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <canvas id="product-chart" width="800" height="400"></canvas>
    </div>
  );
};

export default ProductBarChart;