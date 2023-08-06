import { useDispatch, useSelector } from 'react-redux';
import { addToast } from '../../../context/features/toastSlice';
import { CarAnimation } from '../../animations';
import { Loading } from '../../shared';
import { login } from '../../../context/features/userSlice';

function Login() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    dispatch(
      login({
        email: email.value,
        password: password.value,
        callback: () => dispatch(addToast('Logged In successfully')),
      })
    );
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-slate-50">
      <div className="bg-white shadow-md rounded-md w-96 p-8">
        <CarAnimation height={200} width={200} />
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-4">
            <label htmlFor="email" className="text-blue-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={`w-full px-4 py-2 border ${
                error ? 'border-red-400' : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-blue-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className={`w-full px-4 py-2 border ${
                error ? 'border-red-400' : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
          </div>
          <p className="text-sm text-red-600 font-semibold pb-4" role="alert">
            {error}
          </p>
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;