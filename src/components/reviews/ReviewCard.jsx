/* eslint-disable react/prop-types */

import Stars from './Stars';

function ReviewCard({ review }) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex flex-col gap-4 bg-slate-50 rounded mb-8 p-4">
        <div className="flex justify justify-between">
          <div className="flex gap-2">
            <div className="w-7 h-7 text-center capitalize rounded-full text-white bg-blue-500">
              {review.user?.fullname[0] || review.user?.email[0]}
            </div>
            <span className="font-semibold capitalize">
              {review?.fullname || review?.user.email}
            </span>
          </div>
          <Stars rate={review?.rating} />
        </div>

        <div>{review?.comment}</div>

        <div className="flex justify-between">
          <span>
            {new Date(review.created_at).toLocaleString('en-US', {
              year: 'numeric',
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
