// import { useEffect, useState } from "react";
// import { getRegistrations } from "../api/registrations";
// import { Link } from "react-router-dom";

// interface Registration {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   applicationStatus: string;
//   createdAt: string;
// }

// const Dashboard = () => {
//   const [registrations, setRegistrations] = useState<Registration[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getRegistrations().then((data) => {
//       setRegistrations(data);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <p className="p-6">Loading dashboard...</p>;

//   const total = registrations.length;
//   const pending = registrations.filter(
//     (r) => r.applicationStatus === "Pending"
//   ).length;
//   const approved = registrations.filter(
//     (r) => r.applicationStatus === "Approved"
//   ).length;
//   const rejected = registrations.filter(
//     (r) => r.applicationStatus === "Rejected"
//   ).length;

//   const recent = registrations.slice(-5).reverse();

//   return (
//     <div className="p-6 flex-1 overflow-y-auto">
//       <h1 className="text-2xl font-bold">Dashboard Overview</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
//           <h2 className="text-lg">Total</h2>
//           <p className="text-3xl font-bold">{total}</p>
//         </div>
//         <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
//           <h2 className="text-lg">Pending</h2>
//           <p className="text-3xl font-bold">{pending}</p>
//         </div>
//         <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
//           <h2 className="text-lg">Approved</h2>
//           <p className="text-3xl font-bold">{approved}</p>
//         </div>
//         <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
//           <h2 className="text-lg">Rejected</h2>
//           <p className="text-3xl font-bold">{rejected}</p>
//         </div>
//       </div>

//       {/* Recent Registrations */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Status</th>
//               <th className="p-3"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {recent.map((r) => (
//               <tr key={r.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">
//                   {r.firstName} {r.lastName}
//                 </td>
//                 <td className="p-3">{r.email}</td>

//                 {/* <td className="p-3">{r.applicationStatus}</td> */}

//                 {/* Application status (Pending / Approved / Rejected only) */}
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       r.applicationStatus === "Approved"
//                         ? "bg-green-100 text-green-700"
//                         : r.applicationStatus === "Rejected"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {r.applicationStatus || "Pending"}
//                   </span>
//                 </td>

//                 <td className="p-3">
//                   <Link
//                     to={`/registrations/${r.id}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="mt-6 flex gap-4">
//           <Link
//             to="/registrations"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             View All Registrations
//           </Link>
//           <Link
//             to="/export"
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             Export Data
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard; 


import { useEffect, useState } from "react";
import { getRegistrations } from "../api/registrations";
import { Link } from "react-router-dom";

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  applicationStatus: string;
}

const Dashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRegistrations().then((data) => {
      setRegistrations(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  const total = registrations.length;
  const pending = registrations.filter((r) => r.applicationStatus === "Pending").length;
  const approved = registrations.filter((r) => r.applicationStatus === "Approved").length;
  const rejected = registrations.filter((r) => r.applicationStatus === "Rejected").length;

  const recent = registrations.slice(-5).reverse();

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-lg">Total</h2>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-lg">Pending</h2>
          <p className="text-3xl font-bold">{pending}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-lg">Approved</h2>
          <p className="text-3xl font-bold">{approved}</p>
        </div>
        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-lg">Rejected</h2>
          <p className="text-3xl font-bold">{rejected}</p>
        </div>
      </div>

      {/* Recent Registrations */}
      {/*<div className="overflow-x-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{r.firstName} {r.lastName}</td>
                <td className="p-3">{r.email}</td>
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
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to="/registrations"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
          >
            View All Registrations
          </Link>
          <Link
            to="/export"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center"
          >
            Export Data
          </Link>
        </div>
      </div>*/}
    </div>
  );
};

export default Dashboard;

