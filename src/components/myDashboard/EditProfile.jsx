import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchUser, updateUser } from '../../context/features/userSlice';
import { Loading } from '../shared';

function EditProfile() {
  const {
    user: { user_id },
    fetchedUser: user,
    loading,
    error,
    userErrors,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser(user_id));
  }, [dispatch, user_id]);

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordMathError, setPasswordMatchError] = useState('');

  const handleUpdate = () => {
    let data = {
      email,
      old_password: oldPassword,
      password: newPassword,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    if (showPassword && newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords don't match.");
    } else {
      setPasswordMatchError('');
      console.log(data);
      Object.keys(data).forEach((key) => {
        if (!data[key] || data[key] === user[key]) delete data[key];
      });
      Object.keys(data).length > 0 &&
        dispatch(
          updateUser({
            id: user_id,
            data,
            callback: () => {
              toast.success('Profile updated!');
              navigate(`/dashboard/my-profile`);
            },
          })
        );
    }
  };

  if (error) {
    toast.error(error);
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Edit Your Profile</h2>
      </div>
      <div className="w-full">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex px-4 items-center space-x-2 font-semibold text-gray-900 leading-8">
              <FaEdit size={20} />
              <span className="tracking-wide">Personal info</span>
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
                    placeholder="John"
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
                    placeholder="Doe"
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
                      placeholder="john@example.com"
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
                      placeholder="+93789789789"
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
                {showPassword ? (
                  <>
                    <div className="grid grid-cols-2">
                      <label
                        htmlFor="new_password"
                        className="px-4 py-2 font-semibold"
                      >
                        New Password
                      </label>
                      <div className="w-full">
                        <input
                          type="password"
                          name="new_password"
                          placeholder="•••••••••"
                          id="new_password"
                          maxLength={12}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="px-4 w-full py-2 outline-none border-b bg-blue-100 rounded"
                        />
                        <p className="text-sm w-full text-red-500">
                          {userErrors?.new_password}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <label
                        htmlFor="new_password"
                        className="px-4 py-2 font-semibold"
                      >
                        Confirm New Password
                      </label>
                      <div className="w-full">
                        <input
                          type="password"
                          name="new_password"
                          placeholder="•••••••••"
                          id="new_password"
                          maxLength={12}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="px-4 w-full py-2 outline-none border-b bg-blue-100 rounded"
                        />
                        <p className="text-sm w-full text-red-500">
                          {passwordMathError}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <label
                        htmlFor="old_password"
                        className="px-4 py-2 font-semibold"
                      >
                        Current Password
                      </label>
                      <div className="w-full">
                        <input
                          type="password"
                          name="old_password"
                          placeholder="•••••••••"
                          id="old_password"
                          maxLength={12}
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="px-4 w-full py-2 outline-none border-b bg-blue-100 rounded"
                        />
                        <p className="text-sm w-full text-red-500">
                          {userErrors?.old_password}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <label
                        htmlFor="is_staff"
                        className="px-4 py-2 font-semibold"
                      >
                        Hide Fields
                      </label>

                      <button
                        onClick={() => setShowPassword(false)}
                        className="py-2 px-4 bg-blue-100 rounded text-xs md:text-sm font-semibold text-blue-800"
                      >
                        Hide
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 items-center">
                    <label
                      htmlFor="is_staff"
                      className="px-4 py-2 font-semibold"
                    >
                      Password
                    </label>

                    <button
                      onClick={() => setShowPassword(true)}
                      className="py-2 px-4 bg-blue-100 rounded text-xs md:text-sm font-semibold text-blue-800"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end space-x-4 items-center mt-8">
              <Link
                to={`/dashboard/my-profile`}
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

export default EditProfile;
