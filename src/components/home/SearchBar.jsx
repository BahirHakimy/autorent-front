import { useDispatch } from 'react-redux';
import { setData } from '../../context/features/searchSlice';
import { DatetimePicker, Suggestion } from '../shared';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
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

    navigate('/home/search');
  };

  return (
    <div className="bg-blue-500 p-2 md:mt-2 w-fit rounded-md mx-auto relative">
      <div className="flex justify-between items-start flex-wrap">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap w-full lg:space-x-2"
        >
          <Suggestion id="pickup" label={'Pick-up location'} />
          <Suggestion id="dropoff" label={'Drop-off location'} />
          <DatetimePicker id={'pickup_date'} label={'Pick-up date'} />
          <DatetimePicker id={'dropoff_date'} label={'Drop-off date'} />
          <button className="font-bold text-white bg-sky-500 w-full lg:w-auto rounded-md my-1 px-4 flex-1 min-h-[48px] lg:min-h-[64px]">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
