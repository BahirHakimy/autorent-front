import { BiLeftArrow } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchCar } from '../../../context/features/carSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loading } from '../../shared';

function Details() {
  const { car_id } = useParams();
  const { car, loading, error } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCar(car_id));
  }, [car_id, dispatch]);

  if (error) {
    toast.error(error);
    return <Navigate to="/admin/cars" />;
  }

  return (
    <div className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-0 bottom-8 bg-cyan-600 text-white pl-8 py-4 pr-4 rounded-r-full"
      >
        <BiLeftArrow />
      </button>

      {loading || !car ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-x-4">
          <div
            className={`flex justify-center h-screen items-center rounded-full max-w-fit`}
          >
            <img
              src={car.image}
              className="max-w-xs sm:max-w-sm md:max-w-full h-auto"
              width="100%"
              alt={`${car.model}-image`}
            />
          </div>
          <div className="px-4">
            <h1 className="text-3xl font-bold text-right my-3 whitespace-nowrap">
              {car.model}
            </h1>
            <ul className="flex flex-col my-2">
              <li className="flex justify-between min-w-[8rem] text-sm font-semibold px-2 py-1 even:bg-gray-300 odd:bg-gray-50 ">
                <span>Number of seats:</span>
                <span>{car.number_of_seats}</span>
              </li>
              <li className="flex justify-between min-w-[8rem] text-sm font-semibold px-2 py-1 even:bg-gray-300 odd:bg-gray-50 ">
                <span>Price per hour:</span>
                <span>${car.price_per_hour}</span>
              </li>
              <li className="flex justify-between min-w-[8rem] text-sm font-semibold px-2 py-1 even:bg-gray-300 odd:bg-gray-50 ">
                <span>Price per km:</span>
                <span>${car.price_per_km}</span>
              </li>
              <li className="flex justify-between min-w-[8rem] text-sm font-semibold px-2 py-1 even:bg-gray-300 odd:bg-gray-50 ">
                <span>Type:</span>
                <span className="capitalize">{car.car_type}</span>
              </li>
            </ul>
            <Link
              to={`/admin/cars/edit/${car.id}`}
              className="bg-cyan-600 ml-auto max-w-fit mt-20 px-4 py-2 my-4 text-white flex items-center rounded-full hover:bg-blue-400 active:bg-blue-600"
            >
              Edit Details <FaEdit className="ml-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
