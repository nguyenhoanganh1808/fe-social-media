import PropTypes from "prop-types";
import SpinningContainer from "../../common/SpinningContainer";

export default function ExamSchedule({ examSchedules, loading }) {
  if (loading || !examSchedules) return <SpinningContainer />;
  return (
    <div className=" bg-gray-100 w-full py-3">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Exam Schedule
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Class Code</th>
                <th className="px-4 py-2 text-left">Subject Code</th>
                <th className="px-4 py-2 text-left">Exam Date</th>
                <th className="px-4 py-2 text-left">Day</th>
                <th className="px-4 py-2 text-left">Session</th>
                <th className="px-4 py-2 text-left">Room</th>
                <th className="px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {examSchedules.length > 0 ? (
                examSchedules.map((exam, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-700">{exam.malop}</td>
                    <td className="px-4 py-2 text-gray-700">{exam.mamh}</td>
                    <td className="px-4 py-2 text-gray-700">
                      {new Date(exam.ngayThi).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-gray-700">{exam.thuThi}</td>
                    <td className="px-4 py-2 text-gray-700">
                      {exam.caTietThi}
                    </td>
                    <td className="px-4 py-2 text-gray-700">{exam.phongThi}</td>
                    <td className="px-4 py-2 text-gray-700">{exam.ghiChu}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No exam schedules available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

ExamSchedule.propTypes = {
  examSchedules: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
