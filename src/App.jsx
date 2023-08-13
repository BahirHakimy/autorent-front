import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, Details, AddCar, EditCar } from './components/admin/cars';
import { UserDetail, UserEdit, UsersList } from './components/admin/users';
import { BookingDetail, MyBookings } from './components/dashboard';
import { NotFound, UnderDevelopment } from './components/animations';
import Layout from './components/shared/Layout';
import HomePage from './components/HomePage';
import { Register, Login } from './components/admin/auth';
import CarList from './components/CarList';
import Booking from './components/Booking';
import { Navbar } from './components/dashboard';
import { Reviews } from './components/reviews';
import { BookingList } from './components/admin/bookings';

function Router() {
  const { user } = useSelector((state) => state.user);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="admin" element={<Layout />}>
            <Route path="dashboard" element={<UnderDevelopment />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/:user_id" element={<UserDetail />} />
            <Route path="users/edit/:user_id" element={<UserEdit />} />
            <Route path="cars" element={<Home />} />
            <Route path="cars/:car_id" element={<Details />} />
            <Route path="cars/add" element={<AddCar />} />
            <Route path="cars/edit/:car_id" element={<EditCar />} />
            <Route path="bookings" element={<BookingList />} />
            <Route path="payments" element={<UnderDevelopment />} />
            <Route path="reviews" element={<UnderDevelopment />} />
            <Route path="" element={<Navigate to={'cars'} />} />
          </Route>
          <Route path="dashboard" element={<Layout AuthNav={Navbar} />}>
            <Route path="my-profile" element={<UnderDevelopment />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="my-bookings/:id" element={<BookingDetail />} />
            <Route path="" element={<Navigate to={'my-bookings'} />} />
          </Route>
          <Route path="booking" element={<Booking />} />
          <Route path="reviews/:bookingId" element={<Reviews />} />
        </>
      ) : (
        <>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </>
      )}

      <Route path="" element={<HomePage />} />
      <Route path="search" element={<CarList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
