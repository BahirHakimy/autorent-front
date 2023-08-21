import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchCar, updateCar } from '../../../context/features/carSlice';
import { BiLeftArrow } from 'react-icons/bi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loading } from '../../shared';

function EditCar() {
  const { car_id } = useParams();
  const { car, loading, updating, errors } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCar(car_id));
  }, [car_id, dispatch]);

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
          toast.success('Car updated successfully!');
          navigate(`/admin/cars/${car.id}`);
        },
      })
    );
  };

  return (
    <div className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <button
        onClick={() => navigate(-1)}
        className="absolute hidden md:block left-0 bottom-8 bg-blue-500 text-white pl-8 py-4 pr-4 rounded-r-full"
      >
        <BiLeftArrow />
      </button>
      <h2 className="text-2xl box-border text-center bg-cyan-600 rounded-md text-white w-full mx-2 py-2 my-4">
        Edit Car Details
      </h2>
      <div className="bg-white w-full p-2 md:p-8">
        {loading || !car ? (
          <Loading />
        ) : (
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            method="post"
            className="flex flex-col items-center"
          >
            <div>
              <img
                src={car.image}
                className="max-h-56 max-w-lg"
                alt="car image"
              />
            </div>
            <div className="grid md:grid-cols-2">
              <div className="w-full md:w-72 lg:w-96 md:px-4">
                <label htmlFor="image" className="text-blue-600">
                  Change Image
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
              <div className="w-full md:w-72 lg:w-96 md:px-4">
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
              <div className="w-full md:w-72 lg:w-96 md:px-4">
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
              <div className="w-full md:w-72 lg:w-96 md:px-4">
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
              <div className="w-full md:w-72 lg:w-96 md:px-4">
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
              <div className="w-full md:w-72 lg:w-96 md:px-4">
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
              <div className="flex justify-end md:col-span-2 items-center w-full py-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-md mx-4 hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
                <Link
                  to={updating ? '#' : '/admin/cars'}
                  className={`${
                    updating ? 'opacity-50' : ''
                  } border border-sky-600 font-semibold text-sky-600 px-6 py-2 rounded-md mx-4 hover:bg-blue-700 hover:text-white transition-colors`}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditCar;
