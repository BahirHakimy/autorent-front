import ReportCard from './ReportCard';
import { FaBookmark, FaCarAlt, FaDollarSign, FaUsers } from 'react-icons/fa';
import { BarChart, DoughnutChart, PieChart, RadarChart } from './charts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchReport } from '../../../context/features/reportSlice';
import { Loading } from '../../shared';
function States() {
  const { report, loading } = useSelector((state) => state.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReport());
  }, [dispatch]);

  const BookingsPerMonth = {
    title: 'Bookings States',
    datasets: [
      {
        label: 'Bookings Per Month',
        data: report.bookings_per_month,
      },
    ],
  };

  const bookingsPerCarTyped = {
    title: 'Bookings Per Car Type',
    labels: ['Total', ...Object.keys(report.bookings_per_car_type)],
    datasets: [
      {
        data: [
          null,
          ...Object.keys(report.bookings_per_car_type).map(
            (key) => report.bookings_per_car_type[key]
          ),
        ],
        backgroundColor: [
          '#36a2eb',
          '#4bc0c0',
          '#ff6384',
          '#ff9f40',
          '#ffcd56',
        ],
      },
      {
        data: [
          Object.keys(report.bookings_per_car_type)
            .map((key) => report.bookings_per_car_type[key])
            .reduce((prev, accu) => prev + accu, 0),
        ],
        backgroundColor: ['#36a2eb'],
      },
    ],
  };

  const ratingsPerCarType = {
    title: 'Car Ratings',
    labels: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
    datasets: [
      ...Object.keys(report.ratings_per_car_type).map((key) => ({
        label: key,
        data: Object.keys(report.ratings_per_car_type[key]).map(
          (rate_key) => report.ratings_per_car_type[key][rate_key]
        ),
      })),
    ],
  };

  const bookingsStates = {
    title: 'Bookings States',
    labels: Object.keys(report.bookings_states).map((key) =>
      key === 'Idle' ? 'Payment Pending' : key
    ),
    datasets: [
      {
        data: Object.values(report.bookings_states),
      },
    ],
  };
  return (
    <div className="w-full h-screen bg-slate-50 rounded-t-xl self-start mt-5 mr-5 px-2 md:px-10 py-5 max-h-screen overflow-auto">
      <h1 className="text-slate-600 font-semibold">General Report</h1>
      <hr />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full flex flex-wrap justify-center content-center md:content-none p-2 md:p-5">
            <ReportCard
              title="Payments"
              subTitle="Total payments this month"
              value={`$${parseFloat(report.total_payments).toFixed(2)}`}
              Icon={FaDollarSign}
              color="green"
              to="/admin/payments"
            />
            <ReportCard
              title="Bookings"
              subTitle="Total bookings this month"
              value={report.bookings_this_month}
              Icon={FaBookmark}
              color="sky"
              to="/admin/bookings"
            />
            <ReportCard
              title="Customers"
              subTitle="Total Customers"
              value={report.total_customers}
              Icon={FaUsers}
              color="violet"
              to="/admin/users"
            />

            <ReportCard
              title="Cars"
              subTitle="Total Cars in service"
              value={report.total_cars}
              Icon={FaCarAlt}
              color="rose"
              to="/admin/cars"
            />
          </div>
          <h1 className="text-slate-600 font-semibold">Statistics</h1>
          <hr />
          <div className="flex flex-wrap justify-center content-center md:content-none items-baseline p-2 md:p-5">
            <div className="w-full border-b max-w-screen-xl">
              <BarChart data={BookingsPerMonth} />
            </div>
            <div className="w-full md:w-1/3">
              <PieChart data={bookingsStates} />
            </div>
            <div className="w-full md:w-1/3">
              <RadarChart data={ratingsPerCarType} />
            </div>
            <div className="w-full md:w-1/3">
              <DoughnutChart data={bookingsPerCarTyped} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default States;
