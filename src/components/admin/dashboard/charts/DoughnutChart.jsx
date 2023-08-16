/* eslint-disable react/prop-types */
import React from 'react';
import { Chart } from 'chart.js';

function DoughnutChart({ data }) {
  const ctxRef = React.useRef(null);

  // const createColors = React.useCallback(() => {
  //   function randomNum() {
  //     return Number.parseInt(Math.random() * 256);
  //   }
  //   return Object.keys(data2).map(
  //     () => `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.6)`
  //   );
  // }, [data2]);

  React.useEffect(() => {
    if (!ctxRef.current) return;
    var myChart = new Chart(ctxRef.current, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: data.datasets,
      },

      options: {
        scales: {
          x: { grid: { display: false }, ticks: { display: false } },
          y: { grid: { display: false }, ticks: { display: false } },
        },
        plugins: {
          legend: {
            title: { text: data.title, display: true },
          },
          tooltip: {
            callbacks: {
              label: ({ label, dataIndex, dataset }) => {
                return `${label} ${dataset.data[dataIndex]} bookings`;
              },
            },
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

export default DoughnutChart;
