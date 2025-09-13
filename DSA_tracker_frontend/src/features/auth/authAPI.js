import api from "../../utils/apiClient";

export const signup = async (formData) => {
  const res = await api.post("/auth/signup", formData,{ headers: { "Content-Type": "multipart/form-data" },}
  );
  return res.data;
};
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
export const logout = async () => {};

export const updateProfile = async (formData) => {
  const res = await api.put("/profile/update-profile", formData);
  return res.data;
}; 
export const deleteAccount = async () => {
  await api.delete("/profile/delete-account");
  return true;
};
export const googleSignup = async (idToken) => {
  const res = await api.post("/auth/google-signup", { idToken });
  return res.data;
};
export const googleLogin = async (idToken) => {
  const res = await api.post("/auth/google-login", { idToken });
  return res.data;
};