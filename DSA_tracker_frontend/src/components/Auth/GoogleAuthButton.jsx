import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../features/auth/authSlice";
import api from "../../utils/apiClient";

export default function GoogleAuthButton({mode}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
     const endpoint = mode === "signup" ? "/auth/google-signup" : "/auth/google-login";
      const res = await api.post(endpoint, { idToken: credentialResponse.credential });
      localStorage.setItem("dsa_jwt", res.data.token);
      localStorage.setItem("dsa_user", JSON.stringify(res.data.user));
      dispatch(setUser({ user: res.data.user, token: res.data.token }));
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
     let message =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Google signup/login failed";
      toast.error(message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google Auth failed")}
    />
  );
}
