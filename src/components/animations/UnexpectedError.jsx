import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

function UnexpectedError({ ...options }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import('./json/error.json').then((data) => {
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
      <h2 className="text-3xl 2xl:my-4 font-bold font-mono text-cyan-600">
        You crashed our app, You should be proud :)
      </h2>
      <button
        onClick={() => window.location.reload()}
        className="text-white rounded px-4 py-2 bg-sky-500"
        to={'/'}
      >
        Reload page
      </button>
    </h1>
  );
}

export default UnexpectedError;
