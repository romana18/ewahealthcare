const BASE_URL = "http://localhost:4030/api";

/**
 * Fetch appointments from the API.
 * @param {number} page - The page number.
 * @param {number} rows - The number of rows to fetch.
 * @returns {Promise<object>} - The response data.
 */
export const fetchAppointments = async (page = 1, rows = -1) => {
  try {
    const response = await fetch(`${BASE_URL}/appointments/grid?page=${page}&rows=${rows}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch appointments.");
    }
    return data.data.rows;
  } catch (error) {
    throw new Error(error.message || "An error occurred while fetching appointments.");
  }
};

/**
 * Other API methods can be added here, for example:
 * export const fetchDoctors = async () => { ... }
 * export const fetchPatients = async () => { ... }
 */
