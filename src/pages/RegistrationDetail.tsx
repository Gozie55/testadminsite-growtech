// src/pages/RegistrationDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRegistration, updateStatus } from "../api/registrations";

interface Registration {
  id: string; // ✅ UUIDs are strings
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  email: string;
  mobileNumber: string;
  phoneNumber: string;
  company: string;
  cardNo: string;
  cardImageUrl: string;
  course: string;
  educationLevel: string;
  additionalComments: string;
  status: string;
}

const RegistrationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        if (!id) return;
        // ✅ use string id, not Number(id)
        const data = await getRegistration(id);
        setRegistration(data);
      } catch (err) {
        console.error("Failed to fetch registration", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistration();
  }, [id]);

  const handleUpdateStatus = async (status: "Approved" | "Rejected") => {
    if (!id) return;
    try {
      // ✅ use string id
      await updateStatus(id, status);
      setRegistration((prev) => (prev ? { ...prev, status } : prev));
      alert(`Applicant ${status}`);
      navigate("/registrations");
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Error updating applicant status.");
    }
  };

  if (loading) return <p className="p-6">Loading applicant details...</p>;
  if (!registration) return <p className="p-6">No applicant found.</p>;

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Applicant Details</h2>
        <p className="text-sm text-gray-500 mb-6">
          Review applicant information and approve or reject.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700">Card Image</span>
            {registration.cardImageUrl ? (
              <img
                src={registration.cardImageUrl}
                alt="Card"
                className="mt-2 max-h-56 rounded border object-contain"
              />
            ) : (
              <span className="text-gray-500 mt-2">No image uploaded</span>
            )}
          </div>

          <Detail
            label="Name"
            value={`${registration.firstName} ${registration.lastName}`}
          />
          <Detail label="Birth Date" value={registration.birthDate} />
          <Detail label="Gender" value={registration.gender} />
          <Detail label="Email" value={registration.email} />
          <Detail label="Mobile Number" value={registration.mobileNumber} />
          <Detail label="Phone Number" value={registration.phoneNumber} />
          <Detail label="Company" value={registration.company} />
          <Detail
            label="Address"
            value={`${registration.address}, ${registration.city}, ${registration.postal}, ${registration.country}`}
          />
          <Detail label="Course" value={registration.course} />
          <Detail label="Education Level" value={registration.educationLevel} />
          <Detail
            label="Additional Comments"
            value={registration.additionalComments || "N/A"}
          />
          <Detail label="Status" value={registration.status} />
          <Detail label="Card Number" value={registration.cardNo} />
        </div>

        {/* Approve / Reject Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            onClick={() => handleUpdateStatus("Approved")}
          >
            Approve
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            onClick={() => handleUpdateStatus("Rejected")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col">
    <span className="font-semibold text-gray-700">{label}</span>
    <span>{value}</span>
  </div>
);

export default RegistrationDetail;
