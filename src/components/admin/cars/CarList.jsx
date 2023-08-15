import React from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCar, fetchCars } from '../../../context/features/carSlice';
import { Loading } from '../../shared';
import toast from 'react-hot-toast';

function Home() {
  const { cars, loading } = useSelector((state) => state.car);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (loading) return;
    dispatch(
      deleteCar({
        id,
        callback: () => toast.success('Car deleted successfully'),
      })
    );
  };

  return (
    <div className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-cyan-600 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Cars</h2>
        <Link
          to="/admin/cars/add"
          className="text-white bg-cyan-500 px-4 py-2 rounded-md font-semibold flex items-center"
        >
          <FaPlus className="mr-2" /> Add Car
        </Link>
      </div>
      <div className="w-full">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="bg-cyan-500 text-left text-white px-4 py-2 rounded-tl">
                  ID
                </th>
                <th className="bg-cyan-500 text-left text-white px-4 py-2">
                  Model
                </th>
                <th className="bg-cyan-500 text-left text-white px-4 py-2 hidden lg:table-cell ">
                  Number Of Seats
                </th>
                <th className="bg-cyan-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  Price Per KM
                </th>
                <th className="bg-cyan-500 text-left text-white px-4 py-2 rounded-tr">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td className="bg-white px-4 py-2">{car.id}</td>
                  <td className="bg-white px-4 py-2">
                    <Link
                      title="Show this car"
                      className="text-sky-500 hover:underline"
                      to={`/admin/cars/${car.id}`}
                    >
                      {car.model}
                    </Link>
                  </td>
                  <td className="bg-white px-4 py-2 hidden lg:table-cell ">
                    {car.number_of_seats}
                  </td>
                  <td className="bg-white px-4 py-2 hidden md:table-cell ">
                    ${car.price_per_km}
                  </td>
                  <td className="bg-white px-4 py-2 flex items-center select-none cursor-pointer">
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/cars/edit/${car.id}`}
                          className="flex items-center text-sky-500 active:text-blue-600"
                        >
                          <FaEdit className="mr-2" />{' '}
                          <span className="hidden md:block">Edit</span>
                        </Link>
                        <div
                          onClick={() => handleDelete(car.id)}
                          className="flex items-center text-red-500 active:text-rose-600"
                        >
                          <FaTrash className="mr-2" />{' '}
                          <span className="hidden md:block">Delete</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Home;
