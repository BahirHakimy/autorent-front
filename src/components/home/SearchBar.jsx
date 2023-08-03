import { DatetimePicker, Suggestion } from '../shared';

function SearchBar() {
  const handleSubmit = (event) => {
    event.preventDefault();
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
