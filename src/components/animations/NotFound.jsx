import Lottie from 'lottie-react';
import animation from './json/not_found.json';
import { Link } from 'react-router-dom';

function NotFound({ ...options }) {
  return (
    <h1 className="h-screen w-full flex flex-col justify-center items-center">
      <div className="max-h-screen overflow-hidden flex justify-center items-center">
        <Lottie animationData={animation} loop={true} {...options} />
      </div>
      <Link className="text-sky-500 underline pb-20" to={'/'}>
        Go Back Home
      </Link>
    </h1>
  );
}

export default NotFound;
