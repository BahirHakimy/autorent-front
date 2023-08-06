import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchCars, updateCar } from '../../../context/features/carSlice';
import { TbFidgetSpinner } from 'react-icons/tb';
import { addToast } from '../../../context/features/toastSlice';
import { BiLeftArrow } from 'react-icons/bi';
import { useEffect } from 'react';

function EditCar() {
  const { cars, loading, errors } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length > 0) return;
    dispatch(fetchCars());
  }, [cars.length, dispatch]);

  const navigate = useNavigate();
  const { car_id } = useParams();
  const car = cars.filter((car) => car.id === parseInt(car_id))[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    if (event.target?.image?.files.length < 1) {
      data.delete('image');
    }
    dispatch(
      updateCar({
        id: car.id,
        data,
        callback: () => {
          dispatch(addToast('Car updated successfully!'));
          navigate('/cars');
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
        Edit Car Details
      </h2>
      <div className="bg-white w-auto p-2 md:p-8">
        {loading || !car ? (
          <h1>Loading</h1>
        ) : (
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="post"
            className="grid grid-cols-1 md:grid-cols-2 grid-rows-5"
          >
            <img
              src={car.image}
              className="row-span-2 max-h-56 max-w-lg"
              alt="car image"
            />
            <div className="w-full md:px-4">
              <label htmlFor="image" className="text-blue-600">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                className={`w-full px-4 py-2 border ${
                  errors && errors['image']
                    ? 'border-red-400'
                    : 'border-blue-400'
                } rounded-md focus:outline-none focus:border-blue-600`}
              />
              <p className="text-sm text-red-600 font-semibold" role="alert">
                {errors && errors['image']}
              </p>
            </div>
            <div className="w-full md:px-4">
              <label htmlFor="model" className="text-blue-600">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                defaultValue={car.model}
                required
                className={`w-full px-4 py-2 border ${
                  errors && errors['model']
                    ? 'border-red-400'
                    : 'border-blue-400'
                } rounded-md focus:outline-none focus:border-blue-600`}
              />
              <p className="text-sm text-red-600 font-semibold" role="alert">
                {errors && errors['model']}
              </p>
            </div>
            <div className="w-full md:px-4">
              <label htmlFor="number_of_seats" className="text-blue-600">
                Number Of Seats
              </label>
              <input
                type="number"
                id="number_of_seats"
                name="number_of_seats"
                defaultValue={car.number_of_seats}
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
            <div className="w-full md:px-4">
              <label htmlFor="price_per_km" className="text-blue-600">
                Price/KM
              </label>
              <input
                type="number"
                step={0.01}
                id="price_per_km"
                name="price_per_km"
                defaultValue={car.price_per_km}
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
            <div className="w-full md:px-4">
              <label htmlFor="price_per_hour" className="text-blue-600">
                Price/Hr
              </label>
              <input
                type="number"
                step={0.01}
                id="price_per_hour"
                name="price_per_hour"
                defaultValue={car.price_per_hour}
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
            <div className="w-full md:px-4">
              <label htmlFor="car_type" className="text-blue-600">
                Type
              </label>
              <select
                name="car_type"
                defaultValue={car.car_type}
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
            {loading ? (
              <div className="px-4 py-2 w-full">
                <TbFidgetSpinner
                  size={25}
                  className="animate-spin text-sky-500 mx-auto"
                />
              </div>
            ) : (
              <div className="flex justify-end md:col-span-2 items-center w-full">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md mx-4 hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
                <Link
                  to={'/cars'}
                  className="border border-sky-600 font-semibold text-sky-600 px-6 py-2 rounded-md mx-4 hover:bg-blue-700 hover:text-white transition-colors"
                >
                  Cancel
                </Link>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default EditCar;
