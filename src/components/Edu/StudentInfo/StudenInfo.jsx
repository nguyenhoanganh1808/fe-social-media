import useFetch from "../../../hooks/useFetch";
import { EduService } from "../../../services/edu.service";
import SpinningContainer from "../../common/SpinningContainer";

export default function StudentInfo() {
  const { data: studentData, loading } = useFetch(
    EduService.fetchStudentProfile
  );
  if (loading || !studentData) {
    return <SpinningContainer />;
  }

  const {
    student: {
      sid,
      course,
      profile: {
        name,
        email,
        status,
        major,
        dob,
        role,
        className,
        address,
        avatarUrl,
      },
    },
  } = studentData;

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-6 h-full">
        <div className="flex items-center space-x-6">
          <img
            src={avatarUrl}
            alt={`${name}'s Avatar`}
            className="w-24 h-24 rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">{email}</p>
            <p
              className={`text-sm font-medium mt-1 ${
                status === 1 ? "text-green-600" : "text-red-600"
              }`}
            >
              {status === 1 ? "Active" : "Inactive"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Profile Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Student ID</p>
              <p className="text-gray-800 font-medium">{sid}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Major</p>
              <p className="text-gray-800 font-medium">{major}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Date of Birth</p>
              <p className="text-gray-800 font-medium">
                {new Date(dob).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Role</p>
              <p className="text-gray-800 font-medium">{role}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Class</p>
              <p className="text-gray-800 font-medium">{className}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Course</p>
              <p className="text-gray-800 font-medium">{course}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-gray-600 text-sm">Address</p>
              <p className="text-gray-800 font-medium">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
