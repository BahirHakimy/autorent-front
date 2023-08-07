/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { getFormattedDate, getFormattedTime } from '../../utils/tools';

function DatetimePicker({ id, label, defaultValue = '' }) {
  const ref = useRef();

  const [date, setDate] = useState(getFormattedDate(defaultValue));
  const [time, setTime] = useState(getFormattedTime(defaultValue));
  const [dateTime, setDateTime] = useState(defaultValue);

  const handleChange = (event) => {
    setTime(getFormattedTime(event.target.value));
    setDate(getFormattedDate(event.target.value));
    setDateTime(event.target.value);
  };

  return (
    <div className="w-full lg:w-auto flex space-x-2 my-1">
      <div className="w-2/3">
        <div
          onClick={() => ref.current.focus()}
          className="flex min-h-[48px] lg:min-h-[64px] justify-start items-center max-w-full bg-white rounded-md px-2"
        >
          <div className="h-full flex-1">
            <FaCalendarAlt />
          </div>
          <div className="relative flex  flex-col justify-start items-start w-full ml-2">
            <label className="text-sm" htmlFor={id}>
              {label}
            </label>
            <input
              className="opacity-0 absolute w-full"
              type="datetime-local"
              id={id}
              name={id}
              ref={ref}
              required
              onChange={handleChange}
              value={dateTime}
              onFocus={(event) => event.target.showPicker()}
              min={new Date()
                .toISOString()
                .slice(0, new Date().toISOString().lastIndexOf(':'))}
            />
            <p className="font-semibold">{date}</p>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <div
          onClick={() => ref.current.focus()}
          className="flex min-h-[48px] lg:min-h-[64px] justify-start items-center max-w-full bg-white rounded-md px-2 pr-12"
        >
          <div className="h-full flex-1">
            <FaClock />
          </div>
          <div className="relative flex flex-col justify-start items-start w-full ml-2">
            <label className="text-sm" htmlFor={id}>
              Time
            </label>
            <p className="font-semibold">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatetimePicker;
