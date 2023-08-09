import { Navigate, Route, Routes } from 'react-router-dom';
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
import Reviews from './components/Reviews';

function Router() {
  const { user } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="admin" element={<Layout />}>
        {user ? (
          <>
            <Route path="dashboard" element={<UnderDevelopment />} />
            <Route path="cars" element={<Home />} />
            <Route path="cars/:car_id" element={<Details />} />
            <Route path="cars/add" element={<AddCar />} />
            <Route path="cars/edit/:car_id" element={<EditCar />} />
            <Route path="bookings" element={<UnderDevelopment />} />
            <Route path="payments" element={<UnderDevelopment />} />
            <Route path="reviews" element={<UnderDevelopment />} />
            <Route path="" element={<Navigate to={'cars'} />} />
          </>
        ) : (
          <>
            <Route path="" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </>
        )}
      </Route>
      <Route path="dashboard" element={<Layout AuthNav={Navbar} />}>
        <Route path="my-bookings" element={<UserHome />} />
        <Route path="my-bookings/:id" element={<BookingDetail />} />
        <Route path="" element={<Navigate to={'my-bookings'} />} />
      </Route>
      <Route path="home" element={<HomePage />} />
      <Route path="home/checkout" element={<Booking />} />
      <Route path="home/search" element={<CarList />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="" element={<Navigate to={'home'} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
