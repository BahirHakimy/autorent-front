/* eslint-disable react/prop-types */
import React from 'react';
import { Chart } from 'chart.js';

function RadarChart({ data }) {
  const ctxRef = React.useRef(null);

  React.useEffect(() => {
    if (!ctxRef.current) return;
    var myChart = new Chart(ctxRef.current, {
      type: 'radar',
      data: {
        labels: data.labels,
        datasets: data.datasets,
      },
      options: {
        responsive: true,
        scales: {
          r: { pointLabels: { display: true }, ticks: { display: false } },
          x: { grid: { display: false }, ticks: { display: false } },
          y: { grid: { display: false }, ticks: { display: false } },
        },
        plugins: {
          legend: {
            title: { display: true, text: data.title || 'Overall Ratigs' },
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div id="radarContainer" className="w-auto mt-2 md:mt-10">
      <canvas ref={ctxRef}></canvas>
    </div>
  );
}

export default RadarChart;
