/* eslint-disable react/prop-types */
import React from 'react';
import Chart from 'chart.js/auto';

function BarChart({ data }) {
  const ctxRef = React.useRef(null);

  React.useEffect(() => {
    if (!ctxRef.current) return;
    var myChart = new Chart(ctxRef.current, {
      type: 'bar',

      data: {
        datasets: data.datasets,
      },
      options: {
        plugins: { legend: { title: { display: true, text: data.title } } },
        responsive: true,
        scales: {
          x: { grid: { display: false } },
          y: { grid: { display: true } },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div id="barContainer" className="mx-auto w-full mt-2 md:mt-5">
      <canvas ref={ctxRef}></canvas>
    </div>
  );
}

export default BarChart;
