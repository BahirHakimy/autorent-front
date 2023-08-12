import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../context/features/searchSlice';
import { DatetimePicker, Suggestion } from '../shared';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    pickup_location,
    dropoff_location,
    pickup_datetime,
    dropoff_datetime,
  } = useSelector((state) => state.search.locations);
  const handleSubmit = ({
    target: { pickup, dropoff, pickup_date, dropoff_date },
  }) => {
    event.preventDefault();
    dispatch(
      setData({
        pickup_location: pickup.value,
        dropoff_location: dropoff.value,
        pickup_datetime: pickup_date.value,
        dropoff_datetime: dropoff_date.value,
      })
    );

    navigate('/search');
  };

  return (
    <div className="bg-blue-500 p-2 md:mt-2 w-fit rounded-md mx-auto relative">
      <div className="flex justify-between items-start flex-wrap">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap w-full lg:space-x-2"
        >
          <Suggestion
            id="pickup"
            label={'Pick-up location'}
            defaultValue={pickup_location}
          />
          <Suggestion
            id="dropoff"
            label={'Drop-off location'}
            defaultValue={dropoff_location}
          />
          <DatetimePicker
            id={'pickup_date'}
            label={'Pick-up date'}
            defaultValue={pickup_datetime}
          />
          <DatetimePicker
            id={'dropoff_date'}
            label={'Drop-off date'}
            defaultValue={dropoff_datetime}
          />
          <button className="font-bold text-white bg-sky-500 w-full lg:w-auto rounded-md my-1 px-4 flex-1 min-h-[48px] lg:min-h-[64px]">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
