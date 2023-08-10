import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createCar } from '../../../context/features/carSlice';
import { TbFidgetSpinner } from 'react-icons/tb';
import { BiLeftArrow } from 'react-icons/bi';
import toast from 'react-hot-toast';

function AddCar() {
  const { loading, errors } = useSelector((state) => state.car);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(
      createCar({
        data,
        callback: () => {
          navigate('/admin/cars');
          dispatch(toast.success('Car added successfully!'));
        },
      })
    );
  };

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-0 bottom-8 bg-blue-500 text-white pl-8 py-4 pr-4 rounded-r-full"
      >
        <BiLeftArrow />
      </button>
      <h2 className="text-2xl box-border text-center bg-blue-500 rounded-md text-white w-full mx-2 py-2 my-4">
        Add New Car
      </h2>
      <div className="bg-white w-auto p-2 md:p-8">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
          className="flex flex-wrap"
        >
          <div className="mb-4 w-full md:px-4 md:w-1/2">
            <label htmlFor="model" className="text-blue-600">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              required
              className={`w-full px-4 py-2 border ${
                errors && errors['model'] ? 'border-red-400' : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
            <p className="text-sm text-red-600 font-semibold" role="alert">
              {errors && errors['model']}
            </p>
          </div>
          <div className="mb-4 w-full md:px-4 md:w-1/2">
            <label htmlFor="number_of_seats" className="text-blue-600">
              Number Of Seats
            </label>
            <input
              type="number"
              id="number_of_seats"
              name="number_of_seats"
              min={2}
              max={12}
              required
              className={`w-full px-4 py-2 border ${
                errors && errors['number_of_seats']
                  ? 'border-red-400'
                  : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
            <p className="text-sm text-red-600 font-semibold" role="alert">
              {errors && errors['number_of_seats']}
            </p>
          </div>
          <div className="mb-4 w-full md:px-4 md:w-1/2">
            <label htmlFor="price_per_km" className="text-blue-600">
              Price/KM
            </label>
            <input
              type="number"
              step={0.01}
              id="price_per_km"
              name="price_per_km"
              required
              className={`w-full px-4 py-2 border ${
                errors && errors['price_per_km']
                  ? 'border-red-400'
                  : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
            <p className="text-sm text-red-600 font-semibold" role="alert">
              {errors && errors['price_per_km']}
            </p>
          </div>
          <div className="mb-4 w-full md:px-4 md:w-1/2">
            <label htmlFor="price_per_hour" className="text-blue-600">
              Price/Hr
            </label>
            <input
              type="number"
              step={0.01}
              id="price_per_hour"
              name="price_per_hour"
              required
              className={`w-full px-4 py-2 border ${
                errors && errors['price_per_hour']
                  ? 'border-red-400'
                  : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
            <p className="text-sm text-red-600 font-semibold" role="alert">
              {errors && errors['price_per_hour']}
            </p>
          </div>
          <div className="mb-4 w-full md:px-4 md:w-1/2">
            <label htmlFor="car_type" className="text-blue-600">
              Type
            </label>
            <select
              name="car_type"
              id="car_type"
              required
              className={`w-full px-4 py-2 border ${
                errors && errors['car_type']
                  ? 'border-red-400'
                  : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            >
              <option className="font-semibold" value="sedan">
                Sedan
              </option>
              <option className="font-semibold" value="suv">
                SUV
              </option>
              <option className="font-semibold" value="minivan">
                MiniVan
              </option>
              <option className="font-semibold" value="sport">
                Sport
              </option>
            </select>

            <p className="text-sm text-red-600 font-semibold" role="alert">
              {errors && errors['car_type']}
            </p>
          </div>

          <div className="mb-4 w-full md:px-4 md:w-1/2">
            <label htmlFor="image" className="text-blue-600">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              required
              className={`w-full px-4 py-2 border ${
                errors && errors['image'] ? 'border-red-400' : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
            <p className="text-sm text-red-600 font-semibold" role="alert">
              {errors && errors['image']}
            </p>
          </div>

          {loading ? (
            <div className="px-4 py-2 w-full">
              <TbFidgetSpinner
                size={25}
                className="animate-spin text-sky-500 mx-auto"
              />
            </div>
          ) : (
            <div className="flex justify-end items-center w-full">
              <Link
                to={'/admin/cars'}
                className="border border-sky-600 font-semibold text-sky-600 px-6 py-2 rounded-md mx-4 hover:bg-blue-700 hover:text-white transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md mx-4 hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddCar;
