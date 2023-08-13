import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../shared';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { fetchUsers, updateUser } from '../../../context/features/userSlice';

function UserEdit() {
  const { user_id } = useParams();
  const { users, userErrors, loading } = useSelector((state) => state.user);
  const user = users.filter((car) => car.id === parseInt(user_id))[0];
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [isStaff, setIsStaff] = useState(user?.is_staff);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = () => {
    let data = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    Object.keys(data).forEach((key) => {
      if (!data[key]) delete data[key];
    });
    data['is_staff'] = isStaff;
    dispatch(
      updateUser({
        id: user_id,
        data,
        callback: () => {
          toast.success('User info updated!');
          dispatch(fetchUsers());
          navigate(`/admin/users/${user_id}`);
        },
      })
    );
  };

  if (!user) return <Navigate to={`/admin/users/${user_id}`} />;
  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">
          Edit Users #{user?.id}
        </h2>
      </div>
      <div className="w-full">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex px-4 items-center space-x-2 font-semibold text-gray-900 leading-8">
              <FaEdit size={20} />
              <span className="tracking-wide">User Details</span>
            </div>
            <div className="text-gray-700 pt-8">
              <div className="grid md:grid-cols-2 text-sm gap-2">
                <div className="grid grid-cols-2">
                  <label
                    htmlFor="first_name"
                    className="px-4 py-2 font-semibold"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-4 py-2 outline-none border-b bg-blue-100 rounded"
                  />
                </div>
                <div className="grid grid-cols-2">
                  <label
                    htmlFor="last_name"
                    className="px-4 py-2 font-semibold"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-4 py-2 outline-none border-b bg-blue-100 rounded"
                  />
                </div>
                <div className="grid grid-cols-2">
                  <label htmlFor="email" className="px-4 py-2 font-semibold">
                    Email
                  </label>
                  <div className="w-full">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 outline-none border-b bg-blue-100 rounded"
                    />
                    <p className="text-sm w-full text-red-500">
                      {userErrors?.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <label
                    htmlFor="phone_number"
                    className="px-4 py-2 font-semibold"
                  >
                    Contact No
                  </label>
                  <div className="w-full">
                    <input
                      type="number"
                      name="phone_number"
                      id="phone_number"
                      maxLength={12}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="px-4 w-full py-2 outline-none border-b bg-blue-100 rounded"
                    />
                    <p className="text-sm w-full text-red-500">
                      {userErrors?.phone_number}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label htmlFor="is_staff" className="px-4 py-2 font-semibold">
                    Password
                  </label>
                  {showPassword ? (
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-4 py-2 outline-none border-b bg-blue-100 rounded"
                    />
                  ) : (
                    <button
                      onClick={() => setShowPassword(true)}
                      className="py-2 px-4 bg-blue-100 rounded text-xs md:text-sm font-semibold text-blue-800"
                    >
                      Change
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 items-center">
                  <label htmlFor="is_staff" className="px-4 py-2 font-semibold">
                    Is Staff
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      name="is_staff"
                      id="is_staff"
                      checked={isStaff}
                      onChange={() => setIsStaff(!isStaff)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end space-x-4 items-center mt-8">
              <Link
                to={`/admin/users/${user.id}`}
                className="py-2 px-4 bg-blue-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Cancel
              </Link>
              <button
                onClick={handleUpdate}
                className="py-2 px-4 bg-sky-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Update
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserEdit;
