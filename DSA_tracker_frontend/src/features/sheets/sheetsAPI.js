import api from "../../utils/apiClient";

export const fetchSheets = async () => (await api.get("/sheets")).data.sheets;
export const createSheet = async (data) => (await api.post("/sheets/create", data)).data.sheet;
export const fetchSheetById = async (id) => (await api.get(`/sheets/${id}`)).data.sheet;
export const updateSheet = async ({ id, data }) => (await api.put(`/sheets/${id}`, data)).data.sheet;
export const deleteSheet = async (id) => { await api.delete(`/sheets/${id}`); return id; }; 