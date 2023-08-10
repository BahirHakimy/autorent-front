/* eslint-disable react/prop-types */
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function Stars({ rate = 5 }) {
  return (
    <div className="flex gap-1 ">
      {new Array(5).fill(0).map((e, index) => {
        const diff = rate - index;
        return diff > 0 && diff < 1 ? (
          <FaStarHalfAlt key={'s' + index} className="text-orange-300" />
        ) : (
          <FaStar
            key={'s' + index}
            className={rate >= index + 1 ? 'text-orange-300' : 'text-slate-100'}
          />
        );
      })}
    </div>
  );
}

export default Stars;
