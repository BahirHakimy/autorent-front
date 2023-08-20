import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { CarAnimation } from '../../animations';
import { register } from '../../../context/features/userSlice';
import { Loading } from '../../shared';
import { Link } from 'react-router-dom';

function Register() {
  const { loading, userErrors, target } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;

    dispatch(
      register({
        email: email.value,
        password: password.value,
        callback: () => navigate(target ? target : '/dashboard'),
      })
    );
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center w-full bg-[url('/src/assets/bg.jpg')]  bg-cover bg-center">
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
              className={`w-full bg-transparent text-white px-4 py-2 border ${
                userErrors?.email ? 'border-orange-400' : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-300`}
            />
            <p className="text-sm text-yellow-300 font-semibold" role="alert">
              {userErrors?.email}
            </p>
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
              className={`w-full bg-transparent text-white px-4 py-2 border ${
                userErrors?.password ? 'border-orange-400' : 'border-blue-400'
              } rounded-md focus:outline-none focus:border-blue-300`}
            />
            <p className="text-sm  font-semibold" role="alert">
              {userErrors?.password}
            </p>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition-colors"
            >
              Regitser
            </button>
          )}
        </form>
        <Link className="text-sm my-2 text-sky-300" to="/login">
          Have an account? Log-in instead
        </Link>
      </div>
    </div>
  );
}

export default Register;
