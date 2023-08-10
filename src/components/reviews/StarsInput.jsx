/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa';

function StarsInput({ rating, setRating }) {
  return (
    <div className="relative flex p-1 gap-1 text-slate-300 stars cursor-pointer">
      <span>
        <FaStar
          onClick={() => setRating(1)}
          className={`${rating > 0 ? 'text-yellow-300' : ''}`}
          size={20}
        />
      </span>
      <span>
        <FaStar
          onClick={() => setRating(2)}
          className={`${rating > 1 ? 'text-yellow-300' : ''}`}
          size={20}
        />
      </span>
      <span>
        <FaStar
          onClick={() => setRating(3)}
          className={`${rating > 2 ? 'text-yellow-300' : ''}`}
          size={20}
        />
      </span>
      <span>
        <FaStar
          onClick={() => setRating(4)}
          className={`${rating > 3 ? 'text-yellow-300' : ''}`}
          size={20}
        />
      </span>
      <span>
        <FaStar
          onClick={() => setRating(5)}
          className={`${rating > 4 ? 'text-yellow-300' : ''}`}
          size={20}
        />
      </span>
    </div>
  );
}

export default StarsInput;
