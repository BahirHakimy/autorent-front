import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Loading } from '../shared';
import { useDispatch, useSelector } from 'react-redux';
import { FcInfo } from 'react-icons/fc';
import { getFormattedDateTime } from '../../utils/tools';
import { useEffect } from 'react';
import { fetchUser } from '../../context/features/userSlice';
import toast from 'react-hot-toast';

function MyProfile() {
  const {
    user: { user_id },
    fetchedUser: user,
    loading,
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser(user_id));
  }, [dispatch, user_id]);

  if (error) {
    toast.error(error);
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Your Profile</h2>
      </div>
      <div className="w-full">
        {loading || !user ? (
          <Loading />
        ) : (
          <div className="bg-white p-2 md:p-6 shadow-md rounded">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <FcInfo size={20} />
              <span className="tracking-wide">Personal info</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-1 sm:px-2 md:px-4 py-2 font-semibold">
                    First Name
                  </div>
                  <div className="px-1 sm:px-2 md:px-4 py-2">
                    {user.first_name || (
                      <span className="text-slate-400 text-sm font-semibold">
                        N/A
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-1 sm:px-2 md:px-4 py-2 font-semibold">
                    Last Name
                  </div>
                  <div className="px-1 sm:px-2 md:px-4 py-2">
                    {' '}
                    {user.last_name || (
                      <span className="text-slate-400 text-sm font-semibold">
                        N/A
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-1 sm:px-2 md:px-4 py-2 font-semibold">
                    Contact No
                  </div>
                  <div className="px-1 sm:px-2 md:px-4 py-2">
                    {user.phone_number || (
                      <span className="text-slate-400 text-sm font-semibold">
                        N/A
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-1 sm:px-2 md:px-4 py-2 font-semibold">
                    Date Joined
                  </div>
                  <div className="px-1 sm:px-2 md:px-4 py-2">
                    {getFormattedDateTime(user.date_joined)}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-1 sm:px-2 md:px-4 py-2 font-semibold">
                    Email
                  </div>
                  <div className="px-1 sm:px-2 md:px-4 py-2">
                    <a className="text-blue-800" href={`mailto:${user.email}`}>
                      {user.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 items-center mt-8">
              <button
                onClick={() => navigate('/')}
                className="py-2 px-4 bg-blue-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Back To Home
              </button>
              <Link
                to={`/dashboard/my-profile/edit`}
                className="py-2 px-4 bg-sky-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
