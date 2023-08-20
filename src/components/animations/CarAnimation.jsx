import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

function CarAimation({ ...options }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import('./json/car.json').then((data) => {
      setAnimationData({ ...data });
    });
  }, []);

  return animationData ? (
    <Lottie animationData={animationData} loop={false} {...options} />
  ) : (
    <div className="flex items-center h-52 justify-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-gray-500 rounded-full animation-delay-100 animate-bounce"></div>
        <div className="w-4 h-4 bg-gray-500 rounded-full animation-delay-200 animate-bounce"></div>
      </div>
    </div>
  );
}

export default CarAimation;
