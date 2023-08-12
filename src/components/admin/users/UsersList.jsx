import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCar } from '../../../context/features/carSlice';
import { Loading } from '../../shared';
import toast from 'react-hot-toast';
import { fetchUsers } from '../../../context/features/userSlice';

function BookingList() {
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('Fetchin');
    dispatch(fetchUsers());
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
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Users</h2>
      </div>
      <div className="w-full">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="bg-blue-500 text-left text-white px-4 py-2 rounded-tl">
                  ID
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2">
                  Email
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  Fullname
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  Phone Number
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2 rounded-tr">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="bg-white px-4 py-2">{user.id}</td>
                  <td className="bg-white px-4 py-2">
                    <Link
                      title="Show this car"
                      className="text-sky-500 hover:underline"
                      to={`/admin/users/${user.id}`}
                    >
                      {user.email}
                    </Link>
                  </td>
                  <td className="bg-white px-4 py-2 hidden md:table-cell ">
                    {user.fullname || (
                      <span className="text-slate-400 text-sm font-semibold">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="bg-white px-4 py-2 hidden md:table-cell ">
                    {user.phone_number || (
                      <span className="text-slate-400 text-sm font-semibold">
                        N/A
                      </span>
                    )}
                  </td>
                  <td className="bg-white px-4 py-2 flex items-center select-none cursor-pointer">
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/cars/edit/${user.id}`}
                          className="flex items-center text-sky-500 active:text-blue-600"
                        >
                          <FaEdit className="mr-2" />{' '}
                          <span className="hidden md:block">Edit</span>
                        </Link>
                        <div
                          onClick={() => handleDelete(user.id)}
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

export default BookingList;
