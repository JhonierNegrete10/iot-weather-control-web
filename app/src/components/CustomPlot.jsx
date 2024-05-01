// CustomPlot.js
import React from 'react';
import Plot from 'react-plotly.js';

const CustomPlot = ({ transformedData }) => {
  return (
    <Plot
      data={[
        {
          x: transformedData.x,
          y: transformedData.y,
          name: "Humedad Promedio",
          type: "scatter",
          mode: "lines+markers",
          marker: {
            size: 6,
            color: transformedData.color,
          },
          line: { shape: "spline" }
        },
        {
          x: transformedData.x,
          y: transformedData.z,
          name: "Temperatura",
          yaxis: "y2",
          type: "scatter",
          mode: "lines+markers",
          marker: {
            size: 6,
            color: "RGB(0, 190, 255)",
          },
          line: { shape: "spline" }
        },
      ]}
      layout={{
        plot_bgcolor: "#fff",
        paper_bgcolor: "#fff",
        xaxis: {
          title: "Tiempo",
        },
        yaxis: {
          title: "Humedad Promedio",
          rangemode: "tozero",
          range: [0, 100],
        },
        yaxis2: {
          title: "Temperatura",
          overlaying: "y",
          rangemode: "tozero",
          side: "right",
          range: [0, 30],
        },
        legend: {
          x: 1.05,
          xanchor: 'right',
        },
        font: {
          color: "#000",
        },
      }}
    />
  );
};

export default CustomPlot;
