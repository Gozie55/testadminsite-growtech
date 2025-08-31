// import { useEffect, useState } from "react";
// import { getRegistrations } from "../api/registrations";
// import { Link } from "react-router-dom";

// const Registrations = () => {
//   const [regs, setRegs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getRegistrations().then((data) => {
//       setRegs(data);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <p className="p-6">Loading registrations...</p>;

//   return (
//     <div className="p-6 flex-1 overflow-y-auto">
//       <h1 className="text-2xl font-bold">All Registrations</h1>
//       <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Course</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Application Status</th>
//               <th className="p-3"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {regs.map((r) => (
//               <tr key={r.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">
//                   {r.firstName} {r.lastName}
//                 </td>
//                 <td className="p-3">{r.email}</td>
//                 <td className="p-3">{r.course}</td>

//                 {/* Employment / education status */}
//                 <td className="p-3">{r.status}</td>

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
//                     View Details
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Registrations;


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

      <div className="overflow-x-auto">
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
    </div>
  );
};

export default Registrations;

