import { FaArrowLeft, FaCarAlt } from 'react-icons/fa';
import { BiStar, BiUser } from 'react-icons/bi';
import { GiGearStickPattern } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  createReview,
  fetchCarReviews,
} from '../../context/features/reviewSlice';
import Stars from './Stars';
import ReviewCard from './ReviewCard';
import StarsInput from './StarsInput';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import toast from 'react-hot-toast';
import { Loading } from '../shared';

function Reviews() {
  const dispatch = useDispatch();
  const { reviews, car, selfReview, loading, error } = useSelector(
    (state) => state.review
  );
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { bookingId } = useParams();

  useEffect(() => {
    if (!reviews.length) dispatch(fetchCarReviews({ bookingId }));
  }, [bookingId, dispatch, reviews.length]);

  const handleCreate = () => {
    const data = { booking_id: bookingId, comment, rating };
    dispatch(createReview(data));
  };

  if (!bookingId) {
    return <Navigate to={'/home'} />;
  }

  if (error) {
    toast.error(error);
    navigate('/home');
  }

  if (loading || !car) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-col justify-center items-start max-w-screen-xl mx-auto h-full bg-white">
        <h1 className="py-5 ml-10 text-slate-600 font-bold text-lg">
          <button
            onClick={() => navigate(-1)}
            className="font-light flex items-center text-sm underline text-sky-500 active:font-semibold"
          >
            <FaArrowLeft className="mr-1" />
            Go Back
          </button>
          Reviews for {car.model}
        </h1>
        <div
          id="carCard"
          className="flex flex-wrap justify-between p-5 items-center bg-white "
        >
          <div className="px-1 md:px-4 flex flex-col">
            <h3 className="text-sm md:text-lg font-semibold my-2">
              {car.model}
            </h3>

            <ul className="py-4">
              <li className="flex items-center p-2 font-semibold w-full bg-slate-200">
                <BiUser className="mr-2" />
                Number Of Seats:
                <p className="text-sm block ml-auto pl-4">
                  {car.number_of_seats}
                </p>
              </li>
              <li className="flex items-center p-2 font-semibold w-full">
                <GiGearStickPattern className="mr-2" />
                Transmission Mode:{' '}
                <p className="text-sm block ml-auto pl-4">Automatic</p>
              </li>
              <li className="flex items-center p-2 font-semibold w-full bg-slate-200">
                <FaCarAlt className="mr-2" />
                Car Type:
                <p className="text-sm block ml-auto pl-4">{car.car_type}</p>
              </li>
              <li className="flex items-center p-2 font-semibold w-full">
                <BiStar className="mr-2" />
                Rating:{' '}
                <div className="relative flex gap-1 ml-auto">
                  {car.rating ? (
                    <Stars rate={car.rating} />
                  ) : (
                    <p className="text-sm">No reviews yet</p>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <img
            className="w-1/3 "
            src="http://127.0.0.1:8000/media/cars/saleva-sedan_2exciIg.webp"
            alt="car image"
          />
        </div>
        <div className="w-full px-10 flex flex-col gap-2 p-5 overflow-auto text-slate-700">
          {selfReview ? (
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-700">
                Your review
              </h3>
              <hr />
              <ReviewCard title={'Your review'} review={selfReview} />
            </div>
          ) : (
            <div className="px-4 py-8 shadow rounded bg-slate-50">
              <h1 className="text-2xl font-semibold">
                How was the experiance of traveling with our service?
              </h1>
              <div className="w-full flex justify-between my-4">
                <StarsInput rating={rating} setRating={setRating} />
              </div>
              <div className="flex bg-gray-600 bg-opacity-20 border border-slate-200 rounded-md">
                <textarea
                  rows={5}
                  type="textarea"
                  name="review"
                  id="review"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Add your review"
                  className="w-full p-2 rounded bg-white focus:outline-none "
                />
              </div>

              <div className="flex justify-end w-full py-2">
                {loading ? (
                  <Loading />
                ) : (
                  <button
                    onClick={handleCreate}
                    className="px-4 p-2 rounded text-white shadow cursor-pointer hover:bg-blue-400 bg-blue-500"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          )}
          <h3 className="text-lg font-semibold mt-10 text-slate-700">
            Other users review
          </h3>
          <hr />
          {reviews.map((review) => (
            <ReviewCard key={review?.user.username} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
