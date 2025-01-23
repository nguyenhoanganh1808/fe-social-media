import { useCallback, useState } from "react";
import { getCurrentMonth } from "../../../lib/utils";
import { semestersData, years } from "../../../lib/constants";
import { Select } from "flowbite-react";
import useFetch from "../../../hooks/useFetch";
import { EduService } from "../../../services/edu.service";
import ExamSchedule from "./ExamSchedule";

export default function Calendar() {
  const [semester, setSemester] = useState(semestersData[0].id);
  const [year, setYear] = useState(2023);
  const [examType, setExamType] = useState("GK");
  const today = new Date();
  const { data: examSchedule, loading } = useFetch(
    useCallback(
      () => EduService.fetchExamSchedule(examType, semester, year),
      [examType, semester, year]
    )
  );
  return (
    <div className="lg:flex lg:h-full lg:flex-col p-3 justify-center w-full">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime="2022-01">
            {getCurrentMonth(today)} {year}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <Select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="font-semibold"
              required
            >
              {semestersData.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.name}
                </option>
              ))}
            </Select>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center space-x-3">
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="font-semibold"
              required
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            <Select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="font-semibold"
              required
            >
              <option value="GK">Midterm</option>
              <option value="CK">Final</option>
            </Select>
            <div className="relative">
              <div
                className="hidden absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              ></div>
            </div>
            <div className="ml-6 h-6 w-px bg-gray-300"></div>
          </div>
          <div className="relative ml-6 md:hidden">
            <button
              type="button"
              className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
              id="menu-0-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <ExamSchedule examSchedules={examSchedule} loading={loading} />
    </div>
  );
}
