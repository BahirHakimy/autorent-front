import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, Details, AddCar, EditCar } from './components/admin/cars';
import { BookingDetail, Home as UserHome } from './components/dashboard';
import { NotFound, UnderDevelopment } from './components/animations';
import Layout from './components/shared/Layout';
import HomePage from './components/HomePage';
import { Register, Login } from './components/admin/auth';
import CarList from './components/CarList';
import Booking from './components/Booking';
import { Navbar } from './components/dashboard';

function Router() {
  const { user } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="admin" element={<Layout />}>
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
            <Route path="" element={<Navigate to={'cars'} />} />
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
      <Route path="dashboard" element={<Layout AuthNav={Navbar} />}>
        <Route path="my-bookings" element={<UserHome />} />
        <Route path="my-bookings/:id" element={<BookingDetail />} />
        <Route path="" element={<Navigate to={'my-bookings'} />} />
      </Route>
      <Route path="home" element={<HomePage />} />
      <Route path="home/checkout" element={<Booking />} />
      <Route path="home/search" element={<CarList />} />
    </Routes>
  );
}

export default Router;
