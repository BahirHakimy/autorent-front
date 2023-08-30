import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../../shared';
import toast from 'react-hot-toast';
import { deleteUser, fetchUsers } from '../../../context/features/userSlice';
import { sortBasedOnProperty } from '../../../utils/tools';
import {
  BiSolidChevronDownSquare,
  BiSolidChevronUpSquare,
} from 'react-icons/bi';
import { LuChevronsDownUp } from 'react-icons/lu';
import { setUserSortProp } from '../../../context/features/userSlice';

function BookingList() {
  const { users, loading, sortProp } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [order, setOrder] = useState('asc');

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (loading) return;
    dispatch(
      deleteUser({
        id,
        callback: () => toast.success('User deleted successfully'),
      })
    );
  };

  let sortedUsers = sortProp
    ? sortBasedOnProperty(users, sortProp, order)
    : users;

  return (
    <div className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-cyan-600 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">{users.length} Users</h2>
      </div>
      <div className="w-full">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="select-none">
                <th className="bg-cyan-500 text-left text-white px-4 py-2 rounded-tl hidden sm:table-cell">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <p>ID</p>
                    {sortProp === 'id' ? (
                      order === 'dec' ? (
                        <BiSolidChevronDownSquare
                          onClick={() => setOrder('asc')}
                        />
                      ) : (
                        <BiSolidChevronUpSquare
                          onClick={() => setOrder('dec')}
                        />
                      )
                    ) : (
                      <LuChevronsDownUp
                        onClick={() => dispatch(setUserSortProp('id'))}
                      />
                    )}
                  </div>
                </th>
                <th className="bg-cyan-500 text-left text-white px-4 py-2">
                  Email
                </th>
                <th className="bg-cyan-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <p>Fullname</p>
                    {sortProp === 'fullname' ? (
                      order === 'dec' ? (
                        <BiSolidChevronDownSquare
                          onClick={() => setOrder('asc')}
                        />
                      ) : (
                        <BiSolidChevronUpSquare
                          onClick={() => setOrder('dec')}
                        />
                      )
                    ) : (
                      <LuChevronsDownUp
                        onClick={() => dispatch(setUserSortProp('fullname'))}
                      />
                    )}
                  </div>
                </th>
                <th className="bg-cyan-500 text-left text-white px-4 py-2 hidden lg:table-cell ">
                  Phone Number
                </th>
                <th className="bg-cyan-500 text-left text-white px-4 py-2 rounded-tr">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="bg-white px-4 py-2 hidden sm:table-cell">
                    {user.id}
                  </td>
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
                  <td className="bg-white px-4 py-2 hidden lg:table-cell ">
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
                          to={`/admin/users/edit/${user.id}`}
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
