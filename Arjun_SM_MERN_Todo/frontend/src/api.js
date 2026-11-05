const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }
  return data;
}

export const getTasks = () => request("/tasks");
export const createTask = (task) =>
  request("/tasks", { method: "POST", body: JSON.stringify(task) });
export const updateTask = (id, updates) =>
  request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(updates) });
export const deleteTask = (id) =>
  request(`/tasks/${id}`, { method: "DELETE" });
