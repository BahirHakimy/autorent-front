import Lottie from 'lottie-react';
import animation from './json/under_constraction.json';

function UnderDevelopment({ ...options }) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Lottie animationData={animation} loop={true} {...options} />;
    </div>
  );
}

export default UnderDevelopment;
