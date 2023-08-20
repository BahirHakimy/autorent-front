import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { CarAnimation } from '../../animations';
import { Loading } from '../../shared';
import { login } from '../../../context/features/userSlice';

function Login() {
  const { loading, error, target } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    dispatch(
      login({
        email: email.value,
        password: password.value,
        callback: (to = '/dashboard') => {
          target ? navigate(target) : navigate(to);
          toast.success('Welcome.');
        },
      })
    );
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-slate-50 bg-[url('/src/assets/bg.jpg')]  bg-cover bg-center">
      <div className="backdrop-blur-3xl shadow-md rounded-md w-96 p-8">
        <CarAnimation height={200} width={200} />
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-4">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={`bg-transparent text-white w-full px-4 py-2 border ${
                error ? 'border-orange-400' : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className={`bg-transparent text-white w-full px-4 py-2 border ${
                error ? 'border-orange-400' : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-600`}
            />
          </div>
          <p
            className="text-sm text-yellow-300 font-semibold pb-4"
            role="alert"
          >
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
        <Link className="text-sm my-2 text-sky-300" to="/signup">
          Don&apos;t have an account? Sign-up now
        </Link>
      </div>
    </div>
  );
}

export default Login;
