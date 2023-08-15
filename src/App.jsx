import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersList, UserDetails, UserEdit } from './components/admin/users';
import { CarList, CarDetails, AddCar, EditCar } from './components/admin/cars';
import { BookingList, BookingDetails } from './components/admin/bookings';
import { PaymentList, PaymentDetails } from './components/admin/payments';
import { ReviewList, ReviewDetails } from './components/admin/reviews';
import { Register, Login } from './components/admin/auth';
import {
  Navbar,
  MyBookings,
  MyBookingDetails,
  MyProfile,
  EditProfile,
} from './components/myDashboard';
import { NotFound } from './components/animations';
import { Reviews } from './components/reviews';
import Layout from './components/shared/Layout';
import HomePage from './components/HomePage';
import AvailableCars from './components/AvailableCars';
import Booking from './components/Booking';
import { States } from './components/admin/dashboard';

function Router() {
  const { user } = useSelector((state) => state.user);

  return (
    <Routes>
      {user ? (
        user.is_admin ? (
          <Route path="admin" element={<Layout />}>
            <Route path="dashboard" element={<States />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/:user_id" element={<UserDetails />} />
            <Route path="users/edit/:user_id" element={<UserEdit />} />
            <Route path="cars" element={<CarList />} />
            <Route path="cars/:car_id" element={<CarDetails />} />
            <Route path="cars/add" element={<AddCar />} />
            <Route path="cars/edit/:car_id" element={<EditCar />} />
            <Route path="bookings" element={<BookingList />} />
            <Route path="bookings/:booking_id" element={<BookingDetails />} />
            <Route path="payments" element={<PaymentList />} />
            <Route path="payments/:payment_id" element={<PaymentDetails />} />
            <Route path="reviews" element={<ReviewList />} />
            <Route path="reviews/:review_id" element={<ReviewDetails />} />
            <Route path="" element={<Navigate to={'cars'} />} />
          </Route>
        ) : (
          <>
            <Route path="dashboard" element={<Layout AuthNav={Navbar} />}>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="my-profile/edit" element={<EditProfile />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="my-bookings/:id" element={<MyBookingDetails />} />
              <Route path="" element={<Navigate to={'my-bookings'} />} />
            </Route>
            <Route path="booking" element={<Booking />} />
            <Route path="reviews/:bookingId" element={<Reviews />} />
          </>
        )
      ) : (
        <>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </>
      )}

      <Route path="" element={<HomePage />} />
      <Route path="search" element={<AvailableCars />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
