import { FaCarAlt, FaStar, FaStarHalf, FaStarHalfAlt } from 'react-icons/fa';
import Navbar from './Navbar';
import { BiStar, BiUser } from 'react-icons/bi';
import { GiGearStickPattern } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createReview, fetchReviews } from '../context/features/reviewSlice';

function Reviews() {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.review);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!reviews.length) dispatch(fetchReviews());
  }, []);

  const handleCreate = () => {
    const data = { booking_id: 9, comment, rating };
    dispatch(createReview(data));
  };

  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-col justify-center items-start max-w-screen-xl mx-auto h-full bg-white">
        <h1 className="py-5 ml-10 text-slate-600 font-bold text-lg">
          Reviews for Nissan GTR
        </h1>
        <div
          id="carCard"
          className="flex flex-wrap justify-between p-5 items-center bg-white "
        >
          <div className="px-1 md:px-4 flex flex-col">
            <h3 className="text-sm md:text-lg font-semibold my-2">
              Nissan GTR
            </h3>

            <ul className="py-4">
              <li className="flex items-center p-2 font-semibold w-full bg-slate-200">
                <BiUser className="mr-2" />
                Number Of Seats:
                <p className="text-sm block ml-auto pl-4">4</p>
              </li>
              <li className="flex items-center p-2 font-semibold w-full">
                <GiGearStickPattern className="mr-2" />
                Transmission Mode:{' '}
                <p className="text-sm block ml-auto pl-4">Automatic</p>
              </li>
              <li className="flex items-center p-2 font-semibold w-full bg-slate-200">
                <FaCarAlt className="mr-2" />
                Car Type:
                <p className="text-sm block ml-auto pl-4">Sport</p>
              </li>
              <li className="flex items-center p-2 font-semibold w-full">
                <BiStar className="mr-2" />
                Rating:{' '}
                <div className="relative flex gap-1 ml-auto text-slate-400 stars">
                  <span className="">
                    <FaStar className="cursor-pointer" size={20} />
                  </span>
                  <span className="">
                    <FaStar className="cursor-pointer" size={20} />
                  </span>
                  <span className="">
                    <FaStar className="cursor-pointer" size={20} />
                  </span>
                  <span className="">
                    <FaStar className="cursor-pointer" size={20} />
                  </span>
                  <span className="">
                    <FaStarHalfAlt className="cursor-pointer" size={20} />
                  </span>
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
          <div className="px-4 py-8 shadow rounded bg-slate-50">
            <h1 className="text-2xl font-semibold">
              How was the experiance of traveling with our service?
            </h1>
            <div className="w-full flex justify-between my-4">
              <div className="relative flex p-1 gap-1 text-slate-300 stars cursor-pointer">
                <span className="">
                  <FaStar
                    onClick={() => setRating(1)}
                    className={`${rating > 0 ? 'text-yellow-300' : ''}`}
                    size={20}
                  />
                </span>
                <span className="">
                  <FaStar
                    onClick={() => setRating(2)}
                    className={`${rating > 1 ? 'text-yellow-300' : ''}`}
                    size={20}
                  />
                </span>
                <span className="">
                  <FaStar
                    onClick={() => setRating(3)}
                    className={`${rating > 2 ? 'text-yellow-300' : ''}`}
                    size={20}
                  />
                </span>
                <span className="">
                  <FaStar
                    onClick={() => setRating(4)}
                    className={`${rating > 3 ? 'text-yellow-300' : ''}`}
                    size={20}
                  />
                </span>
                <span className="">
                  <FaStar
                    onClick={() => setRating(5)}
                    className={`${rating > 4 ? 'text-yellow-300' : ''}`}
                    size={20}
                  />
                </span>
              </div>
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
              <button
                onClick={handleCreate}
                className="px-4 p-2 rounded text-white shadow cursor-pointer hover:bg-blue-400 bg-blue-500"
              >
                Post
              </button>
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-10 text-slate-700">
            Other users review
          </h3>
          <hr />
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-col gap-4 bg-slate-50 rounded mb-8 p-4">
              <div className="flex justify justify-between">
                <div className="flex gap-2">
                  <div className="w-7 h-7 text-center rounded-full text-white bg-blue-500">
                    J
                  </div>
                  <span className="font-semibold ">Jess Hopkins</span>
                </div>
                <div className="flex p-1 gap-1 text-orange-300">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="text-slate-100" />
                </div>
              </div>

              <div>
                Gorgeous design! Even more responsive than the previous version.
                A pleasure to use!
              </div>

              <div className="flex justify-between">
                <span>Feb 13, 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
