import { useEffect } from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteCar,
  fetchCars,
  setCurrentPage,
} from '../../../context/features/carSlice';
import { Loading } from '../../shared';
import toast from 'react-hot-toast';

function Home() {
  const { cars, currentPage, hasNext, loading } = useSelector(
    (state) => state.car
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (cars.length < currentPage * 20) {
      if (currentPage > 1) {
        hasNext && dispatch(fetchCars(currentPage));
      } else {
        dispatch(fetchCars(currentPage));
      }
    }
  }, [cars.length, currentPage, dispatch, hasNext]);

  const handleDelete = (id) => {
    if (loading) return;
    dispatch(
      deleteCar({
        id,
        callback: () => toast.success('Car deleted successfully'),
      })
    );
  };

  const handleScroll = (ev) => {
    const element = ev.target;
    if (element.scrollHeight - element.offsetHeight === element.scrollTop) {
      if (!loading && hasNext) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full"
    >
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-cyan-600 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">{cars.length} Cars</h2>
        <Link
          to="/admin/cars/add"
          className="text-white bg-cyan-500 px-4 py-2 rounded-md font-semibold flex items-center"
        >
          <FaPlus className="mr-2" /> Add Car
        </Link>
      </div>
      <div className="w-full">
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
              <tr key={car.id} className="border-b">
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
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/cars/edit/${car.id}`}
                      className="flex items-center text-sky-500 active:text-blue-600"
                    >
                      <FaEdit className="mr-2" />{' '}
                      <span className="hidden md:block">Edit</span>
                    </Link>
                    <button
                      disabled={loading}
                      onClick={() => handleDelete(car.id)}
                      className="flex items-center disabled:opacity-50 text-red-500 active:text-rose-600"
                    >
                      <FaTrash className="mr-2" />{' '}
                      <span className="hidden md:block">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {hasNext && !loading && (
              <tr className="hover:bg-gray-100 bg-white cursor-pointer ">
                <td colSpan={5} className="text-center">
                  <button
                    className="shadow px-2 py-1 rounded-xl text-slate-500"
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                  >
                    Load More
                  </button>
                </td>
              </tr>
            )}
            {loading && (
              <tr className="hover:bg-gray-100 bg-white cursor-pointer ">
                <td colSpan={5} rowSpan={4}>
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
