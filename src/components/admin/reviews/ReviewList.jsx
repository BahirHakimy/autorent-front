import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../shared';
import { useNavigate } from 'react-router-dom';
import {
  fetchReviews,
  setCurrentPage,
  setReviewSortProp,
} from '../../../context/features/reviewSlice';
import { Stars } from '../../reviews';
import { sortBasedOnProperty } from '../../../utils/tools';
import {
  BiSolidChevronDownSquare,
  BiSolidChevronUpSquare,
} from 'react-icons/bi';
import { LuChevronsDownUp } from 'react-icons/lu';

function ReviewList() {
  const { reviews, currentPage, hasNext, loading, sortProp } = useSelector(
    (state) => state.review
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');

  React.useEffect(() => {
    if (reviews.length < currentPage * 20) {
      if (currentPage > 1) {
        hasNext && dispatch(fetchReviews(currentPage));
      } else {
        dispatch(fetchReviews(currentPage));
      }
    }
  }, [reviews.length, dispatch, currentPage, hasNext]);

  const handleScroll = (ev) => {
    const element = ev.target;
    if (element.scrollHeight - element.offsetHeight === element.scrollTop) {
      if (!loading && hasNext) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    }
  };

  let sortedReviews = sortProp
    ? sortBasedOnProperty(reviews, sortProp, order)
    : reviews;

  return (
    <div
      onScroll={handleScroll}
      className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full"
    >
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-cyan-600 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">
          {reviews.length} Reviews
        </h2>
      </div>
      <div className=" w-full">
        <table className="table-auto w-full">
          <thead>
            <tr className="select-none">
              <th className="bg-cyan-500 text-left text-white px-1 sm:px-4 py-2 rounded-tl hidden sm:table-cell">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <p>ID</p>
                  {sortProp === 'id' ? (
                    order === 'dec' ? (
                      <BiSolidChevronDownSquare
                        onClick={() => setOrder('asc')}
                      />
                    ) : (
                      <BiSolidChevronUpSquare onClick={() => setOrder('dec')} />
                    )
                  ) : (
                    <LuChevronsDownUp
                      onClick={() => dispatch(setReviewSortProp('id'))}
                    />
                  )}
                </div>
              </th>
              <th className="bg-cyan-500 text-left text-white px-1 sm:px-4 py-2">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <p>Customer</p>
                  {sortProp === 'user.email' ? (
                    order === 'dec' ? (
                      <BiSolidChevronDownSquare
                        onClick={() => setOrder('asc')}
                      />
                    ) : (
                      <BiSolidChevronUpSquare onClick={() => setOrder('dec')} />
                    )
                  ) : (
                    <LuChevronsDownUp
                      onClick={() => dispatch(setReviewSortProp('user.email'))}
                    />
                  )}
                </div>
              </th>
              <th className="bg-cyan-500 text-left text-white px-1 sm:px-4 py-2 hidden md:table-cell">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <p>Car</p>
                  {sortProp === 'car.model' ? (
                    order === 'dec' ? (
                      <BiSolidChevronDownSquare
                        onClick={() => setOrder('asc')}
                      />
                    ) : (
                      <BiSolidChevronUpSquare onClick={() => setOrder('dec')} />
                    )
                  ) : (
                    <LuChevronsDownUp
                      onClick={() => dispatch(setReviewSortProp('car.model'))}
                    />
                  )}
                </div>
              </th>
              <th className="bg-cyan-500 text-left text-white px-1 sm:px-4 py-2">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <p>Rate</p>
                  {sortProp === 'rating' ? (
                    order === 'dec' ? (
                      <BiSolidChevronDownSquare
                        onClick={() => setOrder('asc')}
                      />
                    ) : (
                      <BiSolidChevronUpSquare onClick={() => setOrder('dec')} />
                    )
                  ) : (
                    <LuChevronsDownUp
                      onClick={() => dispatch(setReviewSortProp('rating'))}
                    />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedReviews.map((review) => (
              <tr
                className="hover:bg-gray-100 bg-white cursor-pointer border-b"
                key={review.id}
                onClick={() => navigate(`/admin/reviews/${review.id}`)}
              >
                <td className="px-1 sm:px-4 py-2 hidden sm:table-cell">
                  {review.id}
                </td>
                <td className="px-1 sm:px-4 py-2 z-10">{review.user.email}</td>
                <td className="px-1 sm:px-4 py-2 hidden md:table-cell">
                  {review.car.model}
                </td>
                <td className="px-1 sm:px-4 py-2">
                  <Stars rate={review.rating} />
                </td>
              </tr>
            ))}
            {hasNext && !loading && (
              <tr className="hover:bg-gray-100 bg-white cursor-pointer  ">
                <td colSpan={5} className="text-center">
                  <button
                    className="shadow px-2 py-1 rounded-xl text-slate-500"
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                  >
                    Load More
                  </button>
                </td>
              </tr>
            )}
            {loading && (
              <tr className="hover:bg-gray-100 bg-white cursor-pointer ">
                <td colSpan={5} rowSpan={4}>
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewList;
