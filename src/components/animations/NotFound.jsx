import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NotFound({ ...options }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import('./json/not_found.json').then((data) => {
      setAnimationData({ ...data });
    });
  }, []);

  return (
    <h1 className="h-screen w-full flex flex-col justify-center items-center">
      <div className="max-h-screen overflow-hidden flex justify-center items-center">
        {animationData ? (
          <Lottie animationData={animationData} loop={true} {...options} />
        ) : (
          <div className="flex items-center h-screen justify-center">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-gray-500 rounded-full animation-delay-100 animate-bounce"></div>
              <div className="w-4 h-4 bg-gray-500 rounded-full animation-delay-200 animate-bounce"></div>
            </div>
          </div>
        )}
      </div>
      <Link className="text-sky-500 underline pb-20" to={'/'}>
        Go Back Home
      </Link>
    </h1>
  );
}

export default NotFound;
