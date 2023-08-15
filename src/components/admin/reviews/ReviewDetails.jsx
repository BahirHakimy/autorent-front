import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../shared';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  deleteReview,
  fetchReview,
} from '../../../context/features/reviewSlice';
import { Stars } from '../../reviews';
import { FcInfo } from 'react-icons/fc';
import { getFormattedDateTime } from '../../../utils/tools';
import toast from 'react-hot-toast';

function ReviewDetails() {
  const { review, loading, error } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { review_id } = useParams();

  React.useEffect(() => {
    dispatch(fetchReview(review_id));
  }, [dispatch, review_id]);

  const handleDelete = () => {
    dispatch(
      deleteReview({
        id: review.id,
        callback: () => toast.success('Review Deleted'),
        reject: () => toast.error('Failed to delete review'),
      })
    );
  };

  if (error) {
    toast.error(error);
    return <Navigate to="/admin/reviews" />;
  }

  return (
    <div className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-cyan-600 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Reivew #{review?.id}</h2>
      </div>
      <div className="w-full">
        {loading || !review ? (
          <Loading />
        ) : (
          <div className="relative bg-white p-2 md:p-6 shadow-md rounded">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <FcInfo size={20} />
              <span className="tracking-wide">Review Details</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Rating</div>
                  <div className="px-4 py-2">
                    <Stars rate={review.rating} />
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Comment</div>
                  <div className="px-4 py-2">{review.comment}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Given At</div>
                  <div className="px-4 py-2">
                    {getFormattedDateTime(review.created_at)}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Customer</div>

                  <Link
                    to={`/admin/users/${review.user.id}`}
                    className="px-4 py-2 underline text-sky-500"
                  >
                    {review.user.email}
                  </Link>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Vehicle</div>

                  <Link
                    to={`/admin/cars/${review.car.id}`}
                    className="px-4 py-2 underline text-sky-500"
                  >
                    {review.car.model}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 items-center mt-8">
              <button
                onClick={() => navigate(-1)}
                className="py-2 px-4 bg-cyan-600 active:bg-blue-600 hover:bg-blue-400 rounded text-xs md:text-sm font-semibold text-white"
              >
                Back
              </button>

              <button
                onClick={handleDelete}
                className="py-2 px-4 bg-rose-500 active:bg-rose-600 hover:bg-rose-400 rounded text-xs md:text-sm font-semibold text-white"
              >
                Delete Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewDetails;
