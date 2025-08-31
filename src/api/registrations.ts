const getAuthHeader = () => {
  const token = sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getRegistrations = async () => {
  const res = await fetch("/api/admin/registrations", {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Failed to fetch registrations");
  const data = await res.json();

  // Normalize field names
  return data.map((r: any) => ({
    ...r,
    status: r.status || r.applicationStatus, // always return status
  }));
};

export const getRegistration = async (id: string) => {
  const res = await fetch(`/api/admin/registrations/${id}`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Failed to fetch registration");
  const data = await res.json();
  return {
    ...data,
    status: data.status || data.applicationStatus,
  };
};

export const updateStatus = async (id: string, status: string) => {
  const res = await fetch(
    `/api/admin/registrations/${id}/status?status=${status}`,
    {
      method: "PATCH",
      headers: getAuthHeader(),
    }
  );
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
};

export const exportCsv = async () => {
  const res = await fetch("/api/admin/registrations/export/csv", {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Failed to export CSV");
  return res.blob();
};
