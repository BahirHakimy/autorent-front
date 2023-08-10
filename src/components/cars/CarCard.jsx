/* eslint-disable react/prop-types */
import { BiStar, BiUser } from 'react-icons/bi';
import { FaCarAlt } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { selectCar } from '../../context/features/carSlice';
import { useNavigate } from 'react-router-dom';
import { setTraget } from '../../context/features/userSlice';

function CarCard({ car }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (car) => {
    if (user) {
      dispatch(selectCar(car));
      navigate('/home/booking');
    } else {
      setTraget('/home/booking');
      navigate('/signup');
    }
  };

  return (
    <div
      id="carCard"
      className="flex flex-wrap justify-center items-center bg-slate-50 shadow-md rounded my-2 p-2"
    >
      <div className="w-2/3 md:w-1/2 px-4 flex flex-col">
        <h3 className="text-lg font-semibold my-2">{car.model}</h3>
        <ul className="py-4">
          <li className="flex items-center space-x-2">
            <BiUser /> <p className="text-sm">{car.number_of_seats} Seats</p>
          </li>
          <li className="flex items-center space-x-2">
            <GiGearStickPattern /> <p className="text-sm">Automatic</p>
          </li>
          <li className="flex items-center space-x-2">
            <FaCarAlt /> <p className="text-sm">{car.car_type}</p>
          </li>
          <li className="flex items-center space-x-2">
            <BiStar />{' '}
            <p className="text-sm">
              {car.rating ? (
                <>
                  <span className="text-sm mr-1 p-[2px] rounded bg-sky-500 text-white">
                    {car.rating}
                  </span>
                  200 reviews
                </>
              ) : (
                <span>No reviews yet</span>
              )}
            </p>
          </li>
        </ul>
      </div>
      <img className="w-1/3 md:w-1/2" src={car.image} alt="car image" />
      <div className="flex justify-start space-x-2  md:py-2 items-center">
        <button
          onClick={() => handleClick(car)}
          className="px-2 py-1 mt-2 text-white bg-sky-500 rounded"
        >
          Proceed to booking
        </button>
      </div>
    </div>
  );
}

export default CarCard;
