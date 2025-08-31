import { useEffect, useState } from "react";
import { getRegistrations } from "../api/registrations";
import { Link } from "react-router-dom";

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  status: string;
  applicationStatus: string;
}

const Registrations: React.FC = () => {
  const [regs, setRegs] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRegistrations().then((data) => {
      setRegs(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading registrations...</p>;

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">All Registrations</h1>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Application Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {regs.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{r.firstName} {r.lastName}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.course}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      r.applicationStatus === "Approved"
                        ? "bg-green-100 text-green-700"
                        : r.applicationStatus === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.applicationStatus || "Pending"}
                  </span>
                </td>
                <td className="p-3">
                  <Link
                    to={`/registrations/${r.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {regs.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
          >
            {/* Name */}
            <p className="text-lg font-semibold text-gray-900">
              {r.firstName} {r.lastName}
            </p>

            {/* Email */}
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Email:</span> {r.email}
            </p>

            {/* Course */}
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Course:</span> {r.course}
            </p>

            {/* Status */}
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Status:</span> {r.status}
            </p>

            {/* Application Status */}
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-semibold">Application:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  r.applicationStatus === "Approved"
                    ? "bg-green-100 text-green-700"
                    : r.applicationStatus === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {r.applicationStatus || "Pending"}
              </span>
            </p>

            {/* Action Button */}
            <Link
              to={`/registrations/${r.id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Registrations;
