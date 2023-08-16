/* eslint-disable react/prop-types */
import React from 'react';
import { Chart } from 'chart.js';

function PieChart({ data }) {
  const ctxRef = React.useRef(null);

  React.useEffect(() => {
    if (!ctxRef.current) return;
    var myChart = new Chart(ctxRef.current, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: data.datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: { grid: { display: false }, ticks: { display: false } },
          y: { grid: { display: false }, ticks: { display: false } },
        },
        plugins: {
          legend: {
            title: { display: true, text: data.title },
          },
          tooltip: {
            callbacks: {
              label: ({ label, dataIndex, dataset }) => {
                return `${dataset.data[dataIndex]} Bookings ${label} `;
              },
            },
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div id="pieContainer" className="w-auto mx-auto mt-2 md:mt-5 ">
      <canvas ref={ctxRef}></canvas>
    </div>
  );
}

export default PieChart;
