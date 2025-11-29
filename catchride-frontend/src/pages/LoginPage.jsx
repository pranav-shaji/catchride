import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);
      setUser(res.data);
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <Box className="app-container">
      <Typography variant="h5">Login</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 480 }}>
        <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} required />
        <Button variant="contained" type="submit">Login</Button>
      </Box>
    </Box>
  );
}
