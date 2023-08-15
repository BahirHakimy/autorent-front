import ReportCard from './ReportCard';
import { FaBookmark, FaCarAlt, FaDollarSign, FaUsers } from 'react-icons/fa';
import { BarChart, DoughnutChart, PieChart, RadarChart } from './charts';
function States() {
  const BookingsPerMonth = {
    Jan: 43,
    Feb: 120,
    Mar: 180,
    Apr: 45,
    May: 350,
    Jun: 500,
  };
  const BookingsPerCarType = {
    SUVs: 620,
    Minivan: 340,
    Sport: 250,
    Sedan: 120,
  };
  const overralRatings = {
    '1 Star': 340,
    '2 Star': 40,
    '3 Star': 235,
    '4 Star': 530,
    '5 Star': 744,
  };

  const allBookings = {
    Total: 960,
  };
  const bookingsPerCarType = {
    SUVs: 420,
    Minivan: 300,
    Sport: 100,
    Sedan: 90,
  };
  return (
    <div className="w-full h-full bg-slate-50 rounded-t-xl self-start mt-5 mr-5 px-10 py-5 max-h-screen overflow-auto">
      <h1 className="text-slate-600 font-semibold">General Report</h1>
      <hr />
      <div className="flex flex-wrap p-2 md:p-5">
        <ReportCard
          title="Payments"
          subTitle="Total payments this month"
          value="$10900.00"
          Icon={FaDollarSign}
          color="green"
          to="/admin/payments"
        />
        <ReportCard
          title="Bookings"
          subTitle="Total bookings this month"
          value="1099"
          Icon={FaBookmark}
          color="sky"
          to="/admin/bookings"
        />
        <ReportCard
          title="Customers"
          subTitle="Total Customers"
          value="3500"
          Icon={FaUsers}
          color="violet"
          to="/admin/users"
        />

        <ReportCard
          title="Cars"
          subTitle="Total Cars in service"
          value="400"
          Icon={FaCarAlt}
          color="rose"
          to="/admin/cars"
        />
      </div>
      <h1 className="text-slate-600 font-semibold">Statistics</h1>
      <hr />
      <div className="flex flex-wrap justify-evenly items-baseline p-2 md:p-5">
        <BarChart data={BookingsPerMonth} title="Bookings per month" />
        <PieChart data={BookingsPerCarType} title="Bookings per car type" />
        <RadarChart data={overralRatings} title="Overal Ratings" />
        <DoughnutChart
          data1={allBookings}
          data2={bookingsPerCarType}
          title="Bookings per car type"
        />
      </div>
    </div>
  );
}

export default States;
