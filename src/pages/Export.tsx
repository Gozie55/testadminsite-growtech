import { exportCsv } from "../api/registrations";

const Export = () => {
  const handleExport = async () => {
    const blob = await exportCsv();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <h1 className="text-2xl font-bold">Export Data</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="mb-4 text-gray-700">
          Download all registration data in CSV format.
        </p>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default Export;
