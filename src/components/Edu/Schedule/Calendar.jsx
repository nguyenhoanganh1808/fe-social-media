import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isToday,
} from "date-fns";
import PropTypes from "prop-types";
import { EduService } from "../../../services/edu.service";
import SpinningContainer from "../../common/SpinningContainer";
import { Popover } from "flowbite-react";

const Calendar = ({ month, year, semester }) => {
  const firstDayOfMonth = startOfMonth(new Date(year, month - 1));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const result = await EduService.fetchSchedule(semester, year);
      if (result.success) {
        setSchedule(result.data);
      }
    }
    fetch();
    setLoading(false);
  }, [semester, year]);

  const firstDayOfCalendar = startOfWeek(firstDayOfMonth);
  const lastDayOfCalendar = endOfWeek(lastDayOfMonth);

  const days = [];
  let currentDay = firstDayOfCalendar;

  while (currentDay <= lastDayOfCalendar) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  if (!schedule || loading) {
    return <SpinningContainer />;
  }

  return (
    <div className="flex bg-transparent text-xs leading-6 text-gray-700 lg:flex-auto w-full">
      <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const isCurrentMonth =
              day >= firstDayOfMonth && day <= lastDayOfMonth;
            const dayClasses = `flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10 ${
              isCurrentMonth
                ? "bg-white"
                : "bg-gray-50 text-gray-500 text-gray-500"
            }`;
            const todayClasses = isToday(day)
              ? "font-semibold text-white text-indigo-600 text-gray-900"
              : "";
            const dayOfWeek = day.getDay();
            const customDayMapping = dayOfWeek === 0 ? 8 : dayOfWeek + 1;
            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                type="button"
                className={dayClasses}
              >
                <time dateTime="2021-12-27" className={todayClasses || ""}>
                  {day.getDate()}
                </time>
                <ol className="mt-2">
                  {schedule[customDayMapping] &&
                    schedule[customDayMapping].map((classItem, index) => (
                      <li key={index}>
                        <span className="sr-only">2 events</span>
                        <Popover
                          trigger="hover"
                          content={
                            <span className="p-2">
                              {classItem.malop} - {classItem.tiet}
                            </span>
                          }
                        >
                          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                          </span>
                        </Popover>
                      </li>
                    ))}
                </ol>
                <span className="sr-only">0 events</span>
              </button>
            );
          })
        )}
      </div>
      <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const isCurrentMonth =
              day >= firstDayOfMonth && day <= lastDayOfMonth;
            const dayClasses = `relative py-8 px-6 ${
              isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500"
            }`;
            const todayClass = isToday(day)
              ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
              : "";
            const dayOfWeek = day.getDay();
            const customDayMapping = dayOfWeek === 0 ? 8 : dayOfWeek + 1;

            return (
              <div key={`${weekIndex}-${dayIndex}`} className={dayClasses}>
                <time
                  className={todayClass}
                  dateTime={format(day, "yyyy-MM-dd")}
                >
                  {day.getDate()}
                </time>
                <ol className="mt-2">
                  {schedule[customDayMapping] &&
                    schedule[customDayMapping].map((classItem, index) => (
                      <li key={index}>
                        <Popover
                          trigger="hover"
                          content={
                            <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                              <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <h3
                                  id="default-popover"
                                  className="font-semibold text-gray-900 dark:text-white"
                                >
                                  {classItem.tenmh}
                                </h3>
                              </div>
                              <div className="px-3 py-2">
                                <ul>
                                  <li>
                                    <p>
                                      <strong>Class room: </strong>
                                      {classItem.phonghoc}
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <strong>Department:</strong>{" "}
                                      {classItem.khoaql}
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <strong>Begin:</strong> {classItem.ngaybd}
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <strong>End:</strong> {classItem.ngaykt}
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          }
                        >
                          <a href="#" className="group flex">
                            {/* Display class information */}
                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              {classItem.malop}
                            </p>
                            {/* Display class time */}
                            <time
                              dateTime={classItem.dateTime} // Ensure the class has a `dateTime` property
                              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              {classItem.tiet}
                            </time>
                          </a>
                        </Popover>
                      </li>
                    ))}
                </ol>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  semester: PropTypes.number.isRequired,
};

export default Calendar;
