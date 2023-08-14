import { BiLeftArrow } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Details() {
  const { car_id } = useParams();
  const { cars } = useSelector((state) => state.car);
  const car = cars.filter((car) => car.id === parseInt(car_id))[0];

  const navigate = useNavigate();

  if (!car) return <Navigate to={'/admin/cars'} />;

  return (
    <div className="relative w-full h-screen flex flex-col justify-start items-center overflow-auto max-h-screen max-w-full">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-0 bottom-8 bg-blue-500 text-white pl-8 py-4 pr-4 rounded-r-full"
      >
        <BiLeftArrow />
      </button>

      <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-x-4">
        <div
          className={`flex justify-center items-center h-screen overflow-visible rounded-full max-w-fit`}
        >
          <img
            src={car.image}
            className="max-w-full h-auto"
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
            className="bg-blue-500 ml-auto max-w-fit mt-20 px-4 py-2 my-4 text-white flex items-center rounded-full hover:bg-blue-400 active:bg-blue-600"
          >
            Edit Details <FaEdit className="ml-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Details;
