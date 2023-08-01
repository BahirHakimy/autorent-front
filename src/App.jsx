import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login, Register } from './components/auth';
import { Home, Details, AddCar, EditCar } from './components/cars';
import { NotFound, UnderDevelopment } from './components/animations';
import Layout from './components/Layout';
import Map from './components/Map';
import HomePage from './components/HomePage';

function Router() {
  const { user } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="" element={<Layout />}>
        {user ? (
          <>
            <Route
              path="dashboard"
              element={
                <h1 className="h-screen w-full flex justify-center items-center">
                  <UnderDevelopment loop={true} />
                </h1>
              }
            />
            <Route path="cars" element={<Home />} />
            <Route path="cars/:car_id" element={<Details />} />
            <Route path="cars/add" element={<AddCar />} />
            <Route path="cars/edit/:car_id" element={<EditCar />} />
            <Route
              path="bookings"
              element={
                <h1 className="h-screen w-full flex justify-center items-center">
                  <UnderDevelopment loop={true} />
                </h1>
              }
            />
            <Route
              path="payments"
              element={
                <h1 className="h-screen w-full flex justify-center items-center">
                  <UnderDevelopment loop={true} />
                </h1>
              }
            />
            <Route
              path="reviews"
              element={
                <h1 className="h-screen w-full flex justify-center items-center">
                  <UnderDevelopment loop={true} />
                </h1>
              }
            />
            <Route path="/" element={<Navigate to={'cars'} />} />
          </>
        ) : (
          <>
            <Route path="" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </>
        )}
        <Route
          path="*"
          element={
            <h1 className="h-screen w-full flex flex-col justify-center items-center">
              <div className="max-h-screen overflow-hidden flex justify-center items-center">
                <NotFound loop={true} />
              </div>
              <Link className="text-sky-500 underline pb-20" to={'/'}>
                Go Back Home
              </Link>
            </h1>
          }
        />
      </Route>
      <Route path="home" element={<HomePage />} />
    </Routes>
  );
}

export default Router;
