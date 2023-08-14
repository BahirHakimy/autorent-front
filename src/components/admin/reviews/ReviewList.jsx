import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { fetchReviews } from '../../../context/features/reviewSlice';
import { Stars } from '../../reviews';

function MyBookings() {
  const { reviews, loading } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (reviews.length) return;
    dispatch(fetchReviews());
  }, [reviews.length, dispatch]);

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Reviews</h2>
      </div>
      <div className=" w-full">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="bg-blue-500 text-left text-white px-4 py-2 rounded-tl">
                  ID
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2">
                  Customer
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  Car
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr
                  className="hover:bg-gray-100 bg-white cursor-pointer"
                  key={review.id}
                  onClick={() => navigate(`/admin/bookings/${review.id}`)}
                >
                  <td className="px-4 py-2">{review.id}</td>
                  <td className="px-4 py-2 z-10">{review.user.email}</td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {review.car.model}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell ">
                    <Stars rate={review.rating} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
